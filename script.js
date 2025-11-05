document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeContactForm();
});

function initializeNavigation() {
    const initialSection = getInitialSection();
    showSection(initialSection);
    
    const navLinks = document.querySelectorAll('.sub-navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            navigateToSection(targetId);
        });
    });
    
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1) || 'projects';
        showSection(hash);
    });
}

function getInitialSection() {
    const hash = window.location.hash.substring(1);
    return hash || 'projects';
}

function navigateToSection(sectionId) {
    showSection(sectionId);
    history.pushState(null, null, `#${sectionId}`);
}

function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    updateActiveNavLink(sectionId);
}

function updateActiveNavLink(activeId) {
    const navLinks = document.querySelectorAll('.sub-navbar a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
        }
    });
}

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    if (typeof emailjs === 'undefined') {
        console.warn('EmailJS no está cargado');
        return;
    }
    
    emailjs.init("ltf2Bk-LCis48fFyd");
    
    contactForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    
    if (!submitBtn) return;
    
    const originalText = submitBtn.innerHTML;
    setButtonLoading(submitBtn, true);
    
    emailjs.sendForm('service_fdsejwx', 'template_7wifylk', form)
        .then(() => {
            showMessage('success', 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.');
            form.reset();
        })
        .catch(error => {
            console.error('EmailJS Error:', error);
            showMessage('error', 'Sorry, there was an error sending your message. Please try again or contact me directly via email.');
        })
        .finally(() => {
            setButtonLoading(submitBtn, false, originalText);
        });
}

function setButtonLoading(button, isLoading, originalText = '') {
    if (isLoading) {
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    } else {
        button.disabled = false;
        button.innerHTML = originalText;
    }
}

function showMessage(type, message) {
    alert(message);
}