// bioSchema
import { Schema } from "mongoose";

const bioSchema = new Schema({
  skills: {
    type: String,
  },
  location: {
    type: String,
  },
  userDescription: {
    type: String,
  },
});

export default bioSchema;
