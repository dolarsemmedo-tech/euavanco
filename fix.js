const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix absolute paths so images load on file:// protocol
const originalLength = html.length;
html = html.replace(/src="\/wp-content\//g, 'src="wp-content/');
html = html.replace(/href="\/wp-content\//g, 'href="wp-content/');
html = html.replace(/url\("\/wp-content\//g, 'url("wp-content/');
html = html.replace(/url\('\/wp-content\//g, 'url(\'wp-content/');
html = html.replace(/url\(\/wp-content\//g, 'url(wp-content/');
html = html.replace(/srcset="\/wp-content\//g, 'srcset="wp-content/');
html = html.replace(/, \/wp-content\//g, ', wp-content/');

fs.writeFileSync('index.html', html);
console.log('Fixed absolute paths in index.html');

// 2. Output the carousel structure so we can analyze it
const cheerio = require('cheerio'); // See if cheerio is available, otherwise regex
try {
  const $ = cheerio.load(html);
  console.log('Found carousels:', $('.e-n-carousel').length);
  $('.e-n-carousel').each((i, el) => {
    console.log(`Carousel ${i}: classes = ${$(el).attr('class')}`);
    const slides = $(el).find('.swiper-slide');
    console.log(`  Number of slides: ${slides.length}`);
    slides.each((j, slide) => {
        const innerContainers = $(slide).children('.e-con');
        console.log(`  Slide ${j} has ${innerContainers.length} inner containers with classes: ${innerContainers.attr('class')}`);
    });
  });
} catch(e) {
  console.log('Cheerio not available, using regex to find carousels');
  const matches = html.match(/class="[^"]*e-n-carousel[^"]*"[^>]*>([\s\S]{0,1000})/g);
  if (matches) {
    matches.forEach((m, i) => console.log('Carousel ' + i + ':\n' + m.substring(0, 500) + '...'));
  }
}
