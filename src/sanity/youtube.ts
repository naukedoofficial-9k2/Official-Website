const YOUTUBE_ID_PATTERN =
  /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})(?:[?&#/]|$)/;

export function getYouTubeId(url?: string): string | undefined {
  return url?.trim().match(YOUTUBE_ID_PATTERN)?.[1];
}
