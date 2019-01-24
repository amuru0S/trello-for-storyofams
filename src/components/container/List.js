import _ from 'lodash';
import { connect } from 'react-redux';
import { addTask, updateTask, deleteTask, updateList, deleteList } from '../../actions';
import { alert } from '../../utils/';
import ListView from '../presentation/ListView';


function _extractTasks(list_id, tasks) {
  return _.filter(tasks, (t) => t.list_id === list_id)
}
const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    tasks: _extractTasks(ownProps.id, state.tasks),
    lists: state.lists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTaskHandler: (task) => {
      dispatch( addTask({
        ...task
      }) )
      alert({
        text: task.title + ' added successfully!'
      })
    },
    updateTaskHandler: (task) => {
      dispatch( updateTask(task) )
      alert({
        text: task.title + ' updated ...'
      })
    },
    deleteTaskHandler: (id) => {
      dispatch( deleteTask(id) )
      alert({
        text: 'Task deleted ...',
        timeout: 750
      })
    },
    updateListHandler: (list) => {
      dispatch( updateList(list) )
    },
    deleteListHandler: (id) => {
      dispatch( deleteList(id) )
      alert({
        text: 'List deleted ...',
        timeout: 750
      })
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ListView);