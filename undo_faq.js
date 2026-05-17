const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

// Remove the custom-faq-styles block and any other FAQ style blocks
$('style').each((i, el) => {
    const text = $(el).text();
    if (text.includes('MODERNIZAÇÃO DA SEÇÃO DE PERGUNTAS FREQUENTES (FAQ)')) {
        $(el).remove();
    }
});

fs.writeFileSync('index.html', $.html());
console.log('Successfully reverted FAQ styles to original!');
