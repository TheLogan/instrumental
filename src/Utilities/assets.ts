export const images: iImages = {
  BUTTON: 'assets/Button',
  LOGO: 'assets/logo',
  TREBLECLEF: 'assets/TrebleClef',
}

export const svgs: iImages = {
  "1": 'assets/Notes/Whole',
  "1/2": 'assets/Notes/Half',
  "1/4": 'assets/Notes/Quarter',
  "1/8": "assets/Notes/Eighth",
  "GAUGE": 'assets/Art/gauge'

}

interface iImages {
  [key: string]: string;
}