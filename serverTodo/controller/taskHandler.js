const {tryCatcher, ErrorHandler}=require('../utility/errorHandler.js')
const Task=require('../models/task.js');

const getMyTasks=tryCatcher(async(req,res,next)=>{
    const myTask=await Task.find({creator:req.usero});

    res.status(200).json({success:'true',msg:myTask});
})

const addNewTask=tryCatcher(async(req,res,next)=>{
    
    const {title}=req.body;
    console.log(req.body)
    const t=await Task.create({
        title,creator:req.usero
    })
    await t.save();

    res.status(201).json({success:true,msg:"Task Added Succesfully"})
})

const editTask=tryCatcher(async(req,res,next)=>{
    const {taskId,title,completed,priority}=req.body;

    const t=await Task.findById(taskId)
    if(!t){
        return next(new ErrorHandler("Invalid Task to Edit",404))
    }
    
    if(t.creator.toString() !==req.usero.toString()){
        return next(new ErrorHandler("You are Not Autherize to Edit",403))
    }
    t.title=title || t.title;
    t.completed=completed || t.completed;
    t.priority=priority.toLowerCase() || t.priority;

    t.save();
    res.status(200).json({ message: 'Task updated successfully',updated:t});
})

const deleteTask=tryCatcher(async(req,res,next)=>{
    console.log("delete")
    const {id}=req.body;
    console.log(id)
    const t=await Task.findById(id);
    if(!t){
        return next(new ErrorHandler("Invalid Task to Edit",404))
    }
    
    if(t.creator.toString() !==req.usero.toString()){
        return next(new ErrorHandler("You are Not Autherize to Edit",403))
    }

    await Task.findByIdAndDelete(id);

    res.status(200).json({msg:"Succesfully Deleted The Task",success:true})
})

const changeCompletion=tryCatcher(async(req,res,next)=>{
    const {id,completed}=req.body;
    console.log("change",req.body)
    const t=await Task.findById(id);

    if(!t){
        return next(new ErrorHandler("Invalid Task to Edit",404))
    }
    
    if(t.creator.toString() !==req.usero.toString()){
        return next(new ErrorHandler("You are Not Autherize to Edit",403))
    }
    t.completed=completed
    await t.save()
    const c=completed?"Completed":"InComplete";
    res.status(200).json({success:true,msg:`Marked as ${c}`})
})

module.exports={addNewTask,editTask,getMyTasks,deleteTask,changeCompletion}