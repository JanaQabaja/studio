import { Router } from "express";
import * as locationsController from "./location.controller.js";
import fileUpload, { fileValidation } from "../../services/multer.js";
import { auth, roles } from "../../middleware/auth.js";
import { endPoint } from "./location.endpoint.js";
import { asyncHandler } from "../../services/errorHandling.js";
import * as validators from "./location.validation.js";
import { validation } from "../../middleware/validation.js";
const router = Router();
router.get("/",asyncHandler(locationsController.getlocations));
router.get("/Available", asyncHandler(locationsController.getAvailableLocations));
router.post("/",auth(endPoint.create), fileUpload(fileValidation.image).single("image"),
  asyncHandler(locationsController.insertLocation));
router.put("/:id",auth(endPoint.update), fileUpload(fileValidation.image).single("image"),
asyncHandler(locationsController.updateLocation));
router.delete( "/:locationId",auth(endPoint.delete),asyncHandler(locationsController.deleteLocation));

export default router;
