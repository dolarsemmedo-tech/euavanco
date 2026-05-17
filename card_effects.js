const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

const cardStyles = `
<style>
/* Efeitos sofisticados para os cards de Diferenciais */

/* Transição suave para o card inteiro */
.elementor-element-19de9566 .elementor-widget-icon-box,
.elementor-element-1e06dc2d .elementor-widget-icon-box {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
    border-radius: 20px; /* Garantir o arredondamento */
    position: relative;
    overflow: hidden;
    z-index: 1;
}

/* Efeito de brilho de fundo no hover (Glass/Glow) */
.elementor-element-19de9566 .elementor-widget-icon-box::before,
.elementor-element-1e06dc2d .elementor-widget-icon-box::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
    pointer-events: none;
}

/* O Hover em si */
.elementor-element-19de9566 .elementor-widget-icon-box:hover,
.elementor-element-1e06dc2d .elementor-widget-icon-box:hover {
    transform: translateY(-10px) scale(1.02) !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(86, 187, 123, 0.2) !important;
    /* Um leve highlight nas bordas */
    outline: 1px solid rgba(255, 255, 255, 0.1);
    outline-offset: -1px;
}

/* Mostrar o brilho no hover */
.elementor-element-19de9566 .elementor-widget-icon-box:hover::before,
.elementor-element-1e06dc2d .elementor-widget-icon-box:hover::before {
    opacity: 1;
}

/* Animação do Ícone no Hover */
.elementor-element-19de9566 .elementor-widget-icon-box .elementor-icon-box-icon,
.elementor-element-1e06dc2d .elementor-widget-icon-box .elementor-icon-box-icon {
    transition: all 0.4s ease !important;
}

.elementor-element-19de9566 .elementor-widget-icon-box:hover .elementor-icon-box-icon,
.elementor-element-1e06dc2d .elementor-widget-icon-box:hover .elementor-icon-box-icon {
    transform: scale(1.2) translateY(-5px) !important;
    filter: drop-shadow(0 0 10px rgba(86, 187, 123, 0.6));
}

/* Animação do Texto no Hover */
.elementor-element-19de9566 .elementor-widget-icon-box:hover .elementor-icon-box-title,
.elementor-element-1e06dc2d .elementor-widget-icon-box:hover .elementor-icon-box-title {
    color: #56bb7b !important; /* Cor de destaque (verde claro) do site */
    transition: color 0.3s ease;
}
</style>
`;

$('head').append(cardStyles);

fs.writeFileSync('index.html', $.html());
console.log('Added sophisticated hover effects to the cards.');
