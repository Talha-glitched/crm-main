import express from 'express'
import { createLead, getLeadByPhone, getLead, getEmployeeLeads, getLeadsStat, getLeads, filterLead, updateLead, shiftLead, shareLead, archiveLead, deleteLead, deleteWholeCollection, searchLead, } from '../controllers/lead.js'
import { verifyEmployee, verifyManager, verifySuperAdmin, verifyToken } from '../middleware/auth.js'
import Lead from '../models//lead.js'
import { createError } from '../utils/error.js'
import { generateEmail, generateUpdateEmail } from '../utils/generateEmail.js'
import { sendEmail, validateSendGridConfig } from '../utils/sendEmail.js'

const router = express.Router()

// Basic logging middleware for all lead routes
router.use((req, res, next) => {
    console.log('📡 Lead route accessed:', {
        method: req.method,
        path: req.path,
        body: req.body,
        user: req.user?._id
    });
    next();
});

const verifyIsAllocatedTo = async (req, res, next) => {
    try {
        const { leadId } = req.params
        const findedLead = await Lead.findById(leadId)
        if (!Boolean(findedLead)) return next(createError(400, 'lead not exist'))
        if (findedLead.allocatedTo == req.user._id || req.user.role == ('manager' || 'super_admin')) next()
        else next(createError(401, "This lead is not allocated to you."))
    } catch (err) {
        next(createError(500, err.message))
    }
}

// Simple test endpoint without authentication
router.get('/ping', (req, res) => {
    console.log('🏓 Ping endpoint hit!');
    res.json({ message: 'Lead routes are working!', timestamp: new Date().toISOString() });
});

// Test endpoint for email functionality
router.get('/test-email', async (req, res) => {
    try {
        console.log('🧪 Testing email functionality...');

        // Test generateEmail
        console.log('🤖 Testing generateEmail...');
        const testEmailContent = await generateEmail('Test Client', 'Test Project', 'Test description');
        console.log('✅ generateEmail result:', testEmailContent.substring(0, 100) + '...');

        // Test generateUpdateEmail
        console.log('🤖 Testing generateUpdateEmail...');
        const testUpdateContent = await generateUpdateEmail('Test Client', 'Test Project', { status: 'updated' }, 'Test User');
        console.log('✅ generateUpdateEmail result:', testUpdateContent.substring(0, 100) + '...');

        // Test sendEmail (only if environment variables are set)
        const sendGridConfig = validateSendGridConfig();
        if (sendGridConfig.isValid) {
            console.log('📧 Testing sendEmail with SendGrid Web API...');
            await sendEmail('test@example.com', 'Test Email', '<h1>This is a test email</h1>');
            console.log('✅ sendEmail completed via SendGrid Web API');
        } else {
            console.log('⚠️  Skipping sendEmail test - SendGrid configuration issues:', sendGridConfig.issues);
        }

        res.json({
            message: 'Email functionality test completed',
            success: true,
            generateEmail: testEmailContent.substring(0, 100) + '...',
            generateUpdateEmail: testUpdateContent.substring(0, 100) + '...'
        });
    } catch (error) {
        console.error('❌ Email test failed:', error);
        res.status(500).json({
            message: 'Email test failed',
            error: error.message,
            success: false
        });
    }
});

// GET
router.get('/get/single/:leadId', getLead)
router.get('/get/phone/:phone', getLeadByPhone)
router.get('/get/employee', verifyToken, verifyEmployee, getEmployeeLeads)
router.get('/get/all', verifyToken, verifyManager, getLeads)
router.get('/get/all', verifyToken, getLeads)
router.get('/get/stats', verifyToken, verifyEmployee, getLeadsStat)
router.get('/search', verifyToken, searchLead)
router.get('/filter', verifyToken, filterLead)

// POST
router.post('/create', verifyToken, createLead)

// PUT
router.put('/archive', verifyToken, verifyEmployee, archiveLead)
router.put('/update/:leadId', verifyToken, verifyEmployee, updateLead)
router.put('/update/shift/:leadId', verifyToken, verifyEmployee, shiftLead)
router.put('/update/share/:leadId', verifyToken, verifyEmployee, shareLead)

// DELETE
router.delete('/delete/:leadId', verifyToken, verifySuperAdmin, verifyManager, deleteLead)
router.delete('/delete-whole-collection', deleteWholeCollection)

export default router