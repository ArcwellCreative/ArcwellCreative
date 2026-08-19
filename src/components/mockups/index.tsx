import { BrowserMockup } from "./BrowserMockup";
import { PosterMockup } from "./PosterMockup";
import { MarkMockup } from "./MarkMockup";
import { GridMockup } from "./GridMockup";

export const mockupByKind = {
  browser: BrowserMockup,
  poster: PosterMockup,
  mark: MarkMockup,
  grid: GridMockup,
} as const;

export type MockupKind = keyof typeof mockupByKind;
