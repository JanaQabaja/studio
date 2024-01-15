import mongoose, { Schema, model, Types } from "mongoose";
const locationSchema = new Schema(
  {
    placeName: {
      type: String,
     required: true,
      unique: true,
    },
    image: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: "Available",
      enum: ["Available", "Unavailable"],
    },
    price: {
      type: Number,
      required: true,
    },
    // slug: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true },
  }
);
// locationSchema.virtual("subcategory", {
//   localField: "_id",
//   foreignField: "categoryId",
//   ref: "Subcategory",
// });

const locationModel = mongoose.models.Location || model("Location", locationSchema);
export default locationModel;
