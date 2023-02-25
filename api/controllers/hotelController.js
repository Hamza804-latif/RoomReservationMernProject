import HotelModel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createHotel = async (req, resp, next) => {
  const newHotel = new HotelModel(req.body);
  try {
    const savedHotel = await newHotel.save();
    return resp.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, resp, next) => {
  try {
    const updatedHotel = await HotelModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return resp.status(200).json(updatedHotel);
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req, resp, next) => {
  try {
    await HotelModel.findByIdAndDelete(req.params.id);
    return resp.status(200).json({ msg: "Hotel Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};
export const getHotel = async (req, resp, next) => {
  try {
    let Hotel = await HotelModel.findById(req.params.id);
    return resp.status(200).json(Hotel);
  } catch (error) {
    next(error);
  }
};
export const getAllHotels = async (req, resp, next) => {
  try {
    let Hotels = await HotelModel.find();
    return resp.status(200).json(Hotels);
  } catch (error) {
    next(error);
  }
};
