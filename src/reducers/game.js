import * as ActionTypes from '../actions/types';
import * as Utils from './_utils';

const STATUS_STOPPED = 'Stopped';
const STATUS_RUNNING = 'Running';

let initialState = {
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

	// Status of each space if available
	// Accessed as `spaces[x][y]`
	spaces: [],

	// Space misplayed last turn
	// Stored as `[x, y]` or null if none
	lastMisplayed: null,

	// Winning progress for each row, column, & diagonal
	// for each player if available
	// Keys `row<N>`, `col<N>`, `diag`, and `antiDiag`
	// Stored as array of scores for each player, e.g. `[2,1]`
	winProgress: {},

	// How many times has each player won?
	// Stored as `[player0, player1]`
	winCount: [0,0]
};

function start(state, action)
{
	// Reset state
	let newState = initialState;

	// Set status
	newState.status = STATUS_RUNNING;

	// Preserve board size
	newState.boardSize = state.boardSize;

	// Preserve win count
	newState.winCount = state.winCount;

	return newState;
}

function play(state, action)
{
	let newState = {...state};

	let [row, column] = action.coords;

	// Reset last misplayed
	if (state.lastMisplayed) {
		let [misplayedRow, misplayedColumn] = state.lastMisplayed;

		newState.spaces[misplayedRow][misplayedColumn].misplayed = false;
		newState.lastMisplayed = null;
	}

	// Space has already been played
	if (!Utils.isSpaceOpen(action.coords, state)) {
		newState.spaces[row][column].misplayed = true;
		newState.lastMisplayed = [row, column];

		return newState;
	}

	// Play space
	// Add row to spaces array if necessary
	if (!state.spaces[row]) { newState.spaces[row] = []; }
	// Add space
	newState.spaces[row][column] = {
		player: state.currentPlayer,
		misplayed: false
	};

	// Update win progress
	newState = Utils.updateWinProgress(newState, state, action.coords);

	// Check for winner
	if (Utils.checkForWinner(newState, action.coords)) {
		newState.status = STATUS_STOPPED;
		newState.winner = state.currentPlayer;
		newState.winCount[state.currentPlayer]++;

		return newState;
	}

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

export default function gameReducer(state = initialState, action)
{
	switch(action.type)
	{
		case ActionTypes.START:
			// return start(state, action);
			return state;
		case ActionTypes.PLAY:
			return play(state, action);
		case ActionTypes.UPDATE_SIZE:
			return updateSize(state, action);
		default:
			return state;
	}
}