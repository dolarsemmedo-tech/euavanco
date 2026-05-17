const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

console.log('--- VALIDATING INJECTED JAVASCRIPT ---');
$('script').each((i, el) => {
    const id = $(el).attr('id') || 'unnamed';
    const src = $(el).attr('src');
    const content = $(el).html();
    
    if (!src && content) {
        try {
            // Try to parse the JavaScript using the built-in vm module or eval-like syntax checking
            new Function(content);
            console.log(`Script ${i} [ID: ${id}]: Syntax OK`);
        } catch (e) {
            console.error(`❌ Script ${i} [ID: ${id}] has SYNTAX ERROR:`, e.message);
            console.log('Content preview:');
            console.log(content.slice(0, 300));
        }
    }
});
