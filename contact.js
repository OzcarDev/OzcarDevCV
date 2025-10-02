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
            await this.submitForm();
            
            this.showMessage('¡Mensaje enviado exitosamente! Te responderé dentro de 24 horas.', 'success');
            this.form.reset();
            this.resetFormState();
            
        } catch (error) {
            this.showMessage('Lo siento, hubo un error enviando tu mensaje. Por favor intenta nuevamente o contáctame directamente.', 'error');
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

    async submitForm() {
        const formData = this.collectFormData();
        
        try {
            // Verificar que EmailJS esté cargado
            if (typeof emailjs === 'undefined') {
                throw new Error('EmailJS no está cargado. Verifica el script en el HTML.');
            }
            
            // Inicializar EmailJS
            await emailjs.init(emailConfig.userId);
            
            console.log('Enviando email con datos:', formData);
            
            // Enviar email usando EmailJS con los campos que tienes
            const response = await emailjs.send(
                emailConfig.serviceId,
                emailConfig.templateId,
                {
                    from_name: `${formData.firstName} ${formData.lastName}`,
                    from_email: formData.email,
                    message: formData.message,
                    timestamp: new Date().toLocaleString('es-ES')
                }
            );
            
            console.log('✅ Email enviado exitosamente:', response);
            return { success: true, data: response };
            
        } catch (error) {
            console.error('❌ Error enviando email:', error);
            console.error('Detalles del error:', {
                status: error.status,
                text: error.text,
                userID: emailConfig.userId,
                serviceID: emailConfig.serviceId,
                templateID: emailConfig.templateId
            });
            throw new Error('No se pudo enviar el mensaje. Por favor intenta nuevamente.');
        }
    }

    // Recolectar datos del formulario (SOLO los campos que tienes)
    collectFormData() {
        return {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
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
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ContactFormManager();
});