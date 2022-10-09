import { iNote } from '../Utilities/Constants';

export type Music = {
  "name": string,
  "time signature": string,
  "BPM": number,
  "BPM type": string,
  "events": MusicEvent[]
}

export type MusicEvent = {
  type: "note" | "rest" | "chord" | "time signature";
}

export type noteEvent = {
  type: "note",
  note: iNote,
  duration: duration,
  relations?: EventRelations,
} & MusicEvent;

export type restEvent = {
  type: "rest",
  duration: duration,
} & MusicEvent;

export type chordEvent = {
  type: "chord",
  note: iNote[],
  duration: duration,
  relations?: EventRelations
} & MusicEvent;

export type timeSignatureEvent = {
  type: "time signature",
  value: string
} & MusicEvent;

export type duration = "1" | "1/2" | "1/4" | "1/8" | "1/16";

export type EventRelations = {
  tie?: number,
  dot?: number
}

