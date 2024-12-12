import React from 'react';
import './TaskList.css';

const TaskList = ({ tasks, toggleCompletion, startStopTimer, formatTime }) => {
  return (
    <div className="taskList">
      {tasks.map((task) => (
        <div key={task.id} className="taskItem">
          {/* Task Description */}
          <div className="taskName">
            <span className={task.completed ? 'completedTask' : ''}>
              {task.name}
            </span>
          </div>

          {/* Horizontal Line */}
          <hr />

          {/* Task Controls: Timer, Start/Pause Button, and Checkbox */}
          <div className="taskControls">
            <div className="timerControls">
              <span>Time: {formatTime(task.time)}</span>
              <button onClick={() => startStopTimer(task.id)}>
                {task.isRunning ? 'Pause' : 'Start'}
              </button>
            </div>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompletion(task.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
