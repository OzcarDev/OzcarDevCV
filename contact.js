// contact.js - Funcionalidades específicas para la página de contacto

class ContactFormManager {
    constructor() {
        this.form = null;
        this.submitBtn = null;
        this.isSubmitting = false;
        this.init();
    }

    init() {
        this.setupForm();
        this.setupRealTimeValidation();
        this.setupCharacterCounter();
        this.setupInputEffects();
    }

    // Configurar el formulario principal
    setupForm() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('submitBtn');
        
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Reset form handler
        this.form.addEventListener('reset', () => {
            this.resetFormState();
        });
    }

    // Validación en tiempo real
    setupRealTimeValidation() {
        const requiredFields = this.form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            field.addEventListener('blur', () => {
                this.validateField(field);
            });
            
            field.addEventListener('input', () => {
                this.clearFieldError(field);
            });
        });
    }

    // Contador de caracteres para el mensaje
    setupCharacterCounter() {
        const messageField = document.getElementById('message');
        const charCount = document.getElementById('charCount');
        
        if (!messageField || !charCount) return;

        messageField.addEventListener('input', () => {
            const count = messageField.value.length;
            charCount.textContent = count;
            
            // Cambiar color según la longitud
            if (count > 800) {
                charCount.style.color = '#ff6b6b';
            } else if (count > 500) {
                charCount.style.color = '#ffa500';
            } else {
                charCount.style.color = '#00ffff';
            }
        });
    }

    // Efectos visuales para inputs
    setupInputEffects() {
        const inputs = this.form.querySelectorAll('.wave-input');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    // Validar campo individual
    validateField(field) {
        const value = field.value.trim();
        const feedback = field.parentElement.querySelector('.form-feedback');
        
        if (!value) {
            this.showFieldError(field, 'This field is required');
            return false;
        }
        
        if (field.type === 'email' && !this.isValidEmail(value)) {
            this.showFieldError(field, 'Please enter a valid email address');
            return false;
        }
        
        this.clearFieldError(field);
        return true;
    }

    // Validar email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Mostrar error en campo
    showFieldError(field, message) {
        field.classList.add('error');
        const feedback = field.parentElement.querySelector('.form-feedback');
        if (feedback) {
            feedback.textContent = message;
            feedback.style.display = 'block';
        }
    }

    // Limpiar error de campo
    clearFieldError(field) {
        field.classList.remove('error');
        const feedback = field.parentElement.querySelector('.form-feedback');
        if (feedback) {
            feedback.style.display = 'none';
        }
    }

    // Manejar envío del formulario
    async handleFormSubmit() {
        if (this.isSubmitting) return;
        
        // Validar todos los campos requeridos
        if (!this.validateForm()) {
            this.showMessage('Please fix the errors in the form', 'error');
            return;
        }

        this.isSubmitting = true;
        this.setSubmitState(true);

        try {
            // Simular envío (reemplazar con tu servicio real)
            await this.submitForm();
            
            this.showMessage('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
            this.form.reset();
            this.resetFormState();
            
        } catch (error) {
            this.showMessage('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
            console.error('Form submission error:', error);
        } finally {
            this.isSubmitting = false;
            this.setSubmitState(false);
        }
    }

    // Validar formulario completo
    validateForm() {
        let isValid = true;
        const requiredFields = this.form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // Simular envío del formulario
    async submitForm() {
        // Aquí integrarías con tu servicio de email preferido:
        // - EmailJS (https://www.emailjs.com/)
        // - Formspree (https://formspree.io/)
        // - Netlify Forms (si hosteas en Netlify)
        
        const formData = this.collectFormData();
        
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simular respuesta exitosa
        console.log('Form data:', formData);
        
        // Para producción, descomenta y configura:
        /*
        const response = await fetch('https://formspree.io/f/your-form-id', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) throw new Error('Form submission failed');
        */
        
        return { success: true };
    }

    // Recolectar datos del formulario
    collectFormData() {
        return {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            projectType: document.getElementById('projectType').value,
            budget: document.getElementById('budget').value,
            timeline: document.getElementById('timeline').value,
            message: document.getElementById('message').value,
            reference: document.querySelector('input[name="reference"]:checked')?.value,
            newsletter: document.getElementById('newsletter').checked,
            timestamp: new Date().toISOString()
        };
    }

    // Cambiar estado del botón de envío
    setSubmitState(submitting) {
        const btnText = this.submitBtn.querySelector('.btn-text');
        const btnLoading = this.submitBtn.querySelector('.btn-loading');
        
        if (submitting) {
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-block';
            this.submitBtn.disabled = true;
        } else {
            btnText.style.display = 'inline-block';
            btnLoading.style.display = 'none';
            this.submitBtn.disabled = false;
        }
    }

    // Resetear estado del formulario
    resetFormState() {
        const errors = this.form.querySelectorAll('.error');
        errors.forEach(error => error.classList.remove('error'));
        
        const feedbacks = this.form.querySelectorAll('.form-feedback');
        feedbacks.forEach(feedback => feedback.style.display = 'none');
        
        document.getElementById('charCount').textContent = '0';
    }

    // Mostrar mensajes al usuario
    showMessage(message, type) {
        const messagesDiv = document.getElementById('formMessages');
        const alertClass = type === 'success' ? 'alert-success' : 'alert-error';
        
        messagesDiv.innerHTML = `
            <div class="alert ${alertClass}">
                ${message}
            </div>
        `;
        messagesDiv.style.display = 'block';
        
        // Auto-ocultar mensajes de éxito
        if (type === 'success') {
            setTimeout(() => {
                messagesDiv.style.display = 'none';
            }, 5000);
        }
    }

    // Inicializar tooltips (opcional)
    setupTooltips() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
}

// Funcionalidades adicionales de contacto
class ContactEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.setupQuickContact();
        this.setupSocialLinks();
        this.setupAvailabilityIndicator();
    }

    // Configurar contactos rápidos
    setupQuickContact() {
        // Agregar event listeners para los botones de contacto rápido
        const quickCallBtn = document.querySelector('a[href^="tel:"]');
        const quickEmailBtn = document.querySelector('a[href^="mailto:"]');
        
        if (quickCallBtn) {
            quickCallBtn.addEventListener('click', () => {
                this.trackContactAction('phone_click');
            });
        }
        
        if (quickEmailBtn) {
            quickEmailBtn.addEventListener('click', () => {
                this.trackContactAction('email_click');
            });
        }
    }

    // Configurar enlaces sociales
    setupSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-icons a');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const platform = link.getAttribute('aria-label').toLowerCase();
                this.trackContactAction(`social_${platform}`);
            });
        });
    }

    // Indicador de disponibilidad
    setupAvailabilityIndicator() {
        const statusDot = document.querySelector('.status-dot');
        if (!statusDot) return;

        // Simular cambio de estado (en una app real, esto vendría de una API)
        setInterval(() => {
            statusDot.classList.toggle('pulse');
        }, 2000);
    }

    // Trackear acciones de contacto (para analytics)
    trackContactAction(action) {
        console.log('Contact action:', action);
        // Aquí integrarías Google Analytics o similar
        // gtag('event', 'contact_action', { 'action': action });
    }

    // Copiar email al portapapeles
    setupEmailCopy() {
        const emailElement = document.querySelector('.contact-details .fs-4');
        if (!emailElement) return;

        emailElement.style.cursor = 'pointer';
        emailElement.title = 'Click to copy email';
        
        emailElement.addEventListener('click', async () => {
            const email = emailElement.textContent;
            
            try {
                await navigator.clipboard.writeText(email);
                this.showCopyFeedback('Email copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy email:', err);
                this.showCopyFeedback('Failed to copy email');
            }
        });
    }

    showCopyFeedback(message) {
        // Implementar feedback visual para copiado
        const feedback = document.createElement('div');
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--rosa);
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 10000;
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            document.body.removeChild(feedback);
        }, 3000);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = new ContactFormManager();
    const contactEnhancements = new ContactEnhancements();
    
    // Hacer disponible globalmente si es necesario
    window.contactFormManager = contactForm;
});

// Integración simple con EmailJS (ejemplo)
function initEmailJS() {
    // Descomenta y configura si usas EmailJS
    /*
    emailjs.init("YOUR_PUBLIC_KEY");
    
    window.submitContactForm = function(formData) {
        return emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
            from_name: `${formData.firstName} ${formData.lastName}`,
            from_email: formData.email,
            company: formData.company,
            project_type: formData.projectType,
            budget: formData.budget,
            timeline: formData.timeline,
            message: formData.message,
            reference: formData.reference,
            newsletter: formData.newsletter
        });
    };
    */
}