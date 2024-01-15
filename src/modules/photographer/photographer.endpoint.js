import { roles } from "../../middleware/auth.js";

export const endPoint = {
 insert: [roles.Admin],
  get: [roles.Admin],
  delete: [roles.Admin],
};
