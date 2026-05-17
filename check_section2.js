const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

// Find elements for "POR QUE ACESSAR"
$('h1, h2, h3, h4, h5, h6, span, div, p').each((i, el) => {
    const text = $(el).text().trim().replace(/\s+/g, ' ');
    if (text.includes('POR QUE ACESSAR') || text.includes('Áreas que vão aumentar seus ganhos')) {
        console.log(`Found element: tag = ${$(el).prop('tagName')}, text = "${text}"`);
        console.log(`  Classes: ${$(el).attr('class')}`);
        console.log(`  Closest elementor-widget: ${$(el).closest('.elementor-widget').attr('class')}`);
    }
});
