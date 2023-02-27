import mongoose from "mongoose";
import { JOB, GUILD } from "./schemas.js";
const Schema = new mongoose.Schema({
    guildId: String,
    jobs: [{ type: mongoose.Types.ObjectId, ref: JOB }]
});
export const GuildModel = mongoose.model(GUILD, Schema);
//# sourceMappingURL=guildSchema.js.map