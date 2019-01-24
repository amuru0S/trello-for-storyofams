import Noty from 'noty';
import _ from 'lodash';

export const alert = (options) => {
  const default_options = {
    type: 'success',
    timeout: 1000,
    theme: 'sunset'
  }

  let opts = Object.assign({}, default_options, options)

  new Noty(opts).show()
}


export const taskTitleValidator = (title) => {
  if (_.isEmpty(title)) {
    return {
      success: false,
      message: "Title should not be empty"
    }
  }

  if (_.size(title) > 80) {
    return {
      success: false,
      message: "Title should not be greater than 80 characters"
    } 
  }

  return {
    success: true
  }

}

export const boardTitleValidator = (title) => {
  if (_.isEmpty(title)) {
    return {
      success: false,
      message: "Title should not be empty"
    }
  }

  if (_.size(title) > 30) {
    return {
      success: false,
      message: "Title should not be greater than 30 characters"
    } 
  }

  return {
    success: true
  }  
}