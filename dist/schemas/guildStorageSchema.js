import mongoose from "mongoose";
import { STORAGE } from "./schemas.js";
const Schema = new mongoose.Schema({
    data: Object
});
export const GuildStorage = mongoose.model(STORAGE, Schema);
//# sourceMappingURL=guildStorageSchema.js.map