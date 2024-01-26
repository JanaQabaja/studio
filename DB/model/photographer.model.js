import mongoose, { Schema, model } from "mongoose";
import Joi from 'joi';

const photographerShema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 4,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
    phone: {
      type: String,
    },
    status: {
      type: String,
      default: "Available",
      enum: ["Available", "Unavailable"],
    },
    appointments: [
      {
        day: { type:String, required: true },
        date: { type:Date, required: true },
        hour: { type:String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const photographerModel = mongoose.models.Photographer || model("Photographer", photographerShema);
export default photographerModel;
