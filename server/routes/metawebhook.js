// routes/metaWebhook.js
const express = require('express');
const router = express.Router();
const Lead = require('../models/lead'); // Your lead schema

const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || 'MY_SECRET_TOKEN';

// GET endpoint for webhook verification (used by Facebook)
router.get('/', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(400);
    }
});

// POST endpoint to receive lead data from Meta Ads
router.post('/', async (req, res) => {
    try {
        const body = req.body;
        if (body.object === 'page') {
            // Loop through each entry (batching may occur)
            body.entry.forEach(entry => {
                // Each entry may contain multiple changes
                entry.changes.forEach(async change => {
                    if (change.field === 'leadgen') {
                        const leadData = change.value;
                        const { form_id, leadgen_id, created_time, field_data } = leadData;

                        // Convert the field_data array into an object for easier access
                        let leadFields = {};
                        field_data.forEach(field => {
                            // For example, field.name might be "first_name" and field.values[0] is the submitted value
                            leadFields[field.name] = field.values[0];
                        });

                        // Create a new lead using your schema:
                        // - Use first_name and last_name to form the clientName
                        // - Store phone in clientPhone
                        // - Set source as 'facebook'
                        // - Set status to 'new' (you may adjust as needed)
                        // - Optionally store email in description if provided
                        // - Use leadgen_id as uid, and city if provided
                        const newLead = new Lead({
                            clientName: leadFields.first_name
                                ? (leadFields.last_name ? `${leadFields.first_name} ${leadFields.last_name}` : leadFields.first_name)
                                : '',
                            clientPhone: leadFields.phone || '',
                            source: 'facebook',
                            status: 'new',
                            description: leadFields.email ? `Email: ${leadFields.email}` : '',
                            uid: leadgen_id,
                            city: leadFields.city || '',
                            // Other schema fields (property, allocatedTo, images, etc.) will use their defaults
                        });

                        await newLead.save();
                        console.log("New lead saved:", newLead);
                    }
                });
            });
            // Respond with 200 OK to Facebook
            res.status(200).send('EVENT_RECEIVED');
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error("Error processing webhook:", error);
        res.sendStatus(500);
    }
});

module.exports = router;
