
import photographerModel from "../../../DB/model/photographer.model.js";
import cloudinary from "../../services/cloudinary.js";

export const insertPhotographer = async (req, res, next) => {

  const {name, email, phone ,price} = req.body;
  const user = await photographerModel.findOne({ email });
  if (user) {
    return next(new Error("email already exists", { cause: 409 }));
  }

  const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path,{folder: `${process.env.APP_NAME}/Photographers`,});
  const createPhotographer = await photographerModel.create({name,email,phone,price, image: { secure_url, public_id }, appointments:JSON.parse(req.body.appointments) });
  return res.status(201).json({ message: "success", createPhotographer });

};

export const getPhotographers = async (req,res,next) => {
  
  const Photographers = await photographerModel.find();
  return res.status(200).json({ message: "success", Photographers});
};

export const deletePhotographer = async (req,res,next) => {
  const { id } = req.params;
  const photographer = await photographerModel.findByIdAndDelete(id);
  if (!photographer) {
    return next(new Error(`photographer not found`, { cause: 404 }));
  }
  return res.status(200).json({ message: "success" });
};

export const addAppointments = async(req,res,next)=>{
  const photographer = await photographerModel.findById(req.params.id);
  if (!photographer) {
    return next( new Error(`invalid photographer id ${req.params.id}`, { status: 404 }));}

  for (let appointment of req.body.appointments) {
  photographer.appointments.push(appointment);
  }
  await photographer.save();
  return res.status(200).json({ message: "success" });
}

