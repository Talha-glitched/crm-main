import sgMail from '@sendgrid/mail';

export const sendMail = async (to, subject, html) => {
    console.log('📧 sendMail called with:', { to, subject, htmlLength: html?.length });

    try {
        // Set SendGrid API key
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const msg = {
            to: to,
            from: process.env.SENDGRID_FROM_EMAIL,
            subject: subject,
            html: html,
        };

        console.log('📤 Sending email with SendGrid Web API (mail.js):', {
            from: msg.from,
            to: msg.to,
            subject: msg.subject
        });

        const result = await sgMail.send(msg);
        console.log('✅ Email sent successfully via SendGrid Web API (mail.js):', result[0].statusCode);
        return result;
    } catch (error) {
        console.error('❌ sendMail error:', error);
        console.error('❌ Error details:', {
            message: error.message,
            code: error.code,
            response: error.response?.body
        });
        throw error;
    }
}