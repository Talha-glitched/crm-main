import express from 'express';
import { fetchLeadData, getLeads } from '../controllers/fblead.js';
import Lead from '../models/fblead.js';
const router = express.Router();

// Facebook Webhook Route

router.post('/webhook', async (req, res) => {
    try {
        console.log('📩 Incoming Webhook:', JSON.stringify(req.body, null, 2));

        if (req.body.entry) {
            for (const entry of req.body.entry) {
                for (const change of entry.changes) {
                    if (change.field === 'leadgen') {
                        const leadgen_id = change.value.leadgen_id;
                        console.log(`🔎 New Lead ID: ${leadgen_id}`);

                        // Fetch lead details from Facebook API
                        const leadData = await fetchLeadData(leadgen_id);
                        console.log('📌 Lead Data:', leadData);

                        // Save lead to MongoDB
                        const newLead = new Lead({
                            clientName: leadData.full_name,
                            clientPhone: leadData.phone_number,
                            city: leadData.city,
                            jobTitle: leadData.job_title,
                            source: 'facebook',
                        });

                        await newLead.save();
                        console.log('✅ Lead Saved:', newLead);
                    }
                }
            }
        }
        res.status(200).send('Webhook received');
    } catch (error) {
        console.error('❌ Error processing webhook:', error);
        res.status(500).send('Internal Server Error');
    }
});
router.get('/webhook', (req, res) => {
    const VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;
    
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
  
    if (mode && token === VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.status(403).send('Forbidden');
    }
  });
  
// Get all leads
router.get('/fblead', getLeads);
router.get('/fetchlead',fetchLeadData);

export default router;
