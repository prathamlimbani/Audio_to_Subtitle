
import { SubtitleSegment, ExportFormat } from "../types";

export function formatToSRT(segments: SubtitleSegment[]): string {
  return segments
    .map((s, i) => `${i + 1}\n${s.start} --> ${s.end}\n${s.text}\n`)
    .join("\n");
}

export function formatToVTT(segments: SubtitleSegment[]): string {
  const vttHeader = "WEBVTT\n\n";
  const content = segments
    .map((s) => {
      // VTT uses dot instead of comma for ms: 00:00:00.000
      const start = s.start.replace(",", ".");
      const end = s.end.replace(",", ".");
      return `${start} --> ${end}\n${s.text}\n`;
    })
    .join("\n");
  return vttHeader + content;
}

export function formatToTXT(segments: SubtitleSegment[]): string {
  return segments.map((s) => `[${s.start}] ${s.text}`).join("\n");
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
