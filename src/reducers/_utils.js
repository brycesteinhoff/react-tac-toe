function isSpaceOpen(coords, state)
{
	let [row, column] = coords;

	if (state.spaces[row] && state.spaces[row][column]) {
		return false;
	}

	return true;
}

function updateWinProgress(newState, state, coords)
{
	let winProgress = state.winProgress;
	let currentPlayer = state.currentPlayer;
	let boardSize = state.boardSize;
	let [row, column] = coords;
	let keys = [];

	// Keys to update
	keys.push('row' + row);
	keys.push('col' + column);
	if (row === column) { keys.push('diag'); }
	if (row + column === boardSize - 1) { keys.push('antiDiag'); }

	// Update 'em
	for (let i = 0; i < keys.length; i++) {
		let key = keys[i];
		let scoreArray = (winProgress[key]) ? winProgress[key] : [0,0];
		scoreArray[currentPlayer]++;
		newState.winProgress[key] = scoreArray;
	}

	return newState;
}

function checkForWinner(newState, coords)
{
	let winProgress = newState.winProgress;
	let currentPlayer = newState.currentPlayer;
	let boardSize = newState.boardSize;
	let [row, column] = coords;
	let keys = [];

	// Keys to check
	keys.push('row' + row);
	keys.push('col' + column);
	if (row === column) { keys.push('diag'); }
	if (row + column === boardSize - 1) { keys.push('antiDiag'); }

	// Check 'em
	for (let i = 0; i < keys.length; i++) {
		let key = keys[i];
		if (winProgress[key][currentPlayer] === boardSize) {
			return true;
		}
	}

	return false;
}

export { isSpaceOpen, updateWinProgress, checkForWinner };