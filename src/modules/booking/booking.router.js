import { Router } from "express";
import * as bookingController from "./booking.controller.js";
import { endPoint } from "./booking.endPoints.js";
import { auth } from "../../middleware/auth.js";
import { asyncHandler } from "../../services/errorHandling.js";
import { validation } from "../../middleware/validation.js";
import * as validators from './booking.validation.js'
const router = Router();

router.post("/booking",auth(endPoint.create),asyncHandler(bookingController.booking));
router.patch('/cancel/:bookingId',auth(endPoint.cancel),asyncHandler(bookingController.cancelReservation));
router.get('/',asyncHandler(bookingController.getReservation));
//router.patch('/changeStatus/:orderId',auth(endPoint.change),asyncHandler(orderController.changeStatus));
export default router;
