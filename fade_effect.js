const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

const fadeStyle = `
<style>
/* Efeito de fade (dissolver) nas bordas dos carrosséis */
.elementor-widget-image-carousel .elementor-image-carousel-wrapper,
.elementor-widget-n-carousel .swiper,
.e-n-carousel.swiper {
    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

/* Ocultar as setas já que agora o carrossel roda sozinho como esteira */
.elementor-widget-image-carousel .elementor-swiper-button,
.elementor-widget-n-carousel .elementor-swiper-button {
    display: none !important;
}
</style>
`;

$('head').append(fadeStyle);

fs.writeFileSync('index.html', $.html());
console.log('Added CSS for fade effect and hidden arrows.');
