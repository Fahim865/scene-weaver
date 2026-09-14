# Scene Weaver

Act as a Principal Full-Stack Engineer and AI Architect. Build a full-stack Web Application (Vidrush Clone) called "AutoVid Studio" using Next.js 14 (App Router), TypeScript, Tailwind CSS, Prisma, and BullMQ.

### CORE REQUIREMENTS & MODULES:

1. Dashboard & UI Interface:
   - Dark-mode responsive UI with dynamic timeline viewer.
   - Script input box (Text-to-Video mode).
   - Dynamic Scene Manager: automatically parses script into 4-5 second visual prompts with corresponding TTS voice prompts.
   - Video Preview Player with clip re-ordering and background audio mixer.
   - Social Media Connection Hub (OAuth for YouTube & Facebook Pages).
   - Scheduler Drawer: pick date, time, title, description, and target social platforms.

2. AI Video & Audio Engine (Backend Server Actions):
   - Integrate `@fal-ai/serverless-client` or Replicate API to generate 4-5 sec video clips for each script scene using free-tier open-source models (LTX-Video / CogVideoX).
   - Integrate `edge-tts` (or Google TTS) for high-quality, 100% free multi-language voiceover generation.
   - Video Processing Pipeline: Use `fluent-ffmpeg` to merge video clips, overlay the TTS voiceover file, burn hardcoded subtitles (SRT), and export as 1080p MP4.

3. Social Media Scheduler & Publisher Service:
   - Store access tokens in PostgreSQL using Prisma.
   - Background worker with Redis/BullMQ that triggers on scheduled timestamps.
   - YouTube Integration: Upload MP4 via Googleapis (`youtube.videos.insert`) as Short or Long video.
   - Facebook/Instagram Integration: Upload MP4 via Meta Graph API Reels endpoint (`/me/videos` or `/me/video_reels`).

4. API Key Management:
   - User settings page to input custom API Keys for Fal.ai, Replicate, YouTube Client Credentials, and Meta App ID/Secret.

Generate the full project structure, Prisma schema, API route handlers (/api/generate-video, /api/stitch, /api/schedule), and frontend components cleanly.use this code

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/0e026dba-c5cb-43ce-a704-18c30381b86c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
