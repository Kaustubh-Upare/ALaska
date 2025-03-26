const express=require('express');
const { getMyTasks, addNewTask, editTask, deleteTask, changeCompletion } = require('../controller/taskHandler');
const { userAuth } = require('../middleware/Auth');
const route=express.Router();


route.use(userAuth);
route.get('/my',getMyTasks);

route.post('/new',addNewTask);

route.put('/update',editTask);

route.delete('/delete',deleteTask)

route.put('/changeCompletion',changeCompletion)

module.exports=route