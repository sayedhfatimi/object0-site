import { useEffect, useState } from "react";

const CACHE_KEY = "object0-latest-release";
const CACHE_TTL = 1000 * 60 * 15; // 15 minutes

interface CachedRelease {
  version: string;
  url: string;
  timestamp: number;
}

export function useLatestRelease() {
  const [version, setVersion] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed: CachedRelease = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < CACHE_TTL) {
        setVersion(parsed.version);
        setUrl(parsed.url);
        return;
      }
    }

    fetch("https://api.github.com/repos/sayedhfatimi/object0/releases/latest")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data: { tag_name: string; html_url: string }) => {
        const ver = data.tag_name;
        setVersion(ver);
        setUrl(data.html_url);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            version: ver,
            url: data.html_url,
            timestamp: Date.now(),
          }),
        );
      })
      .catch(() => {
        // silent fail — badge just won't show
      });
  }, []);

  return { version, url };
}
