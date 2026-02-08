import { useEffect, useState } from "react";

type PlatformName = "macOS" | "Linux" | "Windows";

export interface DownloadLink {
  label: string;
  href: string;
}

interface PlatformDownloadGroup {
  installers: DownloadLink[];
  standalone: DownloadLink[];
}

export type PlatformDownloads = Record<PlatformName, PlatformDownloadGroup>;

interface CachedDownloads {
  platforms: PlatformDownloads;
  timestamp: number;
}

interface GithubReleaseAsset {
  name?: string;
  browser_download_url?: string;
}

interface GithubRelease {
  html_url?: string;
  assets?: GithubReleaseAsset[];
}

const CACHE_KEY = "object0-platform-downloads";
const CACHE_TTL = 1000 * 60 * 15; // 15 minutes
const GITHUB_RELEASE_API =
  "https://api.github.com/repos/sayedhfatimi/object0/releases/latest";
const GITHUB_RELEASES_LATEST =
  "https://github.com/sayedhfatimi/object0/releases/latest";

const KNOWN_ARTIFACT_EXTENSIONS = [
  ".appimage",
  ".dmg",
  ".msi",
  ".exe",
  ".deb",
  ".rpm",
] as const;

function fallbackDownloads(releaseUrl = GITHUB_RELEASES_LATEST): PlatformDownloads {
  const installerLink = { label: "View release assets", href: releaseUrl };
  const standaloneLink = { label: "View release assets", href: releaseUrl };
  return {
    macOS: {
      installers: [installerLink],
      standalone: [standaloneLink],
    },
    Linux: {
      installers: [installerLink],
      standalone: [standaloneLink],
    },
    Windows: {
      installers: [installerLink],
      standalone: [standaloneLink],
    },
  };
}

function isDownloadLink(value: unknown): value is DownloadLink {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as DownloadLink;
  return typeof candidate.label === "string" && typeof candidate.href === "string";
}

function isPlatformDownloads(value: unknown): value is PlatformDownloads {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<PlatformDownloads>;
  const keys: PlatformName[] = ["macOS", "Linux", "Windows"];
  return keys.every((key) => {
    const group = candidate[key];
    return (
      !!group &&
      Array.isArray(group.installers) &&
      group.installers.every(isDownloadLink) &&
      Array.isArray(group.standalone) &&
      group.standalone.every(isDownloadLink)
    );
  });
}

function inferPlatform(hint: string): PlatformName | null {
  const normalized = hint.toLowerCase();

  if (
    normalized.includes("apple-darwin") ||
    normalized.includes("darwin") ||
    normalized.includes("mac") ||
    normalized.endsWith(".dmg")
  ) {
    return "macOS";
  }

  if (
    normalized.includes("pc-windows") ||
    normalized.includes("windows-msvc") ||
    normalized.includes("windows") ||
    normalized.includes("win") ||
    normalized.endsWith(".msi") ||
    normalized.endsWith(".exe")
  ) {
    return "Windows";
  }

  if (
    normalized.includes("unknown-linux") ||
    normalized.includes("linux-gnu") ||
    normalized.includes("linux") ||
    normalized.includes(".appimage") ||
    normalized.endsWith(".deb") ||
    normalized.endsWith(".rpm")
  ) {
    return "Linux";
  }

  return null;
}

function inferArch(hint: string): string | null {
  const normalized = hint.toLowerCase();

  if (normalized.includes("aarch64") || normalized.includes("arm64")) {
    return "ARM64";
  }
  if (
    normalized.includes("x86_64") ||
    normalized.includes("x64") ||
    normalized.includes("amd64")
  ) {
    return "x64";
  }

  return null;
}

function detectExtension(fileName: string): string {
  const normalized = fileName.toLowerCase();
  const matched = KNOWN_ARTIFACT_EXTENSIONS.find((ext) =>
    normalized.endsWith(ext),
  );
  if (!matched) {
    return "";
  }
  if (matched === ".appimage") {
    return ".AppImage";
  }
  return matched;
}

function isKnownArtifact(fileName: string): boolean {
  return detectExtension(fileName).length > 0;
}

function inferKind(fileName: string): "installer" | "standalone" | null {
  const normalized = fileName.toLowerCase();

  if (
    normalized.endsWith(".sig") ||
    normalized.endsWith(".json") ||
    normalized.endsWith(".tar.gz") ||
    normalized.endsWith(".zip")
  ) {
    return null;
  }

  if (normalized.includes("_standalone")) {
    return "standalone";
  }
  if (normalized.includes("_installer")) {
    return "installer";
  }

  if (
    normalized.endsWith(".dmg") ||
    normalized.endsWith(".deb") ||
    normalized.endsWith(".rpm") ||
    normalized.endsWith(".msi")
  ) {
    return "installer";
  }

  if (normalized.endsWith(".appimage")) {
    return "standalone";
  }

  if (normalized.endsWith(".exe")) {
    if (
      normalized.includes("pc-windows") ||
      normalized.includes("windows-msvc")
    ) {
      return "standalone";
    }
    return "installer";
  }

  if (
    normalized.includes("apple-darwin") ||
    normalized.includes("darwin") ||
    normalized.includes("unknown-linux") ||
    normalized.includes("linux-gnu") ||
    normalized.includes("linux") ||
    normalized.includes("pc-windows") ||
    normalized.includes("windows") ||
    normalized.includes("windows-msvc")
  ) {
    return "standalone";
  }

  return null;
}

function architectureLabel(platform: PlatformName, arch: string | null): string {
  if (platform === "macOS") {
    if (arch === "ARM64") {
      return "Apple Silicon (ARM64)";
    }
    if (arch === "x64") {
      return "Intel CPU (x64)";
    }
  }

  if (platform === "Windows" && arch === "x64") {
    return "64-bit PC (x64)";
  }

  if (platform === "Linux" && arch === "x64") {
    return "64-bit Linux (x64)";
  }

  if (arch === "ARM64") {
    return "ARM64";
  }

  if (arch === "x64") {
    return "x64";
  }

  return "Compatible build";
}

function labelFromArtifact(
  platform: PlatformName,
  hint: string,
  fileName: string,
): string {
  const arch = inferArch(hint);
  const ext = detectExtension(fileName);
  const friendlyArch = architectureLabel(platform, arch);
  return ext ? `${friendlyArch} (${ext})` : friendlyArch;
}

function emptyDownloads(): PlatformDownloads {
  return {
    macOS: { installers: [], standalone: [] },
    Linux: { installers: [], standalone: [] },
    Windows: { installers: [], standalone: [] },
  };
}

function addUniqueLink(
  map: PlatformDownloads,
  platform: PlatformName,
  kind: "installer" | "standalone",
  link: DownloadLink,
) {
  const bucket =
    kind === "installer" ? map[platform].installers : map[platform].standalone;
  if (bucket.some((existing) => existing.href === link.href)) {
    return;
  }
  bucket.push(link);
}

function withFallback(
  map: PlatformDownloads,
  releaseUrl: string = GITHUB_RELEASES_LATEST,
): PlatformDownloads {
  const installerLink = { label: "View release assets", href: releaseUrl };
  const standaloneLink = { label: "View release assets", href: releaseUrl };
  return {
    macOS: {
      installers: map.macOS.installers.length
        ? map.macOS.installers
        : [installerLink],
      standalone: map.macOS.standalone.length
        ? map.macOS.standalone
        : [standaloneLink],
    },
    Linux: {
      installers: map.Linux.installers.length ? map.Linux.installers : [installerLink],
      standalone: map.Linux.standalone.length
        ? map.Linux.standalone
        : [standaloneLink],
    },
    Windows: {
      installers: map.Windows.installers.length
        ? map.Windows.installers
        : [installerLink],
      standalone: map.Windows.standalone.length
        ? map.Windows.standalone
        : [standaloneLink],
    },
  };
}

function fromGithubRelease(data: GithubRelease): PlatformDownloads {
  const releaseUrl = String(data.html_url || GITHUB_RELEASES_LATEST).trim();
  const map = emptyDownloads();
  let added = 0;

  const assets = Array.isArray(data.assets) ? data.assets : [];
  for (const asset of assets) {
    const name = String(asset?.name || "").trim();
    const href = String(asset?.browser_download_url || "").trim();
    if (!name || !href) {
      continue;
    }

    const kind = inferKind(name);
    if (!kind) {
      continue;
    }
    if (!isKnownArtifact(name) && kind !== "standalone") {
      continue;
    }

    const platform = inferPlatform(name);
    if (!platform) {
      continue;
    }

    addUniqueLink(map, platform, kind, {
      label: labelFromArtifact(platform, name, name),
      href,
    });
    added += 1;
  }

  return added > 0 ? withFallback(map, releaseUrl) : fallbackDownloads(releaseUrl);
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export function usePlatformDownloads() {
  const [platforms, setPlatforms] = useState<PlatformDownloads>(
    fallbackDownloads(),
  );

  useEffect(() => {
    let cancelled = false;

    try {
      const cachedRaw = localStorage.getItem(CACHE_KEY);
      if (cachedRaw) {
        const parsed = JSON.parse(cachedRaw) as CachedDownloads;
        if (
          parsed &&
          typeof parsed.timestamp === "number" &&
          Date.now() - parsed.timestamp < CACHE_TTL &&
          isPlatformDownloads(parsed.platforms)
        ) {
          setPlatforms(parsed.platforms);
          return;
        }
      }
    } catch {
      // Ignore malformed localStorage payloads.
    }

    const resolveDownloads = async () => {
      const githubRelease = await fetchJson<GithubRelease>(GITHUB_RELEASE_API);
      if (githubRelease) {
        const resolved = fromGithubRelease(githubRelease);
        if (cancelled) {
          return;
        }
        setPlatforms(resolved);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            platforms: resolved,
            timestamp: Date.now(),
          } satisfies CachedDownloads),
        );
        return;
      }

      if (cancelled) {
        return;
      }

      const fallback = fallbackDownloads();
      setPlatforms(fallback);
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({
          platforms: fallback,
          timestamp: Date.now(),
        } satisfies CachedDownloads),
      );
    };

    void resolveDownloads();

    return () => {
      cancelled = true;
    };
  }, []);

  return platforms;
}
