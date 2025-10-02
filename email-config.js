// email-config.js
// Configuración para EmailJS (https://www.emailjs.com/)

const emailConfig = {
    serviceId: 'your_service_id', // Crea un servicio en EmailJS
    templateId: 'your_template_id', // Crea una plantilla
    userId: 'your_user_id' // Tu User ID de EmailJS
};

// Función para enviar email
async function sendEmail(formData) {
    try {
        const response = await emailjs.send(
            emailConfig.serviceId,
            emailConfig.templateId,
            {
                from_name: `${formData.firstName} ${formData.lastName}`,
                from_email: formData.email,
                subject: formData.subject,
                project_type: formData.projectType,
                message: formData.message,
                to_email: 'oscarnunez@trashgamez.net'
            },
            emailConfig.userId
        );
        
        return { success: true, data: response };
    } catch (error) {
        return { success: false, error: error };
    }
}