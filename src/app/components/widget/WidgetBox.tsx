// app/components/WidgetBox.tsx
// PlacesCard: JXS for each place
// WidgetBox: Container listing 
"use client";
import { ReactNode } from "react";
// Widget.tsx


/* to do : remove NearByGooglePlace API calls  */

import React, { useEffect, useState } from "react";
import PlacesCard from "../cards/PlacesCard";

import { Place,NearByGooglePlace } from "../../lib/NearByGooglePlace";

type Props = { storeType: string; maxResult: number };

export default function Widget({ storeType, maxResult }: Props) {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const results = await NearByGooglePlace({ storeType, maxResult });
        if (!cancelled) setPlaces(results);
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? "Failed to load places");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [storeType, maxResult]);

  if (loading) return <div>Loading nearby places…</div>;
  if (error) return <div role="alert">Error: {error}</div>;
  if (places.length === 0) return <div>No places found nearby.</div>;

  return (
    <ol className="places-list" aria-live="polite">
      {places.map((p) => (
        <li key={p.id}>
          <PlacesCard place={p} />
        </li>
      ))}
    </ol>
  );
}


