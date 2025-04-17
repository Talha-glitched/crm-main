import express from 'express';
import { receiveLead, getLeads } from '../controllers/fblead.js';

const router = express.Router();

// POST route for Facebook webhook events (receiving leads)
router.post('/webhook', receiveLead);

// GET route for verifying the webhook with Facebook
router.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log("Webhook verified successfully");
    res.status(200).send(challenge);
  } else {
    console.error("Webhook verification failed");
    res.sendStatus(403);
  }
});

// Optional: GET route to fetch stored leads from your DB
router.get('/fblead', getLeads);

export default router;
