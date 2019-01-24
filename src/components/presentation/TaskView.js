import React from 'react';

const TaskView = (props) => (
  <div className="task"
    onClick={() => props.editTaskHandler(props)}
  >
    {props.title}
  </div>
)

export default TaskView;