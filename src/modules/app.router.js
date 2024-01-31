import connectDB from "../../DB/connection.js";
import authRouter from "./auth/auth.router.js";
import photographerRouter from "./photographer/photographer.router.js";
import locationRouter from "./location/location.router.js";
import bookingRouter from "./booking/booking.router.js";
import couponRouter from "./coupon/coupon.router.js";
import { globalErrorHandler } from "../services/errorHandling.js";
const initApp = async (app, express) => {
  connectDB();
  app.use(express.json());
  app.use('/auth',authRouter);
  app.use('/photographer',photographerRouter);
  app.use('/location',locationRouter);
  app.use('/booking',bookingRouter);
  app.use('/coupon',couponRouter);
  app.get("/", (req, res) => {
    return res.status(200).json({ message: "welcome" });
  });
  app.get("*", (req, res) => {
    return res.status(500).json({ messsage: "page not found" });
  });
  app.use(globalErrorHandler);
};
export default initApp;
