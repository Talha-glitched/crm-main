import { fetchLeadData } from '../utils/fbUtil.js';
import Lead from '../models/fblead.js';

export const receiveLead = async (req, res) => {
  try {
    console.log("📩 Incoming webhook:", JSON.stringify(req.body, null, 2));
    
    if (!req.body.entry) return res.sendStatus(400);

    // Process each entry and change in the webhook payload
    for (const entry of req.body.entry) {
      for (const change of entry.changes) {
        if (change.field === 'leadgen') {
          const leadId = change.value.leadgen_id;
          console.log("🔎 New lead ID:", leadId);

          // Fetch lead details from Facebook
          const leadData = await fetchLeadData(leadId);
          if (!leadData) {
            console.error("❌ No lead data returned for lead ID:", leadId);
            continue;
          }

          // Facebook returns field_data as an array. Map it to an object.
          let mappedData = {};
          if (leadData.field_data && Array.isArray(leadData.field_data)) {
            mappedData = leadData.field_data.reduce((acc, field) => {
              acc[field.name] = field.values[0];
              return acc;
            }, {});
          }
          
          // Create a new Lead document. Provide defaults if a field is missing.
          const newLead = new Lead({
            fullName: mappedData.full_name || "N/A",
            email: mappedData.email || "N/A",
            phoneNumber: mappedData.phone_number || "N/A",
            city: mappedData.city || "N/A",
            jobTitle: mappedData.job_title || "N/A",
            source: "facebook",
          });

          await newLead.save();
          console.log("✅ Lead saved:", newLead);
        }
      }  
    }
    res.sendStatus(200);
  } catch (error) {
    console.error("❌ Error processing lead:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    console.error("❌ Error fetching leads:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};  
