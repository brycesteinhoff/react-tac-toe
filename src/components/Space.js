import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import * as Constants from '../reducers/_constants';
import PlayerIcon from './PlayerIcon';

export default class Space extends Component {

	play()
	{
		if (this.getPlayer() === false && this.props.gameStatus !== Constants.STATUS_STOPPED) {
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

		if (this.props.gameStatus === Constants.STATUS_STOPPED) {
			classes.push('Space--isLocked');
		}

		return classes;
	}

	playerIcon()
	{
		let player = this.getPlayer();

		if (player !== false) {
			return <PlayerIcon ref="PlayerIcon" /*react*/key="playerIcon" player={player} />;
		}

		return;
	}

	render()
	{
		return (
			<div className={this.cssClasses().join(' ')} onClick={this.play.bind(this)}>
				{/*TO-DO: Move the CSSTransitionGroup to the PlayerIcon component
				Probably have to always display icon component here so
				CSSTransitionGroup is loaded before visible icon is needed*/}
				<ReactCSSTransitionGroup transitionName="animate" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
					{this.playerIcon()}
				</ReactCSSTransitionGroup>
			</div>
		);
	};

};