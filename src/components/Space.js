import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PlayerIcon from './PlayerIcon';

export default class Space extends Component {

	play()
	{
		if (!this.props.space.hasOwnProperty('player')) {
			this.props.dispatchPlay(this.props.coords);
		}
	}

	getPlayer()
	{
		if (this.props.space.hasOwnProperty('player')) {
			return this.props.space.player;
		}

		return false;
	}

	cssClasses()
	{
		let classes = [];

		classes.push('Space');

		if (this.getPlayer() !== false) {
			classes.push('Space--hasBeenPlayed');
		}

		return classes;
	}

	playerIcon()
	{
		let player = this.getPlayer();

		if (player !== false) {
			return <PlayerIcon /*react*/key="playerIcon" player={player} />;
		}

		return;
	}

	render()
	{
		return (
			<div className={this.cssClasses().join(' ')} onClick={this.play.bind(this)}>
				<ReactCSSTransitionGroup transitionName="animate" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
					{this.playerIcon()}
				</ReactCSSTransitionGroup>
			</div>
		);
	};

};