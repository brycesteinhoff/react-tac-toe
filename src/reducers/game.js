import * as ActionTypes from '../actions/types';

let initialState = {
	// Board meta data
	board: {
		size: 3
	},

	// Player whose turn it is
	// 0 = X, 1 = O
	currentPlayer: 0,

	// Status of each space if available
	// Accessed as `spaces[x][y]`
	spaces: [],

	// Winning progress for each row, column, & diagonal
	// for each player if available
	// Keys `row<N>`, `col<N>`, `diag`, and `antiDiag`
	winProgress: {}
}

export default function gameReducer(state = initialState, action)
{
	switch(action.type)
	{
		case ActionTypes.PLAY:
			
			return state;
		default:
			return state;
	}
}