import { clsx, type ClassValue } from "clsx";
import type { RootNode, TextNode } from "lexical";
import { twMerge } from "tailwind-merge";
import { EMPTY_CONTENT, HEIGHT } from "./constants";
import type { Point } from "@/types/Point";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTextPreview(jsonSting: string, maxLength = 120): string {
  try {
    const parsed = JSON.parse(jsonSting);
    let text = "";
    const extractText = (node: RootNode | TextNode) => {
      if ("text" in node) {
        text += node.text;
      }
      if ("children" in node) {
        node?.children.forEach(extractText);
      }
    };
    extractText(parsed.root);
    const result = text.trim();
    return result.length > maxLength
      ? result.slice(0, maxLength) + "..."
      : result.length === 0
        ? EMPTY_CONTENT
        : result;
  } catch {
    return EMPTY_CONTENT;
  }
}

export function generatePoints(
  freq: number,
  amp: number,
  length: number,
  phase: number,
): Point[] {
  return Array.from({ length }, (_, i) => {
    return {
      x: 150 + Math.sin(i * freq + phase) * amp,
      y: (i / length) * HEIGHT,
    };
  });
}
