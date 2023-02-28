import mongoose from "mongoose";
import { STORAGE } from "./schemas.js";
const Schema = new mongoose.Schema({
    data: Object
});
// Duplicate the ID field.
Schema.virtual('id').get(function () {
    return this._id.toHexString();
});
// Ensure virtual fields are serialised.
Schema.set('toJSON', {
    virtuals: true
});
export const GuildStorage = mongoose.model(STORAGE, Schema);
//# sourceMappingURL=guildStorageSchema.js.map