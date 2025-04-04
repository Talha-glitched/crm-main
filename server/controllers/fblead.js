import axios from 'axios';
import Lead from '../models/fblead.js';
import dotenv from 'dotenv';

dotenv.config();

// Function to retrieve lead details from Facebook API
import fetch from 'node-fetch';

const PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

export const fetchLeadData = async (leadgen_id) => {
    try {
        const url = `https://graph.facebook.com/v22.0/${leadgen_id}?access_token=${PAGE_ACCESS_TOKEN}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log("Fetch Lead Data reached");
        if (data.error) {
            console.error('❌ Error fetching lead data:', data.error);
            return null;
        }

        return data;
    } catch (error) {
        console.error('❌ Fetch Lead Data Error:', error);
        return null;
    }
};


// Webhook to receive Facebook leads
export const receiveLead = async (req, res) => {
  try {
    if (!req.body.entry) return res.sendStatus(400);

    for (const entry of req.body.entry) {
      for (const change of entry.changes) {
        if (change.field === 'leadgen') {
          const leadId = change.value.leadgen_id;
          const leadDetails = await fetchFacebookLead(leadId);

          if (leadDetails) {
            const newLead = new Lead({
              fullName: leadDetails.full_name || 'N/A',
              email: leadDetails.email || 'N/A',
              phoneNumber: leadDetails.phone_number || 'N/A',
              city: leadDetails.city || 'N/A',
              jobTitle: leadDetails.job_title || 'N/A',
              source: 'facebook',
            });

            await newLead.save();
            console.log('Lead saved:', newLead);
          }
        }
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Error processing lead:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Retrieve all leads
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
