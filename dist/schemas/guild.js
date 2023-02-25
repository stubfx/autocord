import mongoose from "mongoose";
import { JOBGUILD } from "./schemas.js";
const Schema = new mongoose.Schema({
    _id: String,
    guildId: String,
    jobs: (Array)
});
export const JobGuildModel = mongoose.model(JOBGUILD, Schema);
//# sourceMappingURL=guild.js.map