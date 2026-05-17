const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

// Find and replace the faqStyles CSS block
// Since we appended it, we can just replace the block or append a more specific one that overrides it.
// To keep index.html clean, let's look for the old block and replace it.
const oldBlock = `/* ========================================================
   MODERNIZAÇÃO DA SEÇÃO DE PERGUNTAS FREQUENTES (FAQ)
   ======================================================== */`;

const newFaqStyles = `
<style id="custom-faq-styles">
/* ========================================================
   MODERNIZAÇÃO DA SEÇÃO DE PERGUNTAS FREQUENTES (FAQ) - CORRIGIDO
   ======================================================== */

/* Container geral do Accordion */
.elementor-widget-n-accordion .e-n-accordion {
    gap: 15px !important;
    display: flex;
    flex-direction: column;
    background: transparent !important;
}

/* Resetar backgrounds padrão do Elementor que causam o fundo cinza */
.elementor-widget-n-accordion .e-n-accordion-item,
.elementor-widget-n-accordion .e-n-accordion-item-title,
.elementor-widget-n-accordion .e-n-accordion-item-panel {
    background-color: transparent !important;
    background: transparent !important;
}

/* Aplicar o fundo escuro translúcido premium apenas no card (item) */
.elementor-widget-n-accordion .e-n-accordion-item {
    background: rgba(255, 255, 255, 0.03) !important;
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    border-radius: 14px !important;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
}

/* Efeito Hover no Card */
.elementor-widget-n-accordion .e-n-accordion-item:hover {
    background: rgba(255, 255, 255, 0.06) !important;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    border-color: rgba(86, 187, 123, 0.4) !important; /* Borda verde suave */
}

/* Estado Ativo (Pergunta Aberta) */
.elementor-widget-n-accordion .e-n-accordion-item[open],
.elementor-widget-n-accordion .e-n-accordion-item.e-active {
    background: rgba(0, 0, 0, 0.2) !important; /* Fundo ligeiramente mais escuro para destacar o painel */
    border-color: #56bb7b !important; /* Borda verde em destaque */
    box-shadow: 0 5px 25px rgba(86, 187, 123, 0.1);
}

/* Estilo do Título (Pergunta) */
.elementor-widget-n-accordion .e-n-accordion-item-title {
    padding: 22px 25px !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Texto da Pergunta - Corrigindo contraste e visibilidade */
.elementor-widget-n-accordion .e-n-accordion-item-title-text {
    font-size: 1.05rem !important;
    font-weight: 600 !important;
    color: #ffffff !important; /* Forçar texto totalmente branco */
    text-shadow: 0 1px 2px rgba(0,0,0,0.5);
    transition: color 0.3s ease;
}

/* Hover no título muda cor do texto */
.elementor-widget-n-accordion .e-n-accordion-item:hover .e-n-accordion-item-title-text {
    color: #56bb7b !important; /* Texto verde no hover */
}

/* Ícone */
.elementor-widget-n-accordion .e-n-accordion-item-title-icon {
    color: #56bb7b !important;
    font-size: 1.2rem !important;
    transition: transform 0.3s ease !important;
}

/* Rotação do ícone quando aberto */
.elementor-widget-n-accordion .e-n-accordion-item[open] .e-n-accordion-item-title-icon,
.elementor-widget-n-accordion .e-n-accordion-item.e-active .e-n-accordion-item-title-icon {
    transform: rotate(180deg) !important;
}

/* Painel de Resposta */
.elementor-widget-n-accordion .e-n-accordion-item-panel {
    padding: 0 25px 22px 25px !important;
    color: #e0e0e0 !important; /* Texto da resposta cinza claro bem legível */
    font-size: 0.95rem !important;
    line-height: 1.6 !important;
}
</style>
`;

// Let's replace the old style block if it exists
let rawHtml = $.html();
if (rawHtml.includes('/* MODERNIZAÇÃO DA SEÇÃO DE PERGUNTAS FREQUENTES (FAQ) */')) {
    // If we appended it, it will be inside a <style> block.
    // To make it easy and robust, we can just append the new styles, which will override the old ones due to CSS specificity.
    // But let's try to remove the old one first to avoid bloat.
    $('style').each((i, el) => {
        const text = $(el).text();
        if (text.includes('MODERNIZAÇÃO DA SEÇÃO DE PERGUNTAS FREQUENTES (FAQ)')) {
            $(el).remove();
        }
    });
}

$('head').append(newFaqStyles);
fs.writeFileSync('index.html', $.html());
console.log('Successfully fixed FAQ backgrounds and text contrast!');
