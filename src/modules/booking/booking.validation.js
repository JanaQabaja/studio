import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const createBooking = joi.object({
  date: joi.date().greater("now").required(),
  
});
