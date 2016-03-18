import React, { Component } from 'react';

import Space from './Space';

export default class Board extends Component {

	showModal(e)
	{
		e.preventDefault();

		this.props.boundActions.showModal();
	}

	buildBoard()
	{
		let size = this.props.boardSize;
		let spaces = this.props.spaces;
		let dispatchPlay = this.props.boundActions.play;
		let rows = [];

		// Add rows
		for (let x = 0; x < size; x++) {
			let columnSpaces = [];

			// Add space per column
			for (let y = 0; y < size; y++) {
				// Pass space state if available, else empty object
				let spaceState = (spaces[x] && spaces[x][y]) ? spaces[x][y] : {};

				columnSpaces.push(<Space /*react*/key={'col' + y} coords={[x,y]} space={spaceState} dispatchPlay={dispatchPlay} />);
			}

			rows[x] = <div className="Board__row" /*react*/key={'row' + x}>{columnSpaces}</div>;
		}

		return rows;
	}

	render()
	{
		let boardContent = this.buildBoard();

		return (
			<section className="Board">
				<div className="container container-narrower">
					<div className="Board__content">
						{boardContent}
					</div>
					<a href="#" className="btn" onClick={this.showModal.bind(this)}><span>Reset Game</span></a>
				</div>
			</section>
		);
	};

};