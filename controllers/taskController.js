import Task from "../models/Task.js"
// create task
export const createTask = async (req,res) => {
    try {
        const task = await Task.create({...req.body, user:req.user._id});
        res.status(201).json({
            success:true,
            message:"Task Created Successfully",
            data: task
        });
    } catch (error) {
        res.status(500).json({ message:'Error Creating Task', error});
    }
};

// get user's tasks
export const getTasks = async (req,res) => {
    try {
        const tasks = await Task.find({ user: req.user._id});
        res.json({
            success:true,
            message:"Tasks Fetched Successfully",
            data:tasks
        });
    } catch (error) {
        res.status(500).json({ message:'Error Fetching Tasks'});
    }
};

// get task
export const getTask = async (req,res) => {
    try {
        const task = await Task.findOne({
            _id:req.params.id,
            user:req.user._id
        });
        
        if(!task)
            return res.status(404).json({message:'Task Not Found'});
        res.json({
            success: true,
            message:"Task Fetched Successfully",
            data:task
        });
    } catch (error) {
        res.status(500).json({ message:'Error Fetching Task' });
    } 
};

// Update Task 
export const updateTask = async (req,res) => {
    try {
        const task = await Task.findOneAndUpdate({
            _id:req.params.id, user:req.user._id
        },req.body, {new:true});
        if(!task) return res.status(404).json({ message:'Task not found'});
        res.json({
            success:true,
            message: "Task Updated Successfully",
            data:task
        });
    } catch (error) {
        res.status(500).json({ message:'Error Updating Task' });
    }
};

// Delete Task
export const deleteTask = async (req,res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id, user: req.user._id
        });
        if(!task) return res.status(404).json({ message:'Task Not Found' });
        res.json({ message:'Task Deleted Successfully' });
    } catch (error) {
        res.status(500).json({ message:'Error Deleting Task' });
    }
};

