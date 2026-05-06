import mongoose, { Schema, Document, models } from "mongoose";

export interface IUserProgress extends Document {
    userId: string;
    completedNodes: string[];
    unlockedDomains: string[];
}

const UserProgressSchema = new Schema<IUserProgress>(
    {
        userId: { type: String, required: true, unique: true },
        completedNodes: [{ type: String }],
        unlockedDomains: [{ type: String }],
    },
    { timestamps: true }
);

export default models.UserProgress || mongoose.model<IUserProgress>("UserProgress", UserProgressSchema);
