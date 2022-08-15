import Phaser from 'phaser'
import config from './config'
import MainMenu from './scenes/MainMenu'
import Loader from './scenes/Loader'
import FallingNotes from './scenes/FallingNotes'
import LearnSheetMusic from './scenes/SheetMusic/LearnSheetMusic'
import AnalyseAudio from './Prototypes/AnalyseAudio'
import PianoScene from './Prototypes/PianoScene'

new Phaser.Game(
  Object.assign(config, {
    scene: [Loader, MainMenu, FallingNotes, LearnSheetMusic, AnalyseAudio, PianoScene],
  }),
)
