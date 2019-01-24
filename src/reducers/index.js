import _ from 'lodash'

const initialState = {
  boards: [
    {
      id: 1,
      title: "Default Board",
      default: true
    }
  ],
  lists: [
    {
      id: 1,
      title: "Backlog",
      board_id: 1
    },
    {
      id: 2,
      title: "Priority",
      board_id: 1
    }
  ],
  tasks: []
}

function _getUniqueId(collection) {
  let MAX_ID = _.chain(collection)
              .map((c) => c.id)
              .max()
              .value()
  MAX_ID = MAX_ID || 0

  return MAX_ID + 1
}

function boardReducer(state = initialState.boards, action) {
  switch (action.type) {
    case 'ADD_BOARD':
      let board = Object.assign({}, action.board, {
        id: _getUniqueId(state)
      })
      return [
        ...state,
        board
      ]

    case 'UPDATE_BOARD':
      return state.map((b) => b.id === action.board.id ? action.board : b)

    case 'DELETE_BOARD': 
      return state.filter((b) => b.id !== action.id)

    default:
      return state
  }
}


function listReducer(state = initialState.lists, action) {
  switch (action.type) {
    case 'ADD_LIST':
      let list = Object.assign({}, action.list, {
        id: _getUniqueId(state)
      })
      return [
        ...state,
        list
      ]

    case 'UPDATE_LIST':
      let updated = state.map((l) => l.id === action.list.id ? action.list : l)
      return updated

    case 'DELETE_LIST':
      return state.filter((l) => l.id !== action.id)

    default:
      return state
  }
}


function taskReducer(state = initialState.tasks, action) {
  switch (action.type) {
    case 'ADD_TASK':
      let task = Object.assign({}, action.task, {
        id: _getUniqueId(state)
      })
      return [
        ...state,
        task
      ]

    case 'UPDATE_TASK':
      return state.map((t) => t.id === action.task.id ? action.task : t)

    case 'DELETE_TASK':
      return state.filter((t) => t.id !== action.id)

    default:
      return state
  }
}


export default function appReducer(state = initialState, action)  {  
  return {
    boards: boardReducer(state.boards, action),
    lists: listReducer(state.lists, action),
    tasks: taskReducer(state.tasks, action)
  }
}