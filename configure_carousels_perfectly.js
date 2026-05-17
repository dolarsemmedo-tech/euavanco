const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

// 1. Remove previous treadmill style if it exists
$('#custom-treadmill-styles').remove();
$('style').each((i, el) => {
    const text = $(el).text();
    if (text.includes('transição do carrossel para ser linear')) {
        $(el).remove();
    }
});

// 2. Inject the CSS style forcing linear transition ONLY for the image carousels (NOT the card carousel!)
const treadmillCSS = `
<style id="custom-treadmill-styles">
/* Força a transição linear contínua APENAS nos carrosséis de imagem (efeito esteira) */
.elementor-widget-image-carousel .swiper-wrapper,
.e-n-carousel .swiper-wrapper {
    -webkit-transition-timing-function: linear !important;
    transition-timing-function: linear !important;
}
</style>
`;
$('head').append(treadmillCSS);

// 3. Configure Image Carousels (Continuous Treadmill)
let imageUpdated = 0;
$('.elementor-widget-image-carousel, .e-n-carousel').each((i, el) => {
    const settingsAttr = $(el).attr('data-settings');
    if (settingsAttr) {
        try {
            const settings = JSON.parse(settingsAttr);
            settings.autoplay = "yes";
            settings.autoplay_speed = 10; // Continuous scroll
            settings.speed = 4000; // Ultra smooth 4 seconds scroll
            settings.pause_on_hover = "yes"; // Pause on hover
            settings.pause_on_interaction = "no";
            settings.infinite = "yes";
            $(el).attr('data-settings', JSON.stringify(settings));
            imageUpdated++;
        } catch (e) {
            console.error("Error updating image carousel", i);
        }
    }
});

// 4. Configure Card Carousel / Nested Carousel (Normal Autoplay - snaps smoothly)
let cardUpdated = 0;
$('.elementor-widget-n-carousel').each((i, el) => {
    const settingsAttr = $(el).attr('data-settings');
    if (settingsAttr) {
        try {
            const settings = JSON.parse(settingsAttr);
            settings.autoplay = "yes";
            settings.autoplay_speed = 4000; // Slides every 4 seconds
            settings.speed = 800; // Smooth 0.8s snap transition
            settings.pause_on_hover = "yes"; // Pause on hover
            settings.pause_on_interaction = "no"; // Auto-resume after user clicks/drags
            settings.infinite = "yes";
            $(el).attr('data-settings', JSON.stringify(settings));
            cardUpdated++;
        } catch (e) {
            console.error("Error updating nested card carousel", i);
        }
    }
});

fs.writeFileSync('index.html', $.html());
console.log(`Successfully configured carousels:`);
console.log(` - ${imageUpdated} image carousels set to Treadmill (continuous scroll).`);
console.log(` - ${cardUpdated} card/nested carousels set to Normal Autoplay (4s interval with smooth snapping).`);
