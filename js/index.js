// Smooth scroll para navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animação de fade-in para elementos ao scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.slide').forEach(slide => {
    observer.observe(slide);
});

// Contador animado para estatísticas
function animateValue(element, start, end, duration, suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Ativar contadores quando visíveis
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const h4 = entry.target.querySelector('h4');
            const text = h4.textContent;
            const match = text.match(/(\d+)/);
            if (match) {
                const value = parseInt(match[1]);
                const suffix = text.replace(/\d+/, '');
                h4.textContent = '0' + suffix;
                animateValue(h4, 0, value, 1500, suffix);
                entry.target.dataset.animated = 'true';
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// Adicionar efeito hover nas tabelas
document.querySelectorAll('.comparativo-table tr').forEach(row => {
    row.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.01)';
        this.style.transition = 'transform 0.2s ease';
    });
    row.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
    });
});

// Log para debug
console.log('Apresentação carregada com sucesso!');
console.log('Total de slides:', document.querySelectorAll('.slide').length);