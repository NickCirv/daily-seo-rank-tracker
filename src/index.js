#!/usr/bin/env node
/**
 * Daily SEO Rank Tracker
 *
 * Automated pipeline that:
 * 1. Tracks keyword rankings for a domain
 * 2. Compares against historical data
 * 3. Sends alerts on significant changes
 *
 * Usage: node index.js --domain example.com --keywords "keyword1,keyword2" --country us
 */

const { ApifyClient } = require('apify-client');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const APIFY_TOKEN = process.env.APIFY_TOKEN;

// Initialize Apify client
const apifyClient = new ApifyClient({ token: APIFY_TOKEN });

/**
 * Step 1: Search Google for keyword and find domain position
 */
async function trackKeyword(keyword, domain, country = 'us', maxResults = 100) {
    console.log(`   🔍 Tracking: "${keyword}"`);

    const input = {
        queries: keyword,
        maxPagesPerQuery: Math.ceil(maxResults / 10),
        resultsPerPage: 10,
        languageCode: 'en',
        countryCode: country,
        mobileResults: false,
    };

    try {
        const run = await apifyClient.actor('apify/google-search-scraper').call(input);
        const { items } = await apifyClient.dataset(run.defaultDatasetId).listItems();

        // Find domain in results
        let position = null;
        let url = null;
        let title = null;

        for (let i = 0; i < items.length; i++) {
            const result = items[i];
            if (result.organicResults) {
                for (let j = 0; j < result.organicResults.length; j++) {
                    const organic = result.organicResults[j];
                    if (organic.url && organic.url.includes(domain)) {
                        position = j + 1 + (i * 10);
                        url = organic.url;
                        title = organic.title;
                        break;
                    }
                }
            }
            if (position) break;
        }

        return {
            keyword,
            position: position || `Not in top ${maxResults}`,
            url,
            title,
            timestamp: new Date().toISOString()
        };

    } catch (error) {
        console.error(`   ❌ Failed to track "${keyword}":`, error.message);
        return {
            keyword,
            position: 'Error',
            error: error.message,
            timestamp: new Date().toISOString()
        };
    }
}

/**
 * Step 2: Load historical data
 */
async function loadHistory(domain) {
    const historyPath = path.join(__dirname, '..', 'data', `${domain.replace(/\./g, '_')}_history.json`);

    try {
        const data = await fs.readFile(historyPath, 'utf8');
        return JSON.parse(data);
    } catch {
        return { domain, history: [] };
    }
}

/**
 * Step 3: Save historical data
 */
async function saveHistory(domain, history) {
    const dataDir = path.join(__dirname, '..', 'data');
    await fs.mkdir(dataDir, { recursive: true });

    const historyPath = path.join(dataDir, `${domain.replace(/\./g, '_')}_history.json`);
    await fs.writeFile(historyPath, JSON.stringify(history, null, 2));
}

/**
 * Step 4: Compare and detect changes
 */
function detectChanges(current, previous, threshold = 3) {
    if (!previous || previous.length === 0) {
        return { changes: [], isFirstRun: true };
    }

    const prevMap = new Map(previous.map(p => [p.keyword, p.position]));
    const changes = [];

    for (const result of current) {
        const prevPosition = prevMap.get(result.keyword);

        if (prevPosition && typeof result.position === 'number' && typeof prevPosition === 'number') {
            const change = prevPosition - result.position; // Positive = improved
            if (Math.abs(change) >= threshold) {
                changes.push({
                    keyword: result.keyword,
                    oldPosition: prevPosition,
                    newPosition: result.position,
                    change: change > 0 ? `+${change}` : change,
                    direction: change > 0 ? '📈 UP' : '📉 DOWN'
                });
            }
        } else if (prevPosition === `Not in top 100` && typeof result.position === 'number') {
            changes.push({
                keyword: result.keyword,
                oldPosition: 'Not ranked',
                newPosition: result.position,
                change: 'NEW',
                direction: '🆕 ENTERED'
            });
        } else if (typeof prevPosition === 'number' && result.position === `Not in top 100`) {
            changes.push({
                keyword: result.keyword,
                oldPosition: prevPosition,
                newPosition: 'Not ranked',
                change: 'LOST',
                direction: '❌ DROPPED'
            });
        }
    }

    return { changes, isFirstRun: false };
}

/**
 * Step 5: Generate report
 */
async function generateReport(domain, results, changes) {
    const timestamp = new Date().toISOString().split('T')[0];
    const outputDir = path.join(__dirname, '..', 'reports');
    await fs.mkdir(outputDir, { recursive: true });

    // Summary report
    let report = `# SEO Rank Report - ${domain}\n`;
    report += `**Date:** ${timestamp}\n\n`;

    // Changes section
    if (changes.changes.length > 0) {
        report += `## 🚨 Ranking Changes\n\n`;
        report += `| Keyword | Old | New | Change |\n`;
        report += `|---------|-----|-----|--------|\n`;
        for (const c of changes.changes) {
            report += `| ${c.keyword} | ${c.oldPosition} | ${c.newPosition} | ${c.direction} ${c.change} |\n`;
        }
        report += `\n`;
    } else if (changes.isFirstRun) {
        report += `## ℹ️ First tracking run - no comparison available\n\n`;
    } else {
        report += `## ✅ No significant changes detected\n\n`;
    }

    // Full rankings
    report += `## Current Rankings\n\n`;
    report += `| Keyword | Position | URL |\n`;
    report += `|---------|----------|-----|\n`;
    for (const r of results) {
        const pos = typeof r.position === 'number' ? `#${r.position}` : r.position;
        report += `| ${r.keyword} | ${pos} | ${r.url || '-'} |\n`;
    }

    // Save report
    const reportPath = path.join(outputDir, `${domain.replace(/\./g, '_')}-${timestamp}.md`);
    await fs.writeFile(reportPath, report);

    // CSV export
    const csvHeader = 'Keyword,Position,URL,Title,Timestamp\n';
    const csvRows = results.map(r => {
        return [
            `"${r.keyword}"`,
            r.position,
            r.url || '',
            `"${r.title || ''}"`,
            r.timestamp
        ].join(',');
    }).join('\n');
    const csvPath = path.join(outputDir, `${domain.replace(/\./g, '_')}-${timestamp}.csv`);
    await fs.writeFile(csvPath, csvHeader + csvRows);

    console.log(`\n📁 Reports saved:`);
    console.log(`   ${reportPath}`);
    console.log(`   ${csvPath}`);

    return { reportPath, csvPath, changes };
}

/**
 * Main execution
 */
async function main() {
    const args = process.argv.slice(2);

    // Parse arguments
    let domain = null;
    let keywords = [];
    let country = 'us';

    for (let i = 0; i < args.length; i++) {
        if (args[i] === '--domain' && args[i + 1]) {
            domain = args[i + 1];
        } else if (args[i] === '--keywords' && args[i + 1]) {
            keywords = args[i + 1].split(',').map(k => k.trim());
        } else if (args[i] === '--country' && args[i + 1]) {
            country = args[i + 1];
        }
    }

    if (!domain || keywords.length === 0) {
        console.log('Usage: node index.js --domain example.com --keywords "keyword1,keyword2" [--country us]');
        console.log('\nExample:');
        console.log('  node index.js --domain cirvgreen.com --keywords "wordpress schema plugin,seo schema markup" --country us');
        process.exit(1);
    }

    console.log('═══════════════════════════════════════════════════════');
    console.log('  DAILY SEO RANK TRACKER');
    console.log('═══════════════════════════════════════════════════════');
    console.log(`  Domain: ${domain}`);
    console.log(`  Keywords: ${keywords.length}`);
    console.log(`  Country: ${country}`);
    console.log('═══════════════════════════════════════════════════════\n');

    try {
        // Load history
        const historyData = await loadHistory(domain);
        const previousResults = historyData.history.length > 0 ?
            historyData.history[historyData.history.length - 1].results : null;

        // Track all keywords
        console.log('🔍 Tracking keywords...\n');
        const results = [];
        for (const keyword of keywords) {
            const result = await trackKeyword(keyword, domain, country);
            results.push(result);
            console.log(`   ${typeof result.position === 'number' ? `#${result.position}` : result.position}`);
        }

        // Detect changes
        const changes = detectChanges(results, previousResults);

        // Update history
        historyData.history.push({
            date: new Date().toISOString(),
            results
        });
        // Keep last 90 days
        if (historyData.history.length > 90) {
            historyData.history = historyData.history.slice(-90);
        }
        await saveHistory(domain, historyData);

        // Generate report
        await generateReport(domain, results, changes);

        // Summary
        console.log('\n═══════════════════════════════════════════════════════');
        console.log('  SUMMARY');
        console.log('═══════════════════════════════════════════════════════');

        if (changes.changes.length > 0) {
            console.log(`\n🚨 ${changes.changes.length} significant changes detected:\n`);
            for (const c of changes.changes) {
                console.log(`   ${c.direction} "${c.keyword}": ${c.oldPosition} → ${c.newPosition}`);
            }
        } else if (changes.isFirstRun) {
            console.log('\nℹ️  First run - baseline established');
        } else {
            console.log('\n✅ No significant ranking changes');
        }

        console.log('\n✅ Tracking complete!');

    } catch (error) {
        console.error('\n❌ Tracking failed:', error.message);
        process.exit(1);
    }
}

// Export for programmatic use
module.exports = { trackKeyword, loadHistory, saveHistory, detectChanges, generateReport };

// Run if called directly
if (require.main === module) {
    main();
}
