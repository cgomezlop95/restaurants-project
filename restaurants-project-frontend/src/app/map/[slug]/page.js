"use client";
import ReviewForm from "@/app/components/ReviewForm";
import { deleteRestaurant, getRestaurantById } from "@/app/service/restaurants";
import { useMutation, useQuery } from "@tanstack/react-query";
import Rating from "@mui/material/Rating";
import BlueIcon from "../../components/BlueIcon";
import EmptyIcon from "../../components/EmptyIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addFavourite, deleteFavourite } from "@/app/service/user-favourites";
import { useAuth } from "@/app/hooks/useAuth";

export default function Page({ params }) {
  const id = params.slug;
  console.log("id", id);
  const router = useRouter();

  let auth = useAuth();
  console.log("auth current user", auth.currentUser.id);
  const userId = auth.currentUser.id;
  console.log("userId", userId);

  const { data, isLoading } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => getRestaurantById(id),
  });

  const {
    mutate: deleteMutation,
    isSuccess,
    isError,
  } = useMutation({
    mutationKey: ["delete-restaurant", id],
    mutationFn: () => deleteRestaurant(id),
    onSuccess: () => {
      console.log("mutation on success");
      router.push("/map");
    },
    onError: (error) => {
      console.error("mutation on error:", error);
    },
  });

  const { mutate: addFavoriteMutation } = useMutation({
    mutationKey: ["favourite", userId],
    mutationFn: (data) => addFavourite(userId, data),
    onSuccess: () => {
      console.log("mutation on success");
    },
    onError: (error) => {
      console.error("mutation on error:", error);
    },
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

      <div>
        <Link href={`/map/${id}/modify`}>Editar</Link>
        <button onClick={deleteMutation}>Eliminar</button>

        <button onClick={() => addFavourite(userId, data)}>
          Añadir a Mis Favoritos
        </button>
        <button onClick={() => deleteFavourite(userId, data)}>
          Eliminar de mis Favoritos
        </button>
      </div>
    </div>
  );
}
