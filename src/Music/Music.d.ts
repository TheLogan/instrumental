import { iNote } from '../Utilities/Constants';

export type Music = {
  "name": string,
  "time signature": string,
  "metronome mark": number,
  "events": MusicEvent;
}

export type MusicEvent = (noteEvent | restEvent | chordEvent | timeSignatureEvent)[]

export type noteEvent = {
  type: "note",
  note: iNote,
  duration: duration,
  relations?: EventRelations,
};

export type restEvent = {
  type: "rest",
  duration: duration,
};

export type chordEvent = {
  type: "chord",
  note: iNote[],
  duration: duration,
  relations?: EventRelations
};

export type timeSignatureEvent = {
  type: "time signature",
  value: string
};

export type duration = "1" | "1/2" | "1/4" | "1/8" | "1/16";

export type EventRelations = {
  tie?: number,
  dot?: number
}

