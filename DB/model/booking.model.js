import mongoose, { Schema, model, Types } from "mongoose";
const bookingSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    locations: [
      {
        locationId: { type: Types.ObjectId, ref: "Location", required: true },
        ThemeDescription:{type:String , required:true},
        appointment:{ day: { type: String, required: true },
        date: { type:Date, required: true },
        hour: { type:String, required: true },}
      },
    ],
    photographers: [
      {
        photographerId: { type: Types.ObjectId, ref: "Photographer", required: true },
        appointment:{ day: { type: String, required: true },
        date: { type:Date, required: true },
        hour: { type:String, required: true },}
      },
    ],
    finalPrice: {
      type: Number,
      required: true,
    },
    phoneNumber: { type: String, required: true },
    couponName: {
      type: String
    },
    paymentType: {
      type: String,
      default: "cash",
      enum: ["cart", "cash"],
    },
    status: {
      type: String,
      default: "confirmed",
      enum: ["cancelled", "confirmed"],
    },
  
    note: String,
    updatedBy: { type: Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const bookingModel = mongoose.models.Booking || model("Booking", bookingSchema);
export default bookingModel;
