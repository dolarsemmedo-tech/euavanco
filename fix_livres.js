const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

const container2 = $('.elementor-element-3641ee68');
const carousels = container2.find('.elementor-widget-image-carousel');
console.log('Found carousels for 3641ee68:', carousels.length);

if (carousels.length > 1) {
    const firstCarousel = carousels.first();
    const targetWrapper = firstCarousel.find('.swiper-wrapper');
    
    carousels.each((i, el) => {
        if (i === 0) return;
        const slides = $(el).find('.swiper-slide');
        targetWrapper.append(slides);
        $(el).remove();
    });
    console.log(`Merged ${carousels.length - 1} carousels into the first one.`);
}

fs.writeFileSync('index.html', $.html());
