import {Box, CircularProgress, Container, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Typography} from '@mui/material'
import {Add as AddIcon, Assignment, Title} from '@mui/icons-material'
import { useState } from 'react'
import TodoItem from '../Component/shared/TodoItem'
import {useAddNewTaskMutation, useGetMyTasksQuery} from '../redux/api/api'
import { useAsyncMutation } from '../Component/Hooks/hook'

// 242424
const Home=()=>{
  const [newTask,setNewTask]=useState("")
  const [selectedPriority, setSelectedPriority] = useState("all");
  
  const {data:MyTasksList,isLoading:MyTaskLoading}=useGetMyTasksQuery();

  console.log("da",MyTasksList)
  const [AddNewTask]=useAsyncMutation(useAddNewTaskMutation)

  const handleSubmit=(e)=>{
    e.preventDefault();
   
    console.log("osd",newTask);
  
   AddNewTask("Creating The Task",{title:newTask})
  }

  const updateTask=()=>{
    console.log("update")
  }

  const deleteTask=()=>{
    console.log("delete")
  }

  const priorityOrder = { high: 3, medium: 2, low: 1 };
  const filteredTasks = MyTasksList?.msg?.filter(task => 
    selectedPriority === "all" || task.priority === selectedPriority
  );
  
  // const sortedTasks = MyTasksList?.msg?.slice().sort(
  //   (a, b) => (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0)
  // );

  return(
  <Box display='flex' justifyContent={'center'}
     height="100vh" bgcolor="#242424" width={"100vw"}
     p={4} >
     {/* <h1 style={{color:"white"}}>kas</h1> */}
      <Container maxWidth="sm">
        <Paper  elevation={3} sx={{ p: 3, bgcolor: "#2d3748", color: "#e2e8f0", borderRadius: 2 }}>
        <Box display="flex" alignItems="center" mb={2}>
            <Assignment sx={{ fontSize: 32, color: "#4c51bf" }} />
            <Typography variant="h6" ml={2} fontWeight={600}>
              My Tasks
            </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} display="flex" alignItems="center" 
              border={1} borderColor="#4a5568" borderRadius={3} px={2}  mb={2}>
            <TextField
              variant="standard"
              fullWidth
              placeholder="Add a new task"
              InputProps={{ disableUnderline: true, style: { color: "#e2e8f0" } ,

            }}
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              required
            />
            <IconButton type="submit" color="primary">
              <AddIcon />
            </IconButton>
        </Box>

        <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ color: "#e2e8f0" }}>Filter by Priority</InputLabel>
            <Select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              sx={{ color: "#e2e8f0", '.MuiSvgIcon-root': { color: '#e2e8f0' } }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>

        <Box sx={{ maxHeight: { xs: 300, sm: 400 }, overflowY: "auto" }}>
            {/* {isLoading ? (
              <Box display="flex" justifyContent="center"><CircularProgress color="inherit" /></Box>
            ) : isError ? (
              <Typography textAlign="center" color="error">{error?.message || "Something went wrong"}</Typography>
            ) : ( */}
            { MyTaskLoading ?(
              <Box display="flex" justifyContent="center"><CircularProgress color="inherit" /></Box>
            ) : filteredTasks.length === 0 ?(
              <Box display="flex" justifyContent="center" mt={2}>
              <Typography variant="h6" color="textSecondary">
                No tasks available. Add a task to get started!
              </Typography>
            </Box>
            ):(
              filteredTasks.map((task)=>(
                <TodoItem key={task._id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
              ))
            )}

              {/* {
              tasksList.map((task) => (
                <TodoItem key={task.id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
              ))} */}


              {/* )) */}
            {/* )} */}
          </Box>
      

        </Paper>
      </Container>

  </Box>
    )
}

export default Home