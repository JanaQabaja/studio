import { roles } from "../../middleware/auth.js";

export const endPoint = {
 insert: [roles.Admin],
  delete: [roles.Admin],
  appointment:[roles.Admin],
};
