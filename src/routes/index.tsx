import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const Studio = lazy(() => import("@/components/studio/Studio"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AutoVid Studio — Browser Video Timeline Editor" },
      {
        name: "description",
        content:
          "Trim clips, reorder scenes, add subtitles and mix audio, then export an MP4 — all inside your browser.",
      },
      { property: "og:title", content: "AutoVid Studio — Browser Video Timeline Editor" },
      {
        property: "og:description",
        content:
          "A dark-mode timeline editor that trims, stitches, subtitles and exports video without uploading anything.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function StudioFallback() {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <p className="text-sm text-muted-foreground">Loading the studio…</p>
    </div>
  );
}

function Index() {
  return (
    <ClientOnly fallback={<StudioFallback />}>
      <Suspense fallback={<StudioFallback />}>
        <Studio />
      </Suspense>
    </ClientOnly>
  );
}
