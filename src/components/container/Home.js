import { connect } from 'react-redux';
import { addBoard, updateBoard, deleteBoard } from '../../actions/';
import { alert } from '../../utils/';
import HomeView from '../presentation/HomeView';


const mapStateToProps = (state) => {
  return {
    boards: state.boards
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addBoardHandler: (title) => {
      let board = {
        title
      }
      dispatch( addBoard(board) )
      alert({
        text: title + ' added ...'
      })
    },
    updateBoardHandler: (board) => {
      dispatch( updateBoard(board) )
      alert({
        text: board.title + ' updated ...'
      })
    },
    deleteBoardHandler: (id) => {
      dispatch( deleteBoard(id) )
      alert({
        text: 'Board deleted ...'
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
