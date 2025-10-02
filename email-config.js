// email-config.js
// Configuración para EmailJS (https://www.emailjs.com/)

const emailConfig = {
    serviceId: 'service_fdsejwx',
    templateId: 'template_7wifylk', 
    userId: 'ltf2Bk-LCis48fFyd'
};

// Función opcional - ya no es necesaria pero la dejo por si la usas en otro lugar
async function sendEmail(formData) {
    try {
        const response = await emailjs.send(
            emailConfig.serviceId,
            emailConfig.templateId,
            {
                from_name: `${formData.firstName} ${formData.lastName}`,
                from_email: formData.email,
                message: formData.message,
                to_email: 'osja1601@gmail.com'
            },
            emailConfig.userId
        );
        
        return { success: true, data: response };
    } catch (error) {
        return { success: false, error: error };
    }
}