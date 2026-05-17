const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const styles = html.match(/<style[^>]*>([\s\S]*?)<\/style>/g);
if (styles) {
    styles.forEach(style => {
        if (style.includes('swiper-wrapper') || style.includes('flex-wrap')) {
             console.log('Found swiper-wrapper or flex-wrap in style!');
             const lines = style.split('\n');
             lines.forEach(line => {
                 if (line.includes('swiper-wrapper') || line.includes('flex-wrap')) {
                     console.log('  ->', line.trim());
                 }
             });
        }
    });
}
