import React, { Component } from 'react';

import * as Constants from '../reducers/_constants';
import PlayerIcon from './PlayerIcon';

export default class Flash extends Component {

	flashContent()
	{
		let innerContent = ''

		if (this.props.gameStatus === Constants.STATUS_RUNNING) {
			return;
		}

		if (this.props.winner !== false) {
			innerContent = <h1>Player <span className="Flash__playerIcon"><PlayerIcon ref="PlayerIcon" player={this.props.winner} /></span> wins!</h1>;
		}
		else if (this.props.draw) {
			innerContent = <h1>Draw game!</h1>;
		}
		
		return (
			<div ref="Flash" className="Flash">
				{innerContent}
			</div>
		);
	}

	render()
	{
		return (
			<div className="FlashWrapper">
				{this.flashContent()}
			</div>
		);
	};

};