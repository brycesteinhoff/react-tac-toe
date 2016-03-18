import * as ActionTypes from '../actions/types';
import * as Utils from './_utils';

const STATUS_STOPPED = 'Stopped';
const STATUS_RUNNING = 'Running';

const initialState = {
	// Game status
	status: STATUS_STOPPED,

	// Board size
	boardSize: 3,

	// Player whose turn it is
	// 0 = X, 1 = O
	currentPlayer: 0,

	// Is there a current winner?
	// Values: false, 0, or 1
	winner: false,

	// Is it a draw?
	draw: false,

	// Status of each space if available
	// Accessed as `spaces[x][y]`
	spaces: [],

	// Winning progress for each row, column, & diagonal
	// for each player if available
	// Keys `row<N>`, `col<N>`, `diag`, and `antiDiag`
	// Stored as array of scores for each player, e.g. `[2,1]`
	winProgress: {},

	// How many times has each player won?
	// Stored as `[player0, player1]`
	winCount: [0,0],

	// Show modal dialog?
	showModal: false
};

function start(state, action)
{
	// Reset state
	// Leave boardSize and winCount as is
	let newState = {...state};
	newState.status = STATUS_RUNNING;
	newState.currentPlayer = 0;
	newState.winner = false;
	newState.spaces = [];
	newState.winProgress = {};

	return newState;
}

function play(state, action)
{
	let newState = {...state};

	let [row, column] = action.coords;

	// Space has already been played
	if (!Utils.isSpaceOpen(action.coords, state)) {
		// Checking this in Space component
		// Shouldn't ever get here
		return newState;
	}

	// Play space
	// Add row to spaces array if necessary
	if (!state.spaces[row]) { newState.spaces[row] = []; }
	// Add space
	newState.spaces[row][column] = {
		player: state.currentPlayer
	};

	// Update win progress
	newState = Utils.updateWinProgress(newState, state, action.coords);

	// Check for winner
	if (Utils.checkForWinner(newState, action.coords)) {
		newState.status = STATUS_STOPPED;
		newState.winner = state.currentPlayer;
		newState.winCount[state.currentPlayer]++;
	}

	// Check for draw game
	// Deep length of array equals boardSize squared

	// Change current player to other player
	newState.currentPlayer = 1 - state.currentPlayer;

	return newState;
}

function updateSize(state, action)
{
	let newState = {...state};

	newState.boardSize = action.size;

	return newState;
}

function showModal(state, action)
{
	let newState = {...state};

	newState.showModal = true;

	return newState;
}

function dismissModal(state, action)
{
	let newState = {...state};

	newState.showModal = false;

	return newState;
}

export default function gameReducer(state = initialState, action)
{
	switch(action.type)
	{
		case ActionTypes.START:
			return start(state, action);
		case ActionTypes.PLAY:
			return play(state, action);
		case ActionTypes.UPDATE_SIZE:
			return updateSize(state, action);
		case ActionTypes.SHOW_MODAL:
			return showModal(state, action);
		case ActionTypes.DISMISS_MODAL:
			return dismissModal(state, action);
		default:
			return state;
	}
}