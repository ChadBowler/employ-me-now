//application model
import { Schema, model } from 'mongoose';

const applicationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  resume: {
    type: String,
    trim: true,
  },
  dateApplied: {
    type: Date,
    default: Date.now,
  },
  accepted: {
    type: Boolean,
  }
});

const Application = model('Application', applicationSchema);

export default Application;
