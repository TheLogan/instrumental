import Phaser from 'phaser'
import config from './config'
import MainMenu from './scenes/MainMenu'
import Loader from './scenes/Loader'
import FallingNotes from './scenes/FallingNotes'
import LearnSheetMusic from './scenes/LearnSheetMusic'

new Phaser.Game(
  Object.assign(config, {
    scene: [Loader, MainMenu, FallingNotes, LearnSheetMusic],
  }),
)
