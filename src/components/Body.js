import React, { Component } from 'react';
import './Body.css';
import TaskList from './Tasklist'; // Import the TaskList component

export class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      tasks: [],
      dateTime: new Date(), // Track current date and time
      totalTime: 0, // Track total time for the day in seconds
      taskStartDate: new Date().toLocaleDateString(), // Track the current day
    };
    this.intervals = {}; // Track intervals for each task using a separate object
  }

  componentDidMount() {
    // Update date and time every second
    this.dateTimeInterval = setInterval(() => {
      this.setState({ dateTime: new Date() });
    }, 1000);

    // Reset total time every day
    this.dailyResetInterval = setInterval(() => {
      const today = new Date().toLocaleDateString();
      if (today !== this.state.taskStartDate) {
        this.setState({ totalTime: 0, taskStartDate: today });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.dateTimeInterval);
    clearInterval(this.dailyResetInterval);
  }

  handleTaskChange = (e) => {
    this.setState({ task: e.target.value });
  };

  addTask = () => {
    if (this.state.task.trim()) {
      const newTask = {
        id: Date.now(),
        name: this.state.task,
        completed: false,
        time: 0, // Store time in seconds
        isRunning: false,
      };
      this.setState((prevState) => ({
        tasks: [...prevState.tasks, newTask],
        task: '', // Clear textarea after adding task
      }));
    }
  };

  toggleCompletion = (taskId) => {
    // Clear the timer when task is completed
    clearInterval(this.intervals[taskId]);
    delete this.intervals[taskId]; // Remove interval reference
    // Remove task from list upon completion
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== taskId),
    }));
  };

  startStopTimer = (taskId) => {
    const { tasks } = this.state;
    const task = tasks.find((task) => task.id === taskId);

    if (task.isRunning) {
      // Stop the timer
      clearInterval(this.intervals[taskId]); // Clear interval using intervalId
      this.intervals[taskId] = null; // Ensure the intervalId is null
      this.setState((prevState) => ({
        tasks: prevState.tasks.map((t) =>
          t.id === taskId ? { ...t, isRunning: false } : t
        ),
      }));
    } else {
      // Start the timer
      this.intervals[taskId] = setInterval(() => {
        this.setState((prevState) => ({
          tasks: prevState.tasks.map((t) =>
            t.id === taskId ? { ...t, time: t.time + 1 } : t
          ),
          totalTime: prevState.totalTime + 1, // Increment total time for all tasks
        }));
      }, 1000);

      this.setState((prevState) => ({
        tasks: prevState.tasks.map((t) =>
          t.id === taskId ? { ...t, isRunning: true } : t
        ),
      }));
    }
  };

  // Helper function to format time into hh:mm:ss
  formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  render() {
    return (
      <div>
        <div className="Body">
          <textarea
            className="textBody"
            rows={3}
            value={this.state.task}
            onChange={this.handleTaskChange}
            placeholder="Enter Your Work"
          ></textarea>
          <button className="BodyButton" onClick={this.addTask}>
            Enter
          </button>

          {/* Display current date and time */}
          <div className="dateTimeContainer">
          <div className="dateTimeDisplay">
            <h4>
            {this.state.dateTime.toLocaleDateString()}{' '}
            {this.state.dateTime.toLocaleTimeString()}
            </h4>
          </div>

          
          <div className="totalTimeDisplay">
            <h4>
            Total Time for Today: {this.formatTime(this.state.totalTime)}
            </h4>
          </div>
          </div>
        </div>

        {/* Pass tasks and event handlers as props to TaskList */}
        <TaskList
          tasks={this.state.tasks}
          toggleCompletion={this.toggleCompletion}
          startStopTimer={this.startStopTimer}
          formatTime={this.formatTime} // Pass formatTime function as a prop
        />
      </div>
    );
  }
}

export default Body;







