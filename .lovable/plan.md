# AutoVid Studio — in-browser timeline editor

A dark-mode video studio where everything happens in the browser: add clips, trim them, reorder scenes, add subtitles, layer a voiceover or music track, then export a finished MP4 — no server rendering, no waiting in a queue.

## What you'll be able to do

1. **Add clips** — drag video files in, or paste a video URL. Each clip becomes a scene card on the timeline.
2. **Preview** — a player with play/pause, scrubbing and a live playhead that follows the timeline.
3. **Trim** — per-clip start/end handles plus numeric in/out fields; preview reflects the trimmed range.
4. **Reorder** — drag scene cards to change order; the timeline and preview update immediately.
5. **Subtitles** — add text overlays with start/end times, choose position and size; shown live over the preview and burned into the export.
6. **Audio** — attach one voiceover/music track, set its volume against the original clip audio, and mix it in on export.
7. **Export** — one button stitches the trimmed clips in order, mixes audio, burns subtitles, and gives you an MP4 download.

## Screens

- `/` — the studio: media bin (left), preview player (center), properties panel for the selected clip or subtitle (right), timeline strip along the bottom.
- Export progress shows as a percentage bar with the current stage (converting, concatenating, mixing, finishing).

## Notes on the stack

This project runs on TanStack Start + React + Tailwind rather than Next.js, and there is no server-side FFmpeg available — which fits this request exactly, since all processing is client-side.

## Technical approach

- **FFmpeg**: `@ffmpeg/ffmpeg` + `@ffmpeg/util`, single-threaded core loaded from a CDN URL at runtime so no SharedArrayBuffer/COOP-COEP headers are needed. Loaded lazily inside a `ClientOnly` boundary via dynamic `import()` in an event handler, never at module scope (SSR safety). Core files are fetched with `toBlobURL` and cached in a module-level singleton so the ~30MB core loads once.
- **State**: a single `useEditorStore` (zustand) holding `clips[]` (id, name, objectUrl, duration, trimStart, trimEnd), `subtitles[]`, `audioTrack`, `selectedId`, `exportState`. All in-memory; object URLs revoked on removal.
- **Preview**: sequenced HTML `<video>` playback driven by a `requestAnimationFrame` loop — computes which clip owns the current global time, seeks/swaps sources, and applies trim boundaries. Subtitles render as absolutely positioned DOM over the video (no FFmpeg needed for preview). Audio track plays through a parallel `<audio>` element kept in sync.
- **Reordering**: `@dnd-kit/core` + `@dnd-kit/sortable` on the timeline strip (already the ecosystem standard, keyboard-accessible).
- **Export pipeline** (in a helper module, client-only):
  1. Write each input file into FFmpeg's virtual FS.
  2. Normalize + trim each clip to a common format (`-ss/-to`, scale to 1920x1080 with pad, 30fps, yuv420p, aac 48k) so concat is safe with mixed sources.
  3Concat via the concat demuxer file list.
  4. If an audio track exists: `amix`/`volume` filters to blend original audio with the track at the chosen levels.
  5. Generate an SRT from `subtitles[]` and burn with the `subtitles` filter.
  6. Read the output, build a Blob URL, offer download and load it back into the player.
  Progress is reported from FFmpeg's `progress` event, weighted per stage.
- **Design system**: dark editor theme (near-black surfaces, single accent) added as semantic tokens in `src/styles.css`; no hardcoded color utilities in components.
- **Head metadata**: unique title/description/og tags on the studio route.

## Out of scope for this build

AI clip generation, text-to-speech, social accounts, and scheduled publishing from the earlier brief are not included here — the editor and export come first. Say the word and I'll plan those as the next phase (AI generation and voiceover can run through Lovable's built-in AI, and publishing would need a backend with accounts and stored tokens).
