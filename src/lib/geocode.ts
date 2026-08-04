export interface GeocodeResult {
  latitude: number;
  longitude: number;
  displayName?: string;
}

function envUserAgent() {
  return process.env.NEXT_PUBLIC_GEOCODING_USER_AGENT || "referr-platform";
}

export async function geocodeQuery(
  query: string
): Promise<GeocodeResult | null> {
  const trimmed = query.trim();
  if (!trimmed) return null;

  try {
    // Nominatim: OpenStreetMap geocoding (server-side).
    const url =
      "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=" +
      encodeURIComponent(trimmed);

    const res = await fetch(url, {
      headers: {
        "User-Agent": envUserAgent(),
        Accept: "application/json",
      },
      // Cache at edge/server layer; this is fine for demo & repeated queries.
      next: { revalidate: 60 * 60 },
    });

    if (!res.ok) return null;
    const json = (await res.json()) as Array<{
      lat?: string;
      lon?: string;
      display_name?: string;
    }>;

    const first = json[0];
    if (!first?.lat || !first?.lon) return null;

    return {
      latitude: Number(first.lat),
      longitude: Number(first.lon),
      displayName: first.display_name,
    };
  } catch {
    return null;
  }
}

