import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const insertLocation = joi.object({
  placeName: joi.string().min(3).max(25).required(),
  file: generalFields.file.required(),
  //file:joi.array().items(generalFields.file.required()).required
});
