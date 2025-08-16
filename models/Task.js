import mongoose from "mongoose";

const tasksSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    description:String,
    status:{
        type:String,
        enum: ['pending','in-progress', 'completed'],
        default:'pending'
    },
    priority: {
        type:String,
        enum: ['low','medium','high'],
        default:'medium'
    },
    dueDate: Date,
}, { timestamps:true });

export default mongoose.model('Task',tasksSchema);