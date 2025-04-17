import dotenv from 'dotenv';
dotenv.config();
export const MAILGUN_SMTP_PASS = process.env.MAILGUN_SMTP_PASS;
export const MAILGUN_SMTP_USER = process.env.MAILGUN_SMTP_USER;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const accessToken = process.env.ACCESS_TOKEN;
export const adAccountId = process.env.AD_ACCOUNT_ID;
export const pageId = process.env.PAGE_ID;
export const formId = process.env.FORM_ID;
export const apiUrl = "https://graph.facebook.com/v18.0";
export const adSetId = process.env.AD_SET_ID;
export const page_post_id= process.env.PAGE_POST_ID; 
export const JWT_SECRET = process.env.JWT_SECRET;
export const FB_VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;
export const FB_PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Your GitHub-provided token
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY; // Your SendGrid API key
export const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL; // Your SendGrid verified sender email
export const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD; // Your Gmail password (if using Gmail SMTP)
export const GMAIL_USER = process.env.GMAIL_USER; // Your Gmail email (if using Gmail SMTP)