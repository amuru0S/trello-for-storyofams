export const addBoard = (board) => {
    return {
      type: 'ADD_BOARD',
      board
    }
  }
  
  export const updateBoard = (board) => {
    return {
      type: 'UPDATE_BOARD',
      board
    }
  }
  
  export const deleteBoard = (id) => {
    return {
      type: 'DELETE_BOARD',
      id
    }
  }
  
  export const addList = (list) => {
    return {
      type: 'ADD_LIST',
      list
    }
  }
  
  export const updateList = (list) => {
    return {
      type: 'UPDATE_LIST',
      list
    }
  }
  
  export const deleteList = (id) => {
    return {
      type: 'DELETE_LIST',
      id
    }
  }
  
  export const addTask = (task) => {
      return {
      type: 'ADD_TASK',
      task
    }
  }
  
  export const updateTask = (task) => {
    return {
      type: 'UPDATE_TASK',
      task
    }
  }
  
  export const deleteTask = (id) => {
    return {
      type: 'DELETE_TASK',
      id
    }
  }
  
  export const changeMessage = (message) => {
    return {
      type: "CHANGE_MESSAGE",
      message: message
    }
  }