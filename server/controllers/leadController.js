import { accessToken, adAccountId, pageId, formId, apiUrl ,adSetId,page_post_id } from "../fbConfig.js";
import axios from "axios";
// Create a Lead Ad Campaign
export const createAdCampaign = async (req, res) => {
    try {
        const response = await axios.post(`${apiUrl}/act_${adAccountId}/campaigns`, {
            name: "Test Campaign",
            objective: "OUTCOME_LEADS",
            status: "PAUSED",
            special_ad_categories: [],
            access_token: accessToken,
        });

        res.json({ message: "Campaign Created", data: response.data });
    } catch (error) {
        res.status(500).json({ error: error.response?.data || error.message });
    }
};

// Fetch Leads from Facebook Lead Form
export const getLeads = async (req, res) => {
    try {
        const response = await axios.get(`${apiUrl}/${formId}/leads`, {
            params: { access_token: accessToken },
        });

        res.json({ message: "Leads Retrieved", data: response.data });
    } catch (error) {
        res.status(500).json({ error: error.response?.data || error.message });
    }
};
export const createAdCreative = async (req, res) => {
    try {
      // Use the lead form ID from request body or from config
      const leadFormId = req.body.leadFormId || formId;
      const url = `${apiUrl}/act_${adAccountId}/adcreatives`;
      const payload = {
        name: "Test Ad Creative",
        object_story_spec: {
          page_id: pageId,
          link_data: {
            message: "Sign up now for our offers!",
            link: "https://www.yourwebsite.com",
            call_to_action: {
              type: "SIGN_UP",
              value: { lead_gen_form_id: leadFormId }
            }
          }
        },
        access_token: accessToken
      };
  
      const response = await axios.post(url, payload);
      console.log("Ad Creative Created:", response.data);
      res.json({ message: "Ad creative created", data: response.data });
    } catch (error) {
      console.error("Error in createAdCreative:", error.response ? error.response.data : error.message);
      res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
  };
  
  // Create an Ad using the creative and an existing ad set
  export const createAd = async (req, res) => {
    try {
      const { adset_id, page_post_id } = req.body;
  
      const response = await axios.post(
        `https://graph.facebook.com/v18.0/act_${adAccountId}/ads`,
        {
          name: "Test Ad without Creative",
          adset_id,
          page_id: pageId,
          status: "PAUSED",
          creative: { object_story_id: page_post_id },
          access_token: accessToken,
        }
      );
  
      res.json(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
      res.status(500).json({ error: error.response?.data || error.message });
    }
  };
  
  // Input Test Leads into the Lead Form
  export const inputTestLeads = async (req, res) => {
    try {
      // Use the form ID from request or config
      const formIdValue = req.body.formId || formId;
      const url = `${apiUrl}/${formIdValue}/test_leads?access_token=${accessToken}`;
      const response = await axios.post(url);
      console.log("Test Lead Input Triggered:", response.data);
      res.json({ message: "Test lead input triggered", data: response.data });
    } catch (error) {
      console.error("Error in inputTestLeads:", error.response ? error.response.data : error.message);
      res.status(500).json({ error: error.response ? error.response.data : error.message });
    }
  };