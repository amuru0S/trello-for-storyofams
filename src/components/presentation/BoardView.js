import React from 'react';
import _ from 'lodash';
import { Input, Button } from 'reactstrap';
import List from '../container/List';


const BoardView = (props) => {
  let textInput = false

  const handleAddList = () => {
    let input = textInput
    let title = input.value
    if (_.isEmpty(title)) {
      return
    }
    props.addListHandler(title)
    input.value = ''
  }

  return (
    <div className="board">
      {
        props.lists.map(l => (
          <List
            key={l.id}
            id={l.id} 
            title={l.title}
            board_id={props.id}
          />
        ))
      }
      <div className="list">
        <div className="footer list-footer">
          <Input 
            type="text"
            placeholder="Enter List Title ..."
            innerRef={ref => textInput = ref}
          />
          <Button className="add-list"
            onClick={handleAddList}
          >
            Add List
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BoardView;