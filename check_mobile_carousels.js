const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html);

console.log('--- ALL CAROUSELS ON THE PAGE ---');
$('.elementor-widget-image-carousel, .e-n-carousel, .elementor-widget-n-carousel').each((i, el) => {
    const id = $(el).attr('id') || $(el).attr('data-id') || 'no-id';
    const classes = $(el).attr('class');
    const settings = $(el).attr('data-settings');
    console.log(`Carousel ${i} [ID: ${id}]:`);
    console.log(`  Classes: ${classes}`);
    console.log(`  Settings: ${settings}`);
});
