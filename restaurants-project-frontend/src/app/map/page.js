"use client";
import Link from "next/link";
import { getRestaurants } from "../service/restaurants";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function Map() {
  const { data: restaurant_data, isLoading } = useQuery({
    queryKey: ["restaurants"],
    queryFn: getRestaurants,
  });

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-3.7038, 40.4168],
      zoom: 12,
    });

    return () => map.remove();
  }, []);

  // if (isLoading) {
  //   return <div>Loading</div>;
  // }

  return (
    <main className="flex min-h-screen flex-row gap-10 p-10">
      <div id="map" className="flex-1 border rounded-lg"></div>

      <div className="flex-1">
        <ul>
          {restaurant_data?.map((el) => (
            <li key={el.id}>
              <Link href={`/map/${el.id}`}>{el.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
