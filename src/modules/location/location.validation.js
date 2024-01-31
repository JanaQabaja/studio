import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const appointments = joi.object({
  // date: joi.string().isoDate().greater('now').required(),

});

// export const appointments = joi.object({
//   date: joi.date().greater('now').required(),

// });
// export const appointments =  joi.array().items(joi.object({
//   date: joi.date()
//     .greater('now')
//     .required()
//     .custom((value, helpers) => {
//       if (new Date(value) > new Date()) {
//         return value;
//       } else {
//         return helpers.message('Date must be greater than the current date');
//       }

// })
// }
// )

// )

// export const appointments = joi.array().items(
//   joi.object({
//     day: joi.string().required(),
//     date: joi.string().isoDate().greater('now').required(),
//     hour: joi.string().required(),
//   })
// ).required();

