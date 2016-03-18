import React, { Component } from 'react';

export default class Header extends Component {

	render()
	{
		return (
			<section className="Header">
				<div className="container">
					<img src="assets/react-tac-toe.svg" className="Header__logo" />
					<p>A Tic-Tac-Toe implementation in React/Redux</p>
				</div>
			</section>
		);
	};

};