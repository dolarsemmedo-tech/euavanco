const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

// 1. Remove previous custom treadmill style if it exists
$('#custom-treadmill-styles').remove();
$('style').each((i, el) => {
    const text = $(el).text();
    if (text.includes('transição do carrossel para ser linear')) {
        $(el).remove();
    }
});

// 2. Inject the CSS style to force linear transitions
const treadmillCSS = `
<style id="custom-treadmill-styles">
/* Força a transição do carrossel para ser linear (efeito esteira) */
.elementor-widget-image-carousel .swiper-wrapper,
.elementor-widget-n-carousel .swiper-wrapper,
.e-n-carousel .swiper-wrapper {
    -webkit-transition-timing-function: linear !important;
    transition-timing-function: linear !important;
}
</style>
`;
$('head').append(treadmillCSS);

// 3. Configure settings for all carousels
let updated = 0;
function updateSettings(selector) {
    $(selector).each((i, el) => {
        const settingsAttr = $(el).attr('data-settings');
        if (settingsAttr) {
            try {
                const settings = JSON.parse(settingsAttr);
                settings.autoplay = "yes";
                // IMPORTANT: We use 10 instead of 0.
                // In some Swiper/Elementor versions, 0 is falsy (0 || 3000) which disables autoplay or breaks internal calculations.
                // Setting it to 10 (10ms delay) behaves exactly like 0 for the treadmill effect, but avoids division-by-zero or falsy checks!
                settings.autoplay_speed = 10; 
                settings.speed = 4000; // Ultra smooth transition speed (4 seconds)
                settings.pause_on_hover = "yes"; // Pause on hover
                settings.pause_on_interaction = "no"; // Do not disable autoplay permanently after swipe
                settings.infinite = "yes";
                $(el).attr('data-settings', JSON.stringify(settings));
                updated++;
            } catch (e) {
                console.error("Error parsing settings for element", i);
            }
        }
    });
}

updateSettings('.elementor-widget-image-carousel');
updateSettings('.e-n-carousel');
updateSettings('.elementor-widget-n-carousel');

fs.writeFileSync('index.html', $.html());
console.log(`Updated autoplay settings with robust positive delay for ${updated} carousels.`);
