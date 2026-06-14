// Fermer le menu de navigation au clic sur un lien
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        // Le scroll smooth est géré par le HTML
    });
});

// Formulaire de contact
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les valeurs
        const nom = document.getElementById('nom').value;
        const email = document.getElementById('email').value;
        const telephone = document.getElementById('telephone').value;
        const message = document.getElementById('message').value;
        
        // Valider les champs
        if (!nom || !email || !message) {
            alert('Veuillez remplir tous les champs obligatoires');
            return;
        }
        
        // Valider l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Veuillez entrer une adresse email valide');
            return;
        }
        
        // Afficher un message de confirmation
        alert(`Merci ${nom}! Votre message a été reçu. Nous vous contacterons bientôt à ${email}.`);
        
        // Réinitialiser le formulaire
        contactForm.reset();
    });
}

// Ajouter des animations au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideIn 0.5s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer les éléments du menu
document.querySelectorAll('.menu-item').forEach(item => {
    item.style.opacity = '0';
    observer.observe(item);
});

// Activer le lien de navigation actif
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Ajouter un effet de survol sur les cartes de menu
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Ajouter un style au lien actif
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--accent-color) !important;
        border-bottom: 2px solid var(--accent-color);
        padding-bottom: 0.25rem;
    }
`;
document.head.appendChild(style);

// Charger l'année actuelle dans le footer
window.addEventListener('load', () => {
    const year = new Date().getFullYear();
    // Optionnel: mettre à jour le footer avec l'année actuelle
    const footerText = document.querySelector('.footer p');
    if (footerText) {
        footerText.textContent = `© ${year} Restaurant Kamanda. Tous droits réservés.`;
    }
});

// Fonction pour agrandir les images du menu au clic (optionnel)
document.querySelectorAll('.menu-item').forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', function() {
        const h4 = this.querySelector('h4');
        if (h4) {
            // Vous pouvez ajouter une logique pour afficher plus de détails
            console.log('Plat cliqué: ' + h4.textContent);
        }
    });
});
