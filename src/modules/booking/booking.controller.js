import couponModel from "../../../DB/model/coupon.model.js";
import bookingModel from "../../../DB/model/booking.model.js";
import userModel from "../../../DB/model/user.model.js";
import locationModel from "../../../DB/model/location.model.js";
import photographerModel from "../../../DB/model/photographer.model.js";

export const booking = async (req, res, next) => {
  //coupon
  const { couponName } = req.body;
  if (couponName) {
    const coupon = await couponModel.findOne({ name: couponName });
    if (!coupon) {
      return next(new Error(`coupon not found`, { cause: 404 }));
    }
    const currentDate = new Date();
    if (coupon.expireDate <= currentDate) {
      return next(new Error(`this coupon has expired`, { cause: 400 }));
    }
    if (coupon.usedBy.includes(req.user._id)) {
      return next(new Error(`coupon already used`, { cause: 409 }));
    }
    req.body.coupon = coupon;
  }
  //price and appointment

  let TotalPrice = 0;
  for (let location of req.body.locations) {
    const checkLocation = await locationModel.findOne({_id:location.locationId});
    if (!checkLocation) {
      return next(new Error(`Location ${location.locationId} doesn't exist`));
    }
    if(!(checkLocation.appointments.includes(location.appointment))){
return next(new Error(`This Location ${location.locationId} appointment is not available`));
    }else{
      const appointmentIndex = checkLocation.appointments.indexOf(location.appointment);
          // The appointment exists, remove it
          checkLocation.appointments.splice(appointmentIndex, 1);
          await checkLocation.save(); // Save the updated document
      }
TotalPrice=TotalPrice+checkLocation.price;
  }
  for (let photographer of req.body.photographers) {
    const checkphotographer = await photographerModel.findOne({_id:photographer.photographerId});
    if (!checkphotographer) {
      return next(new Error(`photographer ${photographer.photographerId} doesn't exist`));
    }
    if(!(checkphotographer.appointments.includes(photographer.appointment))){
return next(new Error(`this photographer ${photographer.photographerId} appointment is not available`));
    }else{
      const appointmentIndex = checkphotographer.appointments.indexOf(photographer.appointment);
          // The appointment exists, remove it
          checkphotographer.appointments.splice(appointmentIndex, 1);
          await checkphotographer.save(); // Save the updated document
      }
      TotalPrice=TotalPrice+checkphotographer.price;
    }
    const user = await userModel.findById(req.user._id);
    if (!req.body.phoneNumber) {
      req.body.phoneNumber = user.phone;
    }
    const booking1 = await bookingModel.create({
      userId: req.user._id,
      locations: req.body.locations,
      photographers: req.body.photographers,
      finalPrice: TotalPrice,
      phoneNumber: req.body.phoneNumber,
      couponName: req.body.couponName ?? "",
      paymentType:req.body.paymentType?? "",

    });
    if (req.body.coupon) {
      await couponModel.updateOne(
        { _id: req.body.coupon._id },
        { $addToSet: { usedBy: req.user._id } }
      );
    }
    return res.status(201).json({message:"success", booking1})
  
  
 
  
  }

// const appointmentIndex = checkphotographer.appointments.indexOf(photographer.appointment);
// if (appointmentIndex === -1) {
//     // The appointment doesn't exist
//     return next(new Error(`This photographer ${photographer.photographerId} appointment is not available`));
// } else {
//     // The appointment exists, remove it
//     checkphotographer.appointments.splice(appointmentIndex, 1);
//     await checkphotographer.save(); // Save the updated document
// }
//لحذف الموعد
  

export const cancelReservation = async (req, res, next) => {
  const { bookingId } = req.params;
  const reservation = await bookingModel.findOne({
    _id: bookingId,
    userId: req.user._id,
  });
  if (!reservation) {
    return next(new Error(`invalid reservation `, { cause: 404 }));
  }
 
  req.body.status = "cancelled";
  req.body.updatedBy = req.user._id;
  const newbook = await bookingModel.findByIdAndUpdate(bookingId, req.body, {
    new: true,
  });
 
  if (order.couponName) {
    await couponModel.updateOne(
      { name: order.couponName },
      { $pull: { usedBy: req.user._id } }
    );
    }
    //return the res appointment
   const location = await locationModel.find();
  for (let loc of locationModel.locations) {
    if(!(location.appointments.includes(loc.appointment))){
    location.appointments.push(loc.appointment);
    }
  }
  await location.save();
  const photographer = await photographerModel.find();
  for (let phot of reservation.photographers) {
    if(!(photographer.appointments.includes(phot.appointment))){
    photographer.appointments.push(phot.appointment);
    }
  }
  await photographer.save();
  //
  return res.json({ message: "success", reservation: newbook });
};



export const getReservations = async (req, res, next) => {
  const resv = await bookingModel.find({ userId: req.user._id });
  return res.status(200).json({ message: "success", resv });
};


