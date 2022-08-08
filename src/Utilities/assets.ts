export const images: iImages = {
  BUTTON: 'assets/Button',
  LOGO: 'assets/logo',
  TREBLECLEF: 'assets/TrebleClef',
}

export const svgs: iImages = {
  NOTES_WHOLE: 'assets/Notes/Whole',
  NOTES_HALF: 'assets/Notes/Half',
  // NOTES_QUARTER: 'assets/Notes/Defau1ltNote',
  // NOTES_EIGHTTH: '',
  // NOTES_SIXTEENTHS: '',
  // NOTES_THIRTYSECONDS: '',
}

interface iImages {
  [key: string]: string;
}