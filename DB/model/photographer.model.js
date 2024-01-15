import mongoose, { Schema, model } from "mongoose";
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
  },
  {
    timestamps: true,
  }
);

const photographerModel = mongoose.models.Photographer || model("Photographer", photographerShema);
export default photographerModel;
