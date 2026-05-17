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
                settings.pause_on_hover = "yes";
                settings.pause_on_interaction = "yes";
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
console.log(`Updated pause_on_hover settings for ${updated} carousels.`);
