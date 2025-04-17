import { Schema, model } from 'mongoose';
import { generateUniqueIdentifier } from '../utils/utils.js';

const leadSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    city: { type: String, required: false },
    jobTitle: { type: String, required: false },
    source: { type: String, default: 'facebook' },
    uid: { type: String },
  },
  { timestamps: true }
);

// Generate unique UID before saving
leadSchema.pre('save', async function (next) {
  if (!this.uid) {
    let isUnique = false;
    let generatedIdentifier;
    while (!isUnique) {
      generatedIdentifier = generateUniqueIdentifier();
      const existingDocument = await this.constructor.findOne({ uid: generatedIdentifier });
      if (!existingDocument) isUnique = true;
    }
    this.uid = generatedIdentifier;
  }
  next();
});

const Lead = model('FBLead', leadSchema);
export default Lead;
