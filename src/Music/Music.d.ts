export type Music = {
  "name": string,
  "time signature": string,
  "events": MusicEvent;
  "BPM": number,
  "BPM type": string,
}

export type MusicEvent = (noteEvent | restEvent | chordEvent | timeSignatureEvent)[]

export type noteEvent = {
  type: "note",
  note: string,
  duration: duration,
  relations?: EventRelations,
};

export type restEvent = {
  type: "rest",
  duration: duration,
};

export type chordEvent = {
  type: "chord",
  note: string[],
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

