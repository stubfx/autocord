import mongoose from "mongoose";
import { APPDATA } from "./schemas.js";
const Schema = new mongoose.Schema({
    eventCount: Number
});
export const AppDataModel = mongoose.model(APPDATA, Schema);
//# sourceMappingURL=appDataSchema.js.map