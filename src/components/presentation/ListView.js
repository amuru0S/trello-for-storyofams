import React from 'react';
import _ from 'lodash';
import { Input, Button } from 'reactstrap';
import { alert, taskTitleValidator } from '../../utils/';
import TaskView from './TaskView'
import EditTaskModal from './EditTaskModal'


class ListView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title_edited: false,
      edit_modal_shown: false,
      current_task: {}
    }

    this.toggle_edit_modal = this._toggleEditModal.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this._handleClick)
  }

  componentWillUnmount() {
    document.removeEventListener("click", this._handleClick)
  }

  _handleClick = (e) => {
    this.setState({
      title_edited: false
    })
  }

  _toggleEditModal() {
    this.setState({
      edit_modal_shown: !this.state.edit_modal_shown
    })
  }

  _deleteList = () => {
    this.props.deleteListHandler(this.props.id)
  }

  _addTask = () => {
    let title = this.newTaskTitle.value.trim()

    let { success, message } = taskTitleValidator(title)
    if (!success) {
      alert({
        text: message,
        type: 'error'
      })
      return
    }

    this.props.addTaskHandler({
      title,
      list_id: this.props.id
    })

    this.newTaskTitle.value = ""
  }

  _showEditTaskModal = (details) => {
    let task = _.pick(details, ["id", "title", "description", "list_id"])
    this.setState({
      edit_modal_shown: true,
      current_task: task
    })
  }

  _updateTask = (task) => {
    let { success, message } = taskTitleValidator(task.title)
    if (!success) {
      alert({
        text: message,
        type: 'error'
      })
      return
    }

    this.props.updateTaskHandler(task)
    this.setState({
      edit_modal_shown: false,
      current_task: {}
    })
  }

  _deleteTask = (task_id) => {
    this.props.deleteTaskHandler(task_id)
    this.setState({
      edit_modal_shown: false,
      current_task: {}
    })
  }

  _throttledTitleUpdate = _.throttle((e) => {

    if (!this.listTitleInput) {
      return
    }

    this.props.updateListHandler({
      id: this.props.id,
      title: this.listTitleInput.value.trim(),
      board_id: this.props.board_id
    })
  }, 333, {
    leading: false
  })

  render() {
    return (
      <div className="list">
        <div className="list-header">
          {
            this.state.title_edited
            ? (
                <Input
                  className="" 
                  type="text"
                  autoFocus 
                  defaultValue={this.props.title}
                  innerRef={(ref) => {
                    this.listTitleInput = ref
                  }}
                  onChange={this._throttledTitleUpdate}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      this.props.updateListHandler({
                        id: this.props.id,
                        title: this.listTitleInput.value.trim(),
                        board_id: this.props.board_id
                      })
                      this.setState({
                        title_edited: false
                      })
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.nativeEvent.stopImmediatePropagation()
                    return false
                  }}
                />
              )
            : (
                <div
                  className="list-title"
                  onClick={(e) => {
                    e.stopPropagation()
                    e.nativeEvent.stopImmediatePropagation()
                    this.setState({
                      title_edited: true
                    })

                    return false
                  }}
                >{this.props.title}</div>
              )
          
          }
        </div>
        <div className="list-body">
          {
            this.props.tasks.map((t) => (
              <TaskView
                key={t.id} 
                {...t}
                editTaskHandler={this._showEditTaskModal}
              />
            ))
          }
        </div>
        <div className="footer list-footer">
          <Input 
            type="text"
            placeholder="Enter Task Title ..."
            innerRef={(ref) => this.newTaskTitle = ref}
          />
          <Button outline block color="success"
            onClick={this._addTask}
          >
            <span className="oi" data-glyph="plus" title="add task" aria-hidden="true"></span>{' '}
            {' '} Add Task
          </Button>{' '}
          <hr />
          <Button outline block color="danger"
            onClick={this._deleteList}
          >
            <span className="oi" data-glyph="x" title="delete List" aria-hidden="true"></span>{' '}
            {' '} Delete List
          </Button>{' '}
        </div>
        {
          this.state.edit_modal_shown
          ? (
            <EditTaskModal 
              isOpen={this.state.edit_modal_shown}
              {...this.state.current_task}
              lists={this.props.lists}
              toggleHandler={this.toggle_edit_modal}
              updateHandler={this._updateTask}
              deleteHandler={this._deleteTask}
            />
          )
          : null
        }
      </div>
    )
  }
}

export default ListView