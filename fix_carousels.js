const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

let merged1 = 0;
let merged2 = 0;

// Section 1: Cursos Reconhecidos
const heading1 = $('.elementor-element-35099209'); 
if (heading1.length) {
    const container1 = heading1.parent().parent();
    const carousels1 = container1.find('.elementor-widget-image-carousel');
    if (carousels1.length > 1) {
        const firstCarousel = carousels1.first();
        const targetWrapper = firstCarousel.find('.swiper-wrapper');
        
        carousels1.each((i, el) => {
            if (i === 0) return;
            const slides = $(el).find('.swiper-slide');
            targetWrapper.append(slides);
            $(el).remove();
        });
        merged1 = carousels1.length;
    }
}

// Section 2: Cursos Livres
const heading2 = $('h1, h2, h3, h4, p, span, div').filter((i, el) => $(el).text().includes('CURSOS LIVRES E PROFISSIONALIZANTES')).first();
if (heading2.length) {
    const container2 = heading2.closest('.e-con-parent');
    if (container2.length) {
        const carousels2 = container2.find('.elementor-widget-image-carousel');
        if (carousels2.length > 1) {
            const firstCarousel = carousels2.first();
            const targetWrapper = firstCarousel.find('.swiper-wrapper');
            
            carousels2.each((i, el) => {
                if (i === 0) return;
                const slides = $(el).find('.swiper-slide');
                targetWrapper.append(slides);
                $(el).remove();
            });
            merged2 = carousels2.length;
        }
    }
}

fs.writeFileSync('index.html', $.html());
console.log(`Merged ${merged1} carousels in Cursos Reconhecidos.`);
console.log(`Merged ${merged2} carousels in Cursos Livres.`);
