const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

const firstItem = $('.elementor-widget-n-accordion .e-n-accordion-item').first();
console.log('Accordion Item HTML:', firstItem.html());
console.log('Accordion Item Attributes:', firstItem.attr());
