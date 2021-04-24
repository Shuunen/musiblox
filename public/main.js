/* global document, window */

const rand = (min = 0, max = 100) => Math.floor((Math.random() * (max - min + 1)) + min)
const pick = items => items[Math.floor(Math.random() * items.length)]

const WIN_GIFS = ['4A5', '7FZs']
const LOOSE_GIFS = ['W4S', '1A8H', '6IJz']
const MAX_DELAY = 600

class Brick {
  constructor() {
    const element = document.createElement('span')
    element.classList.add('brick')
    this.element = element
    this.active = false
    this.changeColor()
  }

  changeColor() {
    this.element.style.backgroundColor = `hsl(${rand(0, 12) * 30}deg 80% 60%)`
    if (this.active) setTimeout(() => this.changeColor(), rand(200, MAX_DELAY))
  }

  toggleActive() {
    this.active = !this.active
    if (this.active) this.changeColor()
  }
}

class Game {
  constructor() {
    this.active = false
    this.backdrop = document.querySelector('.backdrop')
    this.startBtn = document.querySelector('.start button')
    this.disc = document.querySelector('.disc')
    this.player = document.querySelector('audio')
    this.startBtn.addEventListener('click', () => this.start())
    this.setBoard()
  }

  setBoard() {
    this.board = document.querySelector('.board')
    this.board.addEventListener('click', event => this.checkColor(event.target))
    this.bricks = []
    for (let i = 0; i < 25; i++) {
      const brick = new Brick()
      this.bricks.push(brick)
      this.board.append(brick.element)
    }
  }

  toggleActive() {
    console.log('toggleActive')
    this.backdrop.style.backgroundImage = ''
    this.bricks.forEach(brick => brick.toggleActive())
    this.backdrop.classList.toggle('active')
    this.backdrop.classList.toggle('start', !this.active)
    this.active = !this.active
    this.disc.classList.toggle('spin', this.active)
    if (this.active) setTimeout(() => this.chooseColor(), rand(4, 12) * 1000)
  }

  chooseColor() {
    console.log('chooseColor')
    this.toggleActive()
    const brick = pick(this.bricks)
    this.color = brick.element.style.backgroundColor
    this.disc.style.color = this.color
    this.disc.classList.remove('spin')
    setTimeout(() => this.player.pause(), 200)
    this.timer = setTimeout(() => this.checkColor(), 2000)
  }

  checkColor(element) {
    if (this.active) return
    clearTimeout(this.timer)
    const win = (element && element.className === 'brick' && element.style.backgroundColor === this.color)
    this.backdrop.style.backgroundImage = `url("https://i.gifer.com/${pick(win ? WIN_GIFS : LOOSE_GIFS)}.gif")`
    this.startBtn.textContent = win ? 'start' : 'try again'
    setTimeout(() => this.backdrop.classList.add('start'), 3000)
  }

  start() {
    this.player.play()
    this.toggleActive()
  }
}

window.addEventListener('load', () => new Game())
