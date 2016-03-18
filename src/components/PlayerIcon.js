import React, { Component } from 'react';

export default class PlayerIcon extends Component {

	cssClasses()
	{
		let classes = [];

		classes.push('PlayerIcon');

		classes.push('PlayerIcon--player' + this.props.player);

		return classes;
	}

	render()
	{
		return (
			<div className={this.cssClasses().join(' ')}><span></span></div>
		);
	};

};