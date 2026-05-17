const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

const faqStyles = `
<style>
/* ========================================================
   MODERNIZAÇÃO DA SEÇÃO DE PERGUNTAS FREQUENTES (FAQ)
   ======================================================== */

/* Container geral do Accordion */
.elementor-widget-n-accordion .e-n-accordion {
    gap: 15px !important; /* Espaçamento entre as perguntas */
    display: flex;
    flex-direction: column;
}

/* Cada Item do Accordion (Pergunta + Resposta) */
.elementor-widget-n-accordion .e-n-accordion-item {
    background: rgba(255, 255, 255, 0.05) !important; /* Fundo transparente/vidro */
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 16px !important;
    overflow: hidden;
    transition: all 0.3s ease !important;
}

/* Efeito Hover no Item */
.elementor-widget-n-accordion .e-n-accordion-item:hover {
    background: rgba(255, 255, 255, 0.08) !important;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    border-color: rgba(86, 187, 123, 0.4) !important; /* Tom de verde do Inove EAD */
}

/* Estado Ativo (Pergunta Aberta) */
.elementor-widget-n-accordion .e-n-accordion-item[open],
.elementor-widget-n-accordion .e-n-accordion-item.e-active {
    background: rgba(255, 255, 255, 0.1) !important;
    border-color: #56bb7b !important; /* Verde em destaque */
    box-shadow: 0 5px 25px rgba(86, 187, 123, 0.15);
}

/* Título da Pergunta (Botão) */
.elementor-widget-n-accordion .e-n-accordion-item-title {
    padding: 20px 25px !important;
    transition: color 0.3s ease !important;
}

.elementor-widget-n-accordion .e-n-accordion-item-title-text {
    font-size: 1.1rem !important;
    font-weight: 600 !important;
    color: #ffffff !important;
}

/* Ícone da Pergunta */
.elementor-widget-n-accordion .e-n-accordion-item-title-icon {
    color: #56bb7b !important;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
}

/* Ícone Rotação quando Aberto (Se Elementor usa classes nativas) */
.elementor-widget-n-accordion .e-n-accordion-item[open] .e-n-accordion-item-title-icon,
.elementor-widget-n-accordion .e-n-accordion-item.e-active .e-n-accordion-item-title-icon {
    transform: rotate(180deg) scale(1.2) !important;
}

/* Painel de Resposta */
.elementor-widget-n-accordion .e-n-accordion-item-panel {
    border-top: 1px solid rgba(255, 255, 255, 0.05) !important;
    padding: 0px 25px 25px 25px !important;
    color: #d1d1d1 !important;
    line-height: 1.6 !important;
}

/* Animação suave no título e resposta */
.elementor-widget-n-accordion .e-n-accordion-item-panel * {
    opacity: 0.9;
}
</style>
`;

$('head').append(faqStyles);

fs.writeFileSync('index.html', $.html());
console.log('Added modern FAQ styles.');
