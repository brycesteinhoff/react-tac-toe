import * as ActionTypes from './types';

// Action Creators

// Play on a space
// Accepts coords as array `[x,y]`
export function play(coords)
{
	return {
		type: ActionTypes.PLAY,
		coords: coords
	};
};