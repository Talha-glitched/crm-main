import fetch from 'node-fetch';

const PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

export const fetchLeadData = async (leadgen_id) => {
  try {
    const url = `https://graph.facebook.com/v22.0/${leadgen_id}?access_token=${PAGE_ACCESS_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("Fetched lead data:", data);
    if (data.error) {
      console.error("❌ Error fetching lead data:", data.error);
      return null;
    }
    return data;
  } catch (error) {
    console.error("❌ Fetch Lead Data Error:", error);
    return null;
  }
};
