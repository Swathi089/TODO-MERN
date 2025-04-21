import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EditTask = ({ task, editTask, setEditTask }) => {
  const [open, setOpen] = useState(false);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEdit = (e) => {
    e.preventDefault();
    editTask(task.id, newDescription);
   
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}><EditIcon /></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Task
          </Typography>
          <form onSubmit={handleEdit} className="w-full max-w-lg mx-auto mt-4">
            <div className="flex items-center relative w-full">
              <input
                type="text"
                placeholder="Edit Task..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full py-3 pl-3 pr-3 text-base border border-gray-300 rounded-full outline-none 
                           transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="mt-4 text-right">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default EditTask;
