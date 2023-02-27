import mongoose from "mongoose";
import { JOB } from "./schemas.js";
const Schema = new mongoose.Schema({
    name: String,
    chain: {
        chainLinks: (Array)
    }
});
// Duplicate the ID field.
Schema.virtual('id').get(function () {
    return this._id.toHexString();
});
// Ensure virtual fields are serialised.
Schema.set('toJSON', {
    virtuals: true
});
export const JobModel = mongoose.model(JOB, Schema);
//# sourceMappingURL=jobSchema.js.map