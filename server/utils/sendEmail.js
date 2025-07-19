// utils/sendEmail.js
import sgMail from '@sendgrid/mail';

// Validation function for SendGrid configuration
export function validateSendGridConfig() {
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;

  const issues = [];

  if (!apiKey) {
    issues.push('SENDGRID_API_KEY is missing');
  } else if (!apiKey.startsWith('SG.')) {
    issues.push('SENDGRID_API_KEY format appears invalid (should start with SG.)');
  }

  if (!fromEmail) {
    issues.push('SENDGRID_FROM_EMAIL is missing');
  } else if (!fromEmail.includes('@')) {
    issues.push('SENDGRID_FROM_EMAIL format appears invalid');
  }

  return {
    isValid: issues.length === 0,
    issues,
    hasApiKey: !!apiKey,
    hasFromEmail: !!fromEmail
  };
}

export async function sendEmail(to, subject, htmlContent) {
  console.log('📧 sendEmail called with:', { to, subject, htmlContentLength: htmlContent?.length });

  // Validate configuration first
  const config = validateSendGridConfig();
  console.log('🔑 SendGrid configuration check:', config);

  if (!config.isValid) {
    const error = new Error(`SendGrid configuration issues: ${config.issues.join(', ')}`);
    console.error('❌ SendGrid configuration error:', error.message);
    throw error;
  }

  try {
    // Set SendGrid API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: to,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: subject,
      html: htmlContent,
    };

    console.log('📤 Sending email with SendGrid Web API:', {
      from: msg.from,
      to: msg.to,
      subject: msg.subject
    });

    const result = await sgMail.send(msg);
    console.log('✅ Email sent successfully via SendGrid Web API:', result[0].statusCode);
    return result;
  } catch (error) {
    console.error('❌ sendEmail error:', error);
    console.error('❌ Error details:', {
      message: error.message,
      code: error.code,
      response: error.response?.body
    });
    throw error;
  }
}
