const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

const newFaqStyles = `
<style id="custom-faq-styles">
/* ========================================================
   MODERNIZAÇÃO DA SEÇÃO DE PERGUNTAS FREQUENTES (FAQ) - FINAL
   ======================================================== */

/* Resetar o widget principal e container de fundo */
.elementor-element-4a8cc3f4,
.elementor-element-4a8cc3f4 > .elementor-widget-container {
    background-color: transparent !important;
    background: transparent !important;
    box-shadow: none !important;
    border: none !important;
}

/* Forçar reset de todos os items e filhos para não pegarem fundo cinza */
.elementor-element-4a8cc3f4 .e-n-accordion-item,
.elementor-element-4a8cc3f4 .e-n-accordion-item-title,
.elementor-element-4a8cc3f4 .e-con {
    background-color: transparent !important;
    background: transparent !important;
    box-shadow: none !important;
    border: none !important;
}

/* Item do Accordion (Card Individual) */
.elementor-element-4a8cc3f4 .e-n-accordion-item {
    background: rgba(255, 255, 255, 0.03) !important; /* Fundo transparente escuro */
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    border-radius: 14px !important;
    margin-bottom: 16px !important; /* Espaço físico entre os cards */
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
    display: block !important;
}

/* Hover no Item */
.elementor-element-4a8cc3f4 .e-n-accordion-item:hover {
    background: rgba(255, 255, 255, 0.06) !important;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3) !important;
    border-color: rgba(86, 187, 123, 0.4) !important; /* Verde suave na borda */
}

/* Item Ativo (Aberto) */
.elementor-element-4a8cc3f4 .e-n-accordion-item[open] {
    background: rgba(0, 0, 0, 0.2) !important;
    border-color: #56bb7b !important; /* Verde em destaque */
    box-shadow: 0 5px 25px rgba(86, 187, 123, 0.1) !important;
}

/* Header/Título do Accordion */
.elementor-element-4a8cc3f4 .e-n-accordion-item-title {
    padding: 22px 25px !important;
    display: flex !important;
    flex-direction: row !important; /* Forçar ordem normal */
    justify-content: space-between !important; /* Texto na esquerda, Ícone na direita */
    align-items: center !important;
    cursor: pointer;
    width: 100% !important;
    box-sizing: border-box !important;
}

/* Garantir posicionamento: texto esquerda, ícone direita */
.elementor-element-4a8cc3f4 .e-n-accordion-item-title-header {
    order: 1 !important; /* Primeiro */
    margin: 0 !important;
    text-align: left !important;
}

.elementor-element-4a8cc3f4 .e-n-accordion-item-title-icon {
    order: 2 !important; /* Segundo */
    margin: 0 !important;
    color: #56bb7b !important;
    font-size: 1.1rem !important;
    display: flex !important;
    align-items: center !important;
    transition: transform 0.3s ease !important;
}

/* Estilo do Texto da Pergunta */
.elementor-element-4a8cc3f4 .e-n-accordion-item-title-text {
    font-size: 1.05rem !important;
    font-weight: 600 !important;
    color: #ffffff !important;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    transition: color 0.3s ease;
}

/* Hover no título muda cor do texto */
.elementor-element-4a8cc3f4 .e-n-accordion-item:hover .e-n-accordion-item-title-text {
    color: #56bb7b !important;
}

/* Rotação do Ícone quando aberto */
.elementor-element-4a8cc3f4 .e-n-accordion-item[open] .e-n-accordion-item-title-icon {
    transform: rotate(180deg) !important;
}

/* Painel de Resposta (Container filho expandido) */
.elementor-element-4a8cc3f4 .e-n-accordion-item .e-con {
    padding: 0 25px 22px 25px !important;
    margin: 0 !important;
    width: 100% !important;
    box-sizing: border-box !important;
}

/* Estilo do Texto da Resposta */
.elementor-element-4a8cc3f4 .e-n-accordion-item .elementor-widget-text-editor p {
    color: #e0e0e0 !important;
    font-size: 0.95rem !important;
    line-height: 1.6 !important;
    margin: 0 !important;
    text-align: left !important;
}
</style>
`;

// Remove previous custom styles
$('style').each((i, el) => {
    const text = $(el).text();
    if (text.includes('MODERNIZAÇÃO DA SEÇÃO DE PERGUNTAS FREQUENTES (FAQ)')) {
        $(el).remove();
    }
});

$('head').append(newFaqStyles);
fs.writeFileSync('index.html', $.html());
console.log('FAQ layout and style fixed successfully!');
