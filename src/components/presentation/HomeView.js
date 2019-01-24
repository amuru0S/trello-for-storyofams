import React from 'react';
import _ from 'lodash';
// import { Alert, Input, Button, Container, Row, Col, Form, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Alert, Input, Button, Form, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { alert, boardTitleValidator } from '../../utils/';
import Board from '../container/Board';

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      current_board: 1
    }

    this.toggle = this._toggleModal.bind(this)
  }

 
  _getCurrentBoard() {
    return _.find(this.props.boards, (b) => b.id === this.state.current_board)
  }

  _isDefaultBoard() {
    return this._getCurrentBoard() && this._getCurrentBoard().default
  }

  _toggleModal() {
    this.setState({
      modal: !this.state.modal
    })
  }

  _addBoard = () => {
    let title = this.newBoardTitleDOM.value.trim()
    let { success, message } = boardTitleValidator(title)
    if (!success) {
      alert({
        text: message,
        type: 'error'
      })
      return
    }
    this.props.addBoardHandler(title)
    this.setState({
      modal: false
    })
  }


  _updateBoardTitle = () => {
    let title = this.currentBoardTitleDOM.value.trim()
    let { success, message } = boardTitleValidator(title)
    if (!success) {
      alert({
        text: message,
        type: 'error'
      })
      return
    }
    let current_board = this._getCurrentBoard()
    if (!current_board) {
      return
    }
    let board = Object.assign({}, current_board, {
      title
    })
    this.props.updateBoardHandler(board)
    this.setState({
      modal: false
    })
  }

  _deleteBoard = () => {
    this.props.deleteBoardHandler(this.state.current_board)
    let default_board = _.find(this.props.boards, (b) => b.default)
    this.setState({
      current_board: default_board.id,
      modal: false
    })

    return false 
  }

render() {
    return (
      <div className="App-Container">
        <div>
              <Form className="default-board">
                    <Input type="select" name="boardList" id="boardList" value={this.state.current_board}
                      onChange={(e) => this.setState({
                        current_board: parseInt(e.target.value, 10)
                      })}
                    >
                      {
                        this.props.boards.map((b) => (
                          <option key={b.id} value={b.id}>{b.title}</option>
                        ))
                      }
                    </Input>
                    <Button className="settings"
                      onClick={this.toggle}
                    >
                    </Button>
              </Form>
        </div>
        <Board id={this.state.current_board} />
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Manage Board</ModalHeader>
          <ModalBody>
            <div className="label-title">Manage Current Board</div>
            <Form>
                  <Input type="text" name="currentBoardTitle" id="currentBoardTitle" 
                    defaultValue={this._getCurrentBoard().title} 
                    placeholder="Update current board ..."
                    innerRef={(ref) => this.currentBoardTitleDOM = ref} 
                  />
                  <Button className="update-title"
                    onClick={this._updateBoardTitle}
                  > Update Title </Button>
                <Button className="del-board" disabled={this._isDefaultBoard()}
                  onClick={this._deleteBoard}
                >Delete Board</Button>
                {
                  this._isDefaultBoard()
                  ? (
                    <Alert color="light">
                      This is the default board. This board cannot be deleted
                    </Alert>
                  )
                  : null
                }  
            </Form>
          </ModalBody>
          <ModalFooter style={{display: 'block', justifyContent: 'center'}}>
            <div className="label-title">Create New Board</div>
            <div>
              <Form>
                    <Input type="text" name="newBoardTitle" id="newBoardTitle" placeholder="Enter new board name ..." 
                      innerRef={(ref) => this.newBoardTitleDOM = ref} 
                    />
                    <Button className="create-board" color="success" onClick={this._addBoard}>Create Board</Button>
              </Form>
            </div>
          </ModalFooter>
          <ModalFooter>
            <Button className="cancel" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default HomeView