const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

const section2Styles = `
<style id="custom-section2-animations">
/* ========================================================
   ANIMAÇÕES SOFISTICADAS NA SEGUNDA SEÇÃO (POR QUE ACESSAR)
   ======================================================== */

/* Animação do Título (POR QUE ACESSAR NOSSA PLATAFORMA?) */
.elementor-element-38869286 {
    opacity: 0;
    animation: heroFadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
    animation-delay: 0.2s !important; /* Começa um pouco depois do topo */
}

/* Configuração Inicial da Lista da Segunda Seção */
.elementor-element-20b1ea80 .elementor-icon-list-item {
    opacity: 0;
    animation: heroFadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
}

/* Animação Escalonada (Staggered) para os itens da lista */
.elementor-element-20b1ea80 .elementor-icon-list-item:nth-child(1) {
    animation-delay: 0.5s !important;
}
.elementor-element-20b1ea80 .elementor-icon-list-item:nth-child(2) {
    animation-delay: 0.7s !important;
}
.elementor-element-20b1ea80 .elementor-icon-list-item:nth-child(3) {
    animation-delay: 0.9s !important;
}
</style>
`;

// Remove previous section 2 animation styles if they exist
$('style').each((i, el) => {
    const text = $(el).text();
    if (text.includes('ANIMAÇÕES SOFISTICADAS NA SEGUNDA SEÇÃO (POR QUE ACESSAR)')) {
        $(el).remove();
    }
});

$('head').append(section2Styles);

fs.writeFileSync('index.html', $.html());
console.log('Successfully added modern section 2 animations!');
