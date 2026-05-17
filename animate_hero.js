const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('index.html', 'utf8');
const $ = cheerio.load(html, { decodeEntities: false });

const animationStyles = `
<style id="custom-hero-animations">
/* ========================================================
   ANIMAÇÕES SOFISTICADAS NA SEÇÃO PRINCIPAL (HERO)
   ======================================================== */

/* Keyframe para o Surgimento Suave (Fade In Up) */
@keyframes heroFadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Keyframe para o Foguete Flutuando (Efeito Gravidade) */
@keyframes rocketFloat {
    0% {
        transform: translateY(0px) rotate(0deg);
    }
    50% {
        transform: translateY(-15px) rotate(4deg);
    }
    100% {
        transform: translateY(0px) rotate(0deg);
    }
}

/* Animação do Título Principal (Construa sua Carreira) */
.elementor-element-4827e1c7, 
.elementor-element-36b75d89 {
    opacity: 0;
    animation: heroFadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
}

/* Configuração Inicial da Lista de Benefícios */
.elementor-element-7ef56d00 .elementor-icon-list-item,
.elementor-element-1018c2ab .elementor-icon-list-item {
    opacity: 0;
    animation: heroFadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
}

/* Animação Escalonada (Staggered) para os itens da lista */
.elementor-element-7ef56d00 .elementor-icon-list-item:nth-child(1),
.elementor-element-1018c2ab .elementor-icon-list-item:nth-child(1) {
    animation-delay: 0.4s !important;
}
.elementor-element-7ef56d00 .elementor-icon-list-item:nth-child(2),
.elementor-element-1018c2ab .elementor-icon-list-item:nth-child(2) {
    animation-delay: 0.6s !important;
}
.elementor-element-7ef56d00 .elementor-icon-list-item:nth-child(3),
.elementor-element-1018c2ab .elementor-icon-list-item:nth-child(3) {
    animation-delay: 0.8s !important;
}
.elementor-element-7ef56d00 .elementor-icon-list-item:nth-child(4),
.elementor-element-1018c2ab .elementor-icon-list-item:nth-child(4) {
    animation-delay: 1.0s !important;
}

/* Animação do Ícone do Foguete Flutuante */
.elementor-element-2138700f {
    animation: rocketFloat 5s ease-in-out infinite !important;
    transform-origin: center bottom;
    /* Adicionar um leve brilho no foguete para parecer ativo */
    filter: drop-shadow(0 0 8px rgba(86, 187, 123, 0.3));
    transition: filter 0.3s ease;
}

.elementor-element-2138700f:hover {
    filter: drop-shadow(0 0 15px rgba(86, 187, 123, 0.6));
}
</style>
`;

// Remove previous animation styles if they exist
$('style').each((i, el) => {
    const text = $(el).text();
    if (text.includes('ANIMAÇÕES SOFISTICADAS NA SEÇÃO PRINCIPAL (HERO)')) {
        $(el).remove();
    }
});

$('head').append(animationStyles);

fs.writeFileSync('index.html', $.html());
console.log('Successfully added modern hero animations!');
