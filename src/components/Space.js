import React, { Component } from 'react';

export default class Space extends Component {

	play()
	{
		this.props.dispatchPlay(this.props.coords);
	}

	render()
	{
		let [row, column] = this.props.coords; // BRYCE:temp

		return (
			<div className="Space" onClick={this.play.bind(this)}>row {row}, column {column}</div>
		);
	};

};