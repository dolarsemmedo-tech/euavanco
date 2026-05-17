const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

let updated = 0;

function updateSettings(selector) {
    $(selector).each((i, el) => {
        const settingsAttr = $(el).attr('data-settings');
        if (settingsAttr) {
            try {
                const settings = JSON.parse(settingsAttr);
                settings.autoplay = "yes";
                settings.autoplay_speed = 0; // 0 delay = continuous
                settings.speed = 3000; // 3 seconds transition speed
                settings.pause_on_hover = "no";
                settings.pause_on_interaction = "no";
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

// Inject the CSS to make the transition linear
const customStyle = `
<style>
/* Força a transição do carrossel para ser linear (efeito esteira) */
.elementor-widget-image-carousel .swiper-wrapper,
.elementor-widget-n-carousel .swiper-wrapper,
.e-n-carousel .swiper-wrapper {
    -webkit-transition-timing-function: linear !important;
    transition-timing-function: linear !important;
}
</style>
`;

$('head').append(customStyle);

fs.writeFileSync('index.html', $.html());
console.log(`Updated autoplay settings for ${updated} carousels to be continuous (treadmill effect).`);
