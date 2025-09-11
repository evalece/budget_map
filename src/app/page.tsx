"use client";

import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Banner from "./Banner";
import PlacesCard from "./components/PlacesCard";
import WidgetBox from "./WidgetBox";
import { NearByGooglePlace, Place } from "./lib/NearByGooglePlace";
import "./page.css";

export default function Page() {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await NearByGooglePlace({ storeType: "restaurant", maxCount: 6 });
        console.log("Google Places API result:", data);

        // Normalize to an array no matter what the function returns.
        const normalized: Place[] = Array.isArray(data)
          ? data
          : (data as any)?.results && Array.isArray((data as any).results)
          ? (data as any).results
          : data
          ? [data as Place]
          : [];

        if (alive) setPlaces(normalized);
      } catch (e) {
        console.error("API error:", e);
        if (alive) setError("Failed to load nearby places.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const handleSearch = (text: string) => setQuery(text);

  return (
    <main className="mx-auto max-w-7xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">Let&apos;s grab something</h1>

      {query && <Banner title="Preview Banner" subtitle={`Testing 123: ${query}`} />}
      <SearchBar onSearch={handleSearch} />

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <WidgetBox title="Restaurants">
          {loading && (
            <div className="animate-pulse space-y-3">
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-20 w-full rounded bg-gray-200" />
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          {!loading && !error && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Array.isArray(places) && places.length > 0 ? (
                places.map((place, idx) => (
                  <PlacesCard key={(place.displayName ?? "place") + "-" + idx} place={place} />
                ))
              ) : (
                <p className="text-sm text-gray-500">No places found.</p>
              )}
            </div>
          )}
        </WidgetBox>

        <WidgetBox title="Widget B">
          <p className="text-sm text-gray-700">This is the second widget.</p>
        </WidgetBox>

        <WidgetBox title="Widget C">
          <p className="text-sm text-gray-700">This is the third widget.</p>
        </WidgetBox>

        <WidgetBox title="Widget D">
          <p className="text-sm text-gray-700">This is the fourth widget.</p>
        </WidgetBox>
      </section>
    </main>
  );
}
