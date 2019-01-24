import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from '../List/List';
import ListAdder from '../ListAdder/ListAdder';
import './Board.scss';



class Board extends Component {
    static propTypes = {
        lists: PropTypes.arrayOf(
            PropTypes.shape({_id: PropTypes.string.isRequired })
        ).isRequired,
        boardId: PropTypes.string.isRequired,
        boardTitle: PropTypes.string.isRequired,
        boardColor: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };
    constructor(props){
        super(props);
        this.state={
            startX: null,
            startScrollX: null
        };
    }

    componentDidMount = () => {
        const { boardId, dispatch } = this.props;
        dispatch({
            type: "PUT_BOARD_ID_IN_REDUX",
            payload: { boardId }
        });
    };

    handleDragEnd = ({ source, destination, type }) => {
        // dropped outside the list
        if(!destination) {
            return;
        }
        const { dispatch, boardID } = this.props;

        // Move list
        if(type === "COLUMN"){
            // prevent update if nothing has changed
            if (source.index !== destination.index) {
                dispatch({
                    type: "MOVE_LIST",
                    payload: {
                        oldListIndex: source.index,
                        newListIndex: destination.index,
                        boardId: source.droppableId
                    }
                });
            }
            return;
        }
        // Move card
        if( 
            source.index !== destination.index ||
            source.droppableId !== destination.droppableId
        ) {
            dispatch({
                type: "MOVE_CARD",
                payload: {
                    sourceListId: source.droppableId,
                    destListId: destination.droppableId,
                    oldCardIndex: source.index,
                    newCardIndex: destination.index,
                    boardID
                }
            });
        }
    };

    // The below methods are the implementation of dragging of the boards by holding the mouse
    handleMouseDown = ({ target, clientX }) => {
        if( target.className !== 'list-wrapper' && target.className !== 'lists') {
            return;
        }
        window.addEventListener("mousemove", this.handleMouseMove);
        window.addEventListener("mouseup", this.handleMouseUp);
        this.setState({
            startX: clientX,
            startScrollX: window.scrollX
        });
    };

    // Go to scroll position every time the mouse moves while dragging is activated
    handleMouseMove = ({ clientX }) => {
        const { startX, startScrollX } = this.state;
        const scrollX = startScrollX - clientX + startX;
        window.scrollTo(scrollX, 0);
        const windowScrollX = window.scrollX;
        if (scrollX !== windowScrollX) {
            this.setState({
                startX: clientX + windowScrollX - startScrollX
            });
        }
    };

    // Remove drag event listeners
    handleMouseUp = () => {
        if(this.state.startX) {
            window.removeEventListener("mousemove", this.handleMouseMove);
            window.removeEventListener("mouseup", this.handleMouseUp);
            this.setState({ startX: null, startScrollX: null });
        }
    };

    handleWheel = ({ target, deltaY }) => {
        // scroll page right or left as long as the mouse is not hovering a card-list ( which could have vertical scroll)
        if(
            target.className !== 'list-wrapper' &&
            target.className !== 'lists' &&
            target.className !== 'open-composer-button' &&
            target.className !== 'list-title-button'
        ) {
            return;
        }
        // Move the board 80 pixels on every wheel event
        if(Math.sign(deltaY) === 1) {
            window.scroll(window.scrollX + 80, 0);
        } else if(Math.sign(deltaY) === -1) {
            window.scrollTo(window.screenX - 80, 0);
        }
    };
    
    render = () => {
        const { lists, boardID, boardColor } = this.props;
        return(
            <>
            <div className= {classnames("board", boardColor)}>
            <div 
            className="lists-wrapper"
            onMouseDown={this.handleMouseDown}
            onWheel={this.handleWheel}
            >
            <DragDropContext onDragEnd={this.handleDragEnd}>
                <Droppable
                droppableId={boardID}
                type="COLUMN"
                direction="horizontal"
                >
                    {provided => (
                        <div className="lists" ref={provided.innerRef}>
                        {lists.map((list, index) => (
                            <List
                            list={list}
                            boardID={boardID}
                            index={index}
                            key={list._id}
                            />
                        ))}
                        {provided.placeholder}
                        <ListAdder boardID={boardID} />
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            </div>
                <div className="board-underlay" />
            </div>
        </>
        );
    };
}


const mapStateToProps = (state, ownProps) => {
    const { board } = ownProps;
    return {
        lists: board.lists.map(listId => state.listsById[listId]),
        boardTitle: board.title,
        boardColor: board.color,
        boardID: board._id
    };
};






export default connect(mapStateToProps)(Board);