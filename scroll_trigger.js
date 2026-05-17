const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

// 1. Remove previous custom animation styles to avoid bloat
$('style').each((i, el) => {
    const text = $(el).text();
    if (text.includes('ANIMAÇÕES SOFISTICADAS NA SEÇÃO PRINCIPAL') || 
        text.includes('ANIMAÇÕES SOFISTICADAS NA SEGUNDA SEÇÃO')) {
        $(el).remove();
    }
});

// 2. Define the new consolidated CSS for transitions on scroll
const newScrollStyles = `
<style id="custom-scroll-reveal-styles">
/* ========================================================
   SISTEMA DE ANIMAÇÃO AO ROLAR A TELA (SCROLL REVEAL)
   ======================================================== */

/* Configuração Inicial de invisibilidade para os elementos que vão surgir */
.elementor-element-4827e1c7, 
.elementor-element-36b75d89,
.elementor-element-7ef56d00 .elementor-icon-list-item,
.elementor-element-1018c2ab .elementor-icon-list-item,
.elementor-element-38869286,
.elementor-element-20b1ea80 .elementor-icon-list-item {
    opacity: 0 !important;
    transform: translateY(30px) !important;
    transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

/* Classe ativada via JavaScript quando o usuário rola até a seção */
.reveal-active {
    opacity: 1 !important;
    transform: translateY(0) !important;
}

/* Efeito Cascata (Staggered Delay) para a Seção 1 (Hero) - Desktop & Mobile */
.elementor-element-7ef56d00 .elementor-icon-list-item:nth-child(1).reveal-active,
.elementor-element-1018c2ab .elementor-icon-list-item:nth-child(1).reveal-active { transition-delay: 0.1s !important; }
.elementor-element-7ef56d00 .elementor-icon-list-item:nth-child(2).reveal-active,
.elementor-element-1018c2ab .elementor-icon-list-item:nth-child(2).reveal-active { transition-delay: 0.3s !important; }
.elementor-element-7ef56d00 .elementor-icon-list-item:nth-child(3).reveal-active,
.elementor-element-1018c2ab .elementor-icon-list-item:nth-child(3).reveal-active { transition-delay: 0.5s !important; }
.elementor-element-7ef56d00 .elementor-icon-list-item:nth-child(4).reveal-active,
.elementor-element-1018c2ab .elementor-icon-list-item:nth-child(4).reveal-active { transition-delay: 0.7s !important; }

/* Efeito Cascata (Staggered Delay) para a Seção 2 (Por que Acessar) */
.elementor-element-20b1ea80 .elementor-icon-list-item:nth-child(1).reveal-active { transition-delay: 0.2s !important; }
.elementor-element-20b1ea80 .elementor-icon-list-item:nth-child(2).reveal-active { transition-delay: 0.4s !important; }
.elementor-element-20b1ea80 .elementor-icon-list-item:nth-child(3).reveal-active { transition-delay: 0.6s !important; }


/* Animação Contínua do Foguete (Não precisa de scroll reveal, ele flutua sempre) */
@keyframes rocketFloat {
    0% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(4deg); }
    100% { transform: translateY(0px) rotate(0deg); }
}

.elementor-element-2138700f {
    animation: rocketFloat 5s ease-in-out infinite !important;
    transform-origin: center bottom;
    filter: drop-shadow(0 0 8px rgba(86, 187, 123, 0.3));
    transition: filter 0.3s ease;
}

.elementor-element-2138700f:hover {
    filter: drop-shadow(0 0 15px rgba(86, 187, 123, 0.6));
}
</style>
`;

$('head').append(newScrollStyles);

// 3. Define and inject the IntersectionObserver script block at the end of the body
const revealScript = `
<script id="custom-scroll-reveal-script">
document.addEventListener("DOMContentLoaded", function() {
    // Configurações do Observador
    const observerOptions = {
        root: null, // usa a tela inteira (viewport)
        rootMargin: "0px 0px -80px 0px", // ativa um pouco antes de aparecer totalmente
        threshold: 0.1 // dispara quando 10% do elemento estiver visível
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-active");
                observer.unobserve(entry.target); // Para de observar após animar uma vez
            }
        });
    }, observerOptions);

    // Seletores dos elementos que devem surgir suavemente ao rolar
    const elementsToReveal = [
        '.elementor-element-4827e1c7', // Título Hero Desktop
        '.elementor-element-36b75d89', // Título Hero Mobile
        '.elementor-element-7ef56d00 .elementor-icon-list-item', // Itens Lista Hero Desktop
        '.elementor-element-1018c2ab .elementor-icon-list-item', // Itens Lista Hero Mobile
        '.elementor-element-38869286', // Título Seção 2
        '.elementor-element-20b1ea80 .elementor-icon-list-item' // Itens Lista Seção 2
    ];

    elementsToReveal.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            revealObserver.observe(el);
        });
    });
});
</script>
`;

// Remove previous script if it exists
$('#custom-scroll-reveal-script').remove();
$('body').append(revealScript);

fs.writeFileSync('index.html', $.html());
console.log('Successfully integrated IntersectionObserver for scroll-reveal animations!');
