import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Slider from 'rc-slider';

import Flash from './Flash';

const sliderMarks = {
	3: '3x3',
	4: '4x4',
	5: '5x5',
	6: '6x6'
}

export default class Modal extends Component {

	handleSlider(sliderValue)
	{
		this.sliderValue = sliderValue;
	}

	dismissModal(e)
	{
		e.preventDefault();

		this.props.boundActions.dismissModal();
	}

	startGame(e)
	{
		e.preventDefault();

		if (!this.sliderValue) { this.sliderValue = this.props.boardSize; }
		if (this.sliderValue !== this.props.boardSize) {
			this.props.boundActions.updateBoardSize(this.sliderValue);
		}

		this.props.boundActions.start();

		this.props.boundActions.dismissModal();
	}

	modalContent()
	{
		if (!this.props.showModal) {
			return;
		}

		let gameStatus = this.props.gameStatus;
		let winner = this.props.winner;
		let draw = this.props.draw;
		let defaultValue = (this.sliderValue) ? this.sliderValue : this.props.boardSize;

		return (
			<div className="ModalWrapper">
				<div className="Modal" /*react*/key="modal">
					<div className="Modal__header">
						<img src="assets/react-tac-toe.svg" className="Modal__logo" />
					</div>

					<div className="Modal__content">
						<Flash gameStatus={gameStatus} winner={winner} draw={draw} />
						<p>Choose a game board size:</p>
						<Slider ref="Slider" className="Modal__slider"
							min={3}
							max={6}
							marks={sliderMarks}
							step={1}
							defaultValue={defaultValue}
							disabled={false}
							tipFormatter={null}
							onAfterChange={this.handleSlider.bind(this)} />
					</div>

					<div className="Modal__footer">
						<a ref="btnClose" href="#" className="btn" onClick={this.dismissModal.bind(this)}><span>Close</span></a>
						<a ref="btnNewGame" href="#" className="btn btn-right" onClick={this.startGame.bind(this)}><span>Start New Game</span></a>
					</div>
				</div>

				<div className="ModalWrapper__shade" /*react*/key="shade" />
			</div>
		);
	}

	render()
	{
		return (
			<ReactCSSTransitionGroup transitionName="animate-modal" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
				{this.modalContent()}
			</ReactCSSTransitionGroup>
		);
	};

};