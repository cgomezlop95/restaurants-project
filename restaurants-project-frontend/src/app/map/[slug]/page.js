"use client";
import { getRestaurantById } from "@/app/service/restaurants";
import { useQuery } from "@tanstack/react-query";

export default function Page({ params }) {
  const id = params.slug;
  console.log("id", id);

  const { data, isLoading } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => getRestaurantById(id),
  });

  console.log("data", data);

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div className="flex flex-col m-8">
      <div
        className="bg-cover bg-center h-[600px] flex items-center justify-center"
        style={{ backgroundImage: `url(${data.image})` }}
      >
        <div className="text-white font-bold">
          <p>{data.name}</p>
          <p>{data.address}</p>
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <p>{data.cuisine_type}</p>
        <h3>Escribe tu comentario sobre el restaurante</h3>
      </div>

      <div>
        {data.reviews.map((review) => {
          return (
            <div className="border-b-2 border-blue">
              <p>{review.name}</p>
              <p>{review.comments}</p>
              <p>{review.rating}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
