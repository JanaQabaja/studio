import locationModel from "../../../DB/model/location.model.js";
import cloudinary from "../../services/cloudinary.js";


export const getlocations = async (req,res,next) => {
  const locations = await locationModel.find();
  return res.status(200).json({ message: "success", locations});
};
export const getAvailableLocations = async (req,res,next) => {
  const locations = await locationModel.find({status:"Available"});
  return res.status(200).json({ message: "success", locations});
};

export const insertLocation = async (req, res, next) => {
  const {placeName,price} = req.body;
  if (await locationModel.findOne({ placeName })) {
    return next(new Error(`place name already exists`, { cause: 409 }));
  }
  const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APP_NAME}/locations`,});
  const location = await locationModel.create({
    placeName,
    price,
    image: { secure_url, public_id },
   
  });
  return res.status(201).json({ message: "success",location });
};


export const updateLocation = async (req,res,next) => {
  const location = await locationModel.findById(req.params.id);
  if (!location) {
    return next( new Error(`invalid category id ${req.params.id}`, { status: 404 }));}
  if ( await locationModel.findOne({ placeName: req.body.placeName, _id: { $ne: location._id } }).select("placeName")) {
    return next( new Error(`location ${req.body.placeName} already exists`, { status: 409 }));
  }
  location.placeName = req.body.placeName;
  location.status = req.body.status;
  if (req.file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APP_NAME}/locations`,} );
    await cloudinary.uploader.destroy(location.image.public_id);
    location.image = { secure_url, public_id };
  }
  await location.save();
  return res.status(200).json({ message: "success" });
};


export const deleteLocation = async (req,res,next) => {
  const { locationId } = req.params;
  const location = await locationModel.findByIdAndDelete(locationId);
  if (!location) {
    return next(new Error(`location not found`, { cause: 404 }));
  }
  return res.status(200).json({ message: "success" });
};