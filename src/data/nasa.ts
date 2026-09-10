// NASA's Astronomy Picture of the Day (APOD) API.
// DEMO_KEY is NASA's public shared key — no signup needed, but shared
// across everyone using it, so it's capped at 30 requests/hour and
// 50/day. Fine for a class project; swap in a real key from
// api.nasa.gov if this ever needs to run at real scale.
const NASA_API_KEY = 'DEMO_KEY';
const NASA_APOD_URL = 'https://api.nasa.gov/planetary/apod?api_key=' + NASA_API_KEY;

export type AstronomyPicture = {
  title: string;
  explanation: string;
  url: string;
  date: string;
};

export async function fetchAstronomyPicture(): Promise<AstronomyPicture> {
  const response = await fetch(NASA_APOD_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch astronomy picture');
  }
  const data = await response.json();
  return {
    title: data.title,
    explanation: data.explanation,
    url: data.url,
    date: data.date,
  };
}