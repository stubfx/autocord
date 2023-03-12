import mongoose from "mongoose";
import { GUILD, JOB, STORAGE } from "./schemas.js";
const Schema = new mongoose.Schema({
    guildId: String,
    jobs: [{ type: mongoose.Types.ObjectId, ref: JOB }],
    // @ts-ignore
    storage: { type: mongoose.Types.ObjectId, ref: STORAGE }
});
export const GuildModel = mongoose.model(GUILD, Schema);
//# sourceMappingURL=guildSchema.js.map