import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

export default mongoose.model("NoteModel", noteSchema);
