"use client";
import Link from "next/link";
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import RestaurantListCard from "../../components/RestaurantListCard";
import { useAuth } from "../../../app/hooks/useAuth";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function FavouriteMap() {
  let auth = useAuth();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-3.6846, 40.4153],
      zoom: 14,
    });

    map.on("load", function () {
      auth.currentUser.favourite_restaurants.forEach((restaurant) => {
        const coordinates = [restaurant.latlng.lng, restaurant.latlng.lat];
        new mapboxgl.Marker({ color: "#264BEB" })
          .setLngLat(coordinates)
          .addTo(map);
      });
    });

    return () => map.remove();
  }, [auth.currentUser.favourite_restaurants]);

  return (
    <main className="flex min-h-screen flex-row gap-10 p-10">
      <div id="map" className="flex-1 border rounded-lg h-[942px]"></div>
      <div className="flex-1">
        <h1 className="text-center font-bold m-4 text-lg">Mis Favoritos</h1>
        <ul>
          {auth.currentUser.favourite_restaurants.map((el) => (
            <li key={el.id}>
              <Link href={`/map/${el.id}`}>
                <RestaurantListCard
                  name={el.name}
                  address={el.address}
                  image={el.image}
                  comments={el.reviews.length}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
