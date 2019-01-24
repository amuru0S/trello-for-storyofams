import React from 'react';
import _ from 'lodash';
import { Container, Input, Button } from 'reactstrap';
import List from '../container/List';


function BoardView(props) {
  let textInput = false

  function handleAddList() {
    let input = textInput
    let title = input.value
    if (_.isEmpty(title)) {
      return
    }
    props.addListHandler(title)
    input.value = ''
  }

  return (
    <Container fluid className="board">
      {
        props.lists.map((l) => (
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
            innerRef={(ref) => textInput = ref}
          />
          <Button outline block color="primary"
            onClick={handleAddList}
          >
            <span className="oi" data-glyph="plus" title="add task" aria-hidden="true"></span>{' '}
            {' '} Add List
          </Button>{' '}
        </div>
      </div>
    </Container>
  )
}

export default BoardView;