function isSpaceOpen(coords, state)
{
	let [row, column] = coords;

	if (state.spaces[row] && state.spaces[row][column]) {
		return false;
	}

	return true;
}

function getRelevantWinProgressKeys(coords, boardSize)
{
	let [row, column] = coords;
	let keys = [];

	keys.push('row' + row);
	keys.push('col' + column);
	if (row === column) { keys.push('diag'); }
	if (row + column === boardSize - 1) { keys.push('antiDiag'); }

	return keys;
}

function updateWinProgress(newState, state, coords)
{
	let winProgress = state.winProgress;
	let currentPlayer = state.currentPlayer;
	let boardSize = state.boardSize;

	// Keys to update
	let keys = getRelevantWinProgressKeys(coords, boardSize);

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

	// Keys to check
	let keys = getRelevantWinProgressKeys(coords, boardSize);

	// Check 'em
	for (let i = 0; i < keys.length; i++) {
		let key = keys[i];
		if (winProgress[key][currentPlayer] === boardSize) {
			return true;
		}
	}

	return false;
}

function checkForDraw(spaces, boardSize)
{
	let count = 0;

	for (let x = 0; x < boardSize; x++) {
		if (spaces[x] === undefined) { continue; }

		for (let y = 0; y < boardSize; y++) {
			count += (spaces[x][y]) ? 1 : 0;
		}
	}

	if (count === Math.pow(boardSize, 2)) {
		return true;
	}

	return false;
}

export { isSpaceOpen, updateWinProgress, checkForWinner, checkForDraw };