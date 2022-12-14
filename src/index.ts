import Phaser from 'phaser'
import config from './config'
import MainMenu from './scenes/MainMenu'
import Loader from './scenes/Loader'
import FallingNotes from './scenes/FallingNotes'
import LearnSheetMusic from './scenes/SheetMusic/LearnSheetMusic'
import PianoScene from './Prototypes/PianoScene'
import TunerScene from './scenes/TunerScene'
import PianoScenePitcher from './Prototypes/PianoScenePitcher'

new Phaser.Game(
  Object.assign(config, {
    scene: [Loader, MainMenu, FallingNotes, LearnSheetMusic, PianoScene, TunerScene, PianoScenePitcher],
  }),
)
