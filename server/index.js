import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import metaleads from './routes/metaleads.js'
import uploadRoutes from './routes/upload.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import notificationRoutes from './routes/notification.js'
import saleRoutes from './routes/sale.js'
import taskRoutes from './routes/task.js'
import eventRoutes from './routes/event.js'
import approvalRoutes from './routes/approval.js'
import leadRoutes from './routes/lead.js'
import followUpRoutes from './routes/followUp.js'
import cashbookRoutes from './routes/cashbook.js'
import refundRoutes from './routes/refund.js'
import voucherRoutes from './routes/voucher.js'
import deductionRoutes from './routes/deduction.js'
import transcriptRoutes from './routes/transcript.js'
import projectRoutes from './routes/project.js'
import societyRoutes from './routes/society.js'
import inventoryRoutes from './routes/inventory.js'
import fbleadroutes from './routes/fbleadroute.js'
import { validateSendGridConfig } from './utils/sendEmail.js'

dotenv.config()

// Debug environment variables
console.log('🔧 Server startup - Environment variables check:');
const sendGridConfig = validateSendGridConfig();
console.log('SendGrid configuration:', sendGridConfig);
console.log('GITHUB_TOKEN exists:', !!process.env.GITHUB_TOKEN);
console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
console.log('PORT:', process.env.PORT || 4000);

const app = express()
const CONNECTION_URL = "mongodb+srv://rana_talha16:the.edgyguy23@cluster0.rykde1s.mongodb.net/"
// const CONNECTION_URL = process.env.COMPASS_URL

const PORT = process.env.PORT || 4000
app.use(cors())
app.use(express.json())

// Request logging middleware
app.use((req, res, next) => {
    console.log('🌐 Incoming request:', {
        method: req.method,
        url: req.url,
        body: req.body,
        headers: {
            'content-type': req.headers['content-type'],
            'authtoken': req.headers.authtoken ? 'present' : 'missing'
        }
    });
    next();
});

// serving static files | images
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/uploads', express.static(join(__dirname, 'uploads')));

app.use('/api/v1', uploadRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/notification', notificationRoutes)
app.use('/api/v1/task', taskRoutes)
app.use('/api/v1/event', eventRoutes)
app.use('/api/v1/approval', approvalRoutes)
app.use('/api/v1/sale', saleRoutes)
app.use('/api/v1/lead', leadRoutes)
app.use('/api/v1/project', projectRoutes)
app.use('/api/v1/society', societyRoutes)
app.use('/api/v1/inventory', inventoryRoutes)
app.use('/api/v1/followUp', followUpRoutes)
app.use('/api/v1/cashbook', cashbookRoutes)
app.use('/api/v1/refund', refundRoutes)
app.use('/api/v1/voucher', voucherRoutes)
app.use('/api/v1/deduction', deductionRoutes)
app.use('/api/v1/trasncript', transcriptRoutes)
app.use("/api/leadssa", metaleads);
app.use("/", fbleadroutes);
app.use((err, req, res, next) => {
    const message = err.message || 'Something went wrong.'
    const status = err.status || 500
    res.status(status).json({ message, status, stack: err.stack })
    next()
})

// app.get('/webhook', (req, res) => {
//     const VERIFY_TOKEN = process.env.FB_VERIFY_TOKEN;

//     // Facebook verification parameters
//     const mode = req.query['hub.mode'];
//     const token = req.query['hub.verify_token'];
//     const challenge = req.query['hub.challenge'];

//     // Check if mode & token match
//     if (mode === 'subscribe' && token === VERIFY_TOKEN) {
//       console.log('Webhook verified successfully!');
//       res.status(200).send(challenge); // Facebook expects this response
//     } else {
//       console.error('Webhook verification failed!');
//       res.sendStatus(403); // Forbidden
//     }
//   });

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(' MONGODB IS connected and listening at port ' + PORT)))
    .catch((err) => console.log('error in connection with mongoDB = \n', err))