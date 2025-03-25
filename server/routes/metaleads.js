import express from "express";
import { createAdCampaign, getLeads, createAdCreative, createAd, inputTestLeads, createAdSet, } from '../controllers/leadController.js';
const router = express.Router();

router.post("/create-campaign", createAdCampaign);
router.get("/get-leads", getLeads);
router.post("/create-adset", createAdSet);
// POST to create an ad creative
router.post("/create-adcreative", createAdCreative);    

// POST to create an ad using the creative
router.post("/create-ad", createAd);    

// POST to input test leads into the lead form
router.post("/input-test-leads", inputTestLeads);
export default router;
