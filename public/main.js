/* global document, window */

class Game {
	constructor() {
		this.setElements();
		this.setBoard();
	}

	setElements() {
		this.board = document.querySelector('.board');
	}

	setBoard() {
		let html = '';
		const hue = 270;
		const gap = 10;
		for (let i = 0; i < 25; i++) {
			html += `<span class=brick style="background-color: hsl(${hue - (i * gap)}deg 50% 40%)"></span>`;
		}

		this.board.innerHTML = html;
	}

	randomColor() {
		return Math.floor((Math.random() * 2) ** 24).toString(16).padStart(6, '0');
	}
}

window.addEventListener('load', () => new Game());
