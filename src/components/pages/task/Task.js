import './Tasks.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; 
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useEffect, useRef, useState } from 'react';

const Task = ({
  taskClickedHandler,
  task,
  fillTaskFormHandler,
  getStatusColor,
  filteredTasks,
  tasksState,
  setTasksState,
}) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const fileInputRef = useRef(null);

  const toggleProblem = (task, event) => {
    const index = filteredTasks.findIndex(
      (curr) => curr.task_id === task.task_id
    );
    const updatedTasks = [...tasksState];
    updatedTasks[index] = {
      ...updatedTasks[index],
      isProblemOpen: !updatedTasks[index].isProblemOpen,
    };
    setTasksState(updatedTasks);
    event.stopPropagation();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const problemRef = useRef(null);
  const [isProblemOverflowing, setIsProblemOverflowing] = useState(false);

  const checkOverflow = () => {
    if (problemRef.current) {
      const isOverflowing =
        problemRef.current.scrollHeight > problemRef.current.offsetHeight;
      setIsProblemOverflowing(isOverflowing);
    }
  };

  useEffect(() => {
    checkOverflow();

    window.addEventListener('resize', checkOverflow);

    return () => {
      window.removeEventListener('resize', checkOverflow);
    };
  }, [task.problem]);

  return (
    <>
      <li className="taskItem" onClick={taskClickedHandler.bind(this, task)}>
        <div className="taskCard">
          <div className="taskContent">
            <div className="product">
              <p className="taskTitle">Product:</p>
              <div className="taskProductDetails">
                <h3>{task.product_type}</h3>
                <p className="tasksSerialNumber">
                  {task.product_serial_number}
                </p>
              </div>
            </div>
            <div className="problem">
              <p className="taskTitle">Problem:</p>
              <div className="taskProblem">
                <div
                  className={`taskProblemContent ${
                    task.isProblemOpen ? 'open' : ''
                  }`}
                  ref={problemRef}
                >
                  {task.problem}
                </div>
                {isProblemOverflowing && (
                  <div
                    className="problemExpandArrow"
                    onClick={toggleProblem.bind(this, task)}
                  >
                    <KeyboardArrowDownIcon />
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="imageUpload">
            <p className="taskTitle">Upload Image:</p>
            
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              style={{ display: 'none' }} 
            />
            <div className="uploadIcon" onClick={triggerFileInput}>
              <div className="customIcon">
                <CloudUploadIcon style={{ fontSize: '40px', color: '#fff' }} />
              </div>
            </div>
            {uploadedImage && (
              <div className="imagePreview">
                <p>Preview:</p>
                <img
                  src={uploadedImage}
                  alt="Uploaded Preview"
                  style={{ width: '100px', height: '100px' }}
                />
              </div>
            )}
          </div>
          <div className="lastUpdated">
            <p className="taskTitle">Last Updated:</p>
            <p>{task.date_updated}</p>
          </div>
          <div className="status">
            <div
              className="fillTaskForm"
              onClick={fillTaskFormHandler.bind(this, task)}
            >
              <AssignmentIcon />
            </div>
            <div
              className="statusBall"
              style={{
                backgroundColor: getStatusColor(task.status),
              }}
              title={task.status}
            ></div>
          </div>

        </div>
      </li>
    </>
  );
};

export default Task;
