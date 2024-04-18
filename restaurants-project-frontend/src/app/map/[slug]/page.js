"use client";
import ReviewForm from "@/app/components/ReviewForm";
import { getRestaurantById } from "@/app/service/restaurants";
import { useQuery } from "@tanstack/react-query";
import Rating from "@mui/material/Rating";
import BlueIcon from "../../components/BlueIcon";
import EmptyIcon from "../../components/EmptyIcon";

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
        <ReviewForm id={id} />
      </div>

      <div>
        {data.reviews.map((review, index) => {
          return (
            <div className="border-b-2 border-blue" key={index}>
              <p className="font-bold">{review.name}</p>
              <p>{review.comments}</p>
              <Rating
                name="rating"
                defaultValue={review.rating}
                icon={<BlueIcon fontSize="inherit" />}
                emptyIcon={<EmptyIcon fontSize="inherit" />}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
