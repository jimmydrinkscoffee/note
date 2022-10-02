import { Router } from "express";
import Joi from "joi";

import { failedResponse, successResponse } from "../helpers/response";
import validateRequest from "../middlewares/validateRequest";
import NoteModel from "../models/NoteModel";

const noteRoute = Router();

noteRoute.put(
  "/",
  validateRequest({
    owner: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
  }),
  async (req, res) => {
    try {
      const noteModel = new NoteModel(req.body);
      const note = await noteModel.save();

      return res.json(successResponse({ note }));
    } catch (err: any) {
      return res.status(500).json(failedResponse(err["message"]));
    }
  }
);

noteRoute.get("/:id", async (req, res) => {
  try {
    const note = await NoteModel.findOne({ _id: req.params.id });

    return res.json(successResponse({ note }));
  } catch (err: any) {
    return res.status(500).json(failedResponse(err["message"]));
  }
});

noteRoute.post(
  "/:id",
  validateRequest({
    title: Joi.string(),
    content: Joi.string(),
  }),
  async (req, res) => {
    try {
      const note = await NoteModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { returnDocument: "after" }
      );

      return res.json(successResponse({ note }));
    } catch (err: any) {
      return res.status(500).json(failedResponse(err["message"]));
    }
  }
);

noteRoute.delete("/:id", async (req, res) => {
  try {
    const note = await NoteModel.findByIdAndDelete(req.params.id);

    return res.json(successResponse({ note }));
  } catch (err: any) {
    return res.status(500).json(failedResponse(err["message"]));
  }
});

export default noteRoute;
