import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Board from './Board';
import PropTypes from 'prop-types';



const BoardContainer = props => 
props.board ? <Board board={props.board} /> : <Link to="/" />;

BoardContainer.propTypes = { board: PropTypes.object };

const mapStateToProps = (state, ownProps) => {
    const { boardID } = ownProps.match.params;
    const board = state.boardsById[boardID];
    return { board };
}

export default connect(mapStateToProps)(BoardContainer);