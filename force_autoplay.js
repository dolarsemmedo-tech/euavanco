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
                settings.autoplay_speed = 2500; // 2.5 seconds
                settings.pause_on_hover = "no";
                settings.pause_on_interaction = "no";
                $(el).attr('data-settings', JSON.stringify(settings));
                updated++;
            } catch (e) {
                console.error("Error parsing settings for element", i);
            }
        }
    });
}

updateSettings('.elementor-widget-image-carousel');
updateSettings('.e-n-carousel'); // wait, the widget class is .elementor-widget-n-carousel
updateSettings('.elementor-widget-n-carousel');

fs.writeFileSync('index.html', $.html());
console.log(`Updated autoplay settings for ${updated} carousels.`);
