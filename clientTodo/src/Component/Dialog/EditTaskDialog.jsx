import { Button, DialogActions, Select, InputLabel, FormControl, TextField,
     DialogContent, DialogTitle, Dialog, 
     MenuItem,
     Fade,
     Typography} from "@mui/material"
import { useState } from "react"
import { useAsyncMutation } from "../Hooks/hook";
import { useChangeCompletionMutation, useUpdateTaskMutation } from "../../redux/api/api";

const EditTaskDialog=({open,handleClose,editID})=>{

    const [taskTitle,setTaskTitle]=useState("");
    const [priority,setPriority]=useState('Medium')
    const [updateTask,updateTaskLoading]=useAsyncMutation(useUpdateTaskMutation)

    const handleSave=()=>{
        console.log("Save");
        updateTask("Updating The Task...",{taskId:editID,title:taskTitle,priority})
        handleClose()
    }

    return(

    <Dialog
    open={open}
    onClose={handleClose}
    TransitionComponent={Fade} // Smooth transition
    transitionDuration={400} // Duration in ms
    fullWidth // Makes it responsive
    maxWidth="sm"

    PaperProps={{
        sx: {
        backgroundColor: "#282A2C", // Dark background
        color: "#ffffff", // White text
        borderRadius: 2, // Rounded corners
        padding: 2,
        width: "500px", // Increase width for larger screens
         maxWidth: "90%", // Ensure it doesn’t exceed 90% of the screen width
        "@media (max-width: 600px)": {
        width: "100%", // On small screens, make it full width
        maxWidth: "100%",
      },
        },
    }}
>
  <DialogTitle sx={{ color: "#fff", fontWeight: "bold" }}>Edit Task</DialogTitle>
  <DialogContent>
    {/* Task Title */}
    <Typography sx={{ color: "#aaa", mb: 0.5 }}>Task Title</Typography>
    <TextField
      fullWidth
      margin="dense"
      value={taskTitle}
      onChange={(e) => setTaskTitle(e.target.value)}
      InputProps={{
        style: { color: "#fff" }, // White text input
        sx: {
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgb(177, 172, 172)" }, // Default border
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" }, // White on hover
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" }, // White on focus
        },
      }}
    />

    {/* Priority Selection */}
    <Typography sx={{ color: "#aaa", mt: 2, mb: 0.5 }}>Priority</Typography>
    <FormControl fullWidth margin="dense">
      <Select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        sx={{
          color: "#fff",
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" }, // Default border
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" }, // Hover
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" }, // Focus
        }}
      >
        <MenuItem value="low">Low</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="high">High</MenuItem>
      </Select>
    </FormControl>
  </DialogContent>

  <DialogActions>
    <Button onClick={handleClose} color="error" sx={{ color: "#ff4d4d" }} disabled={updateTaskLoading}>
      Cancel
    </Button>
    <Button
      onClick={handleSave}
      color="primary"
      variant="contained"
      sx={{ backgroundColor: "#1db954", "&:hover": { backgroundColor: "#17a745" } }}
      disabled={updateTaskLoading}
    >
      Update Task
    </Button>
  </DialogActions>
</Dialog>

    )
}

export default EditTaskDialog