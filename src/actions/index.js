import * as ActionTypes from './types';

// Action Creators

// Start game
export function start()
{
	return {
		type: ActionTypes.START
	};
};

// Play on a space
// Accepts coords as array `[x,y]`
export function play(coords)
{
	return {
		type: ActionTypes.PLAY,
		coords: coords
	};
};

// Update board size
export function updateBoardSize(size)
{
	return {
		type: ActionTypes.UPDATE_SIZE,
		size: size
	};
};