    import { accessToken, adAccountId, pageId, formId, apiUrl ,adSetId,page_post_id } from "../fbConfig.js";
    import axios from "axios";

    // Create a Lead Ad Campaign
    export const createAdCampaign = async (req, res) => {
        try {
            const response = await axios.post(`${apiUrl}/act_${adAccountId}/campaigns`, {
                name: "Test Campaign2",
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
    // Create an Ad Set
    export const createAdSet = async (req, res) => {
    try {
        const response = await axios.post(`${apiUrl}/act_${adAccountId}/adsets`, {
            name: "Test Ad Set",
            campaign_id: req.body.campaignId, // Pass Campaign ID from frontend/Postman
            billing_event: "IMPRESSIONS",
            optimization_goal: "LEAD_GENERATION", // ✅ FIXED: Correct Optimization Goal
            bid_strategy: "LOWEST_COST_WITHOUT_CAP", // ✅ FIXED: Bid strategy added

            // Alternative: Use a bid cap instead (optional)
            // bid_strategy: "LOWEST_COST_WITH_BID_CAP",
            // bid_amount: 500, // Set bid cap (adjust as needed)

            daily_budget: 1000220, // $10 per day (adjust as needed)
            start_time: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // Start in 10 min
            end_time: new Date(Date.now() + 30 * 60 * 60 * 1000).toISOString(), // Run for 24 hours

            targeting: {
                geo_locations: { countries: ["US"] }, // ✅ FIXED: Ensure correct structure
                age_min: 18,
                age_max: 65,
                genders: [1, 2] // 1 = Male, 2 = Female
            },

            status: "PAUSED",
            access_token: accessToken
        });

        res.json({ message: "Ad Set Created", data: response.data });
    } catch (error) {
        console.error("Error in createAdSet:", error.response?.data || error.message);
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
        // Use a post ID provided in the request body, or fall back to a default (pre-created) page post ID.
        const postId = req.body.postId || page_post_id;
        const payload = {
            name: "Ad Creative Using Post ID",
            object_story_id: postId, // Reference your pre-created Page post ID here.
            access_token: accessToken
        };
    
        const url = `${apiUrl}/act_${adAccountId}/adcreatives`;
        const response = await axios.post(url, payload);
        console.log("Ad Creative Created:", response.data);
        res.json({ message: "Ad Creative Created", data: response.data });
        } catch (error) {
        console.error("Error in createAdCreative:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: error.response ? error.response.data : error.message });
        }   
    };

    
    // Create an Ad using the creative and an existing ad set
    // Create an Ad using the Creative
    export const createAd = async (req, res) => {
    try {
        const { adset_id, creative_id } = req.body; // Accept IDs from Postman

        const response = await axios.post(
            `https://graph.facebook.com/v18.0/act_${adAccountId}/ads`,
            {
                name: "Test Ad",
                adset_id: adset_id,
                status: "PAUSED",
                creative: { creative_id: creative_id }, // Use Ad Creative ID
                access_token: accessToken
            } 
        );

        res.json({ message: "Ad Created", data: response.data });
    } catch (error) {
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
    // Import your Mongoose model

    // Fetch leads and store them in the database
