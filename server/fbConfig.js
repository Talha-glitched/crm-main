import dotenv from 'dotenv';
dotenv.config();


export const accessToken = process.env.ACCESS_TOKEN;
export const adAccountId = process.env.AD_ACCOUNT_ID;
export const pageId = process.env.PAGE_ID;
export const formId = process.env.FORM_ID;
export const apiUrl = "https://graph.facebook.com/v18.0";
export const adSetId = process.env.AD_SET_ID;
export const page_post_id= process.env.PAGE_POST_ID;