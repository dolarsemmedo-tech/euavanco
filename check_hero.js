const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

$('.phlight-rocket-launch').each((i, el) => {
    const parentWidget = $(el).closest('.elementor-widget');
    console.log(`Rocket ${i} widget:`, parentWidget.attr('class'));
});
