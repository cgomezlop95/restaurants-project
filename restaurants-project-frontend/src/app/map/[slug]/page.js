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
import { queryClient } from "../../../app/context/ReactQueryClientProvider";

export default function Page({ params }) {
  const id = params.slug;
  const router = useRouter();

  let auth = useAuth();
  const userId = auth.currentUser.id;

  const { data, isLoading } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => getRestaurantById(id),
  });

  const { mutate: deleteMutation } = useMutation({
    mutationKey: ["delete-restaurant", id],
    mutationFn: () => deleteRestaurant(id),
    onSuccess: () => {
      alert("Restaurante eliminado");
      router.push("/map");
    },
    onError: (error) => {
      console.error("mutation on error:", error);
      alert("Ha habido un error al eliminar el restaurante");
      router.push("/map");
    },
  });

  const { mutate: addFavouriteMutation } = useMutation({
    mutationKey: ["add-favourite", id],
    mutationFn: () => addFavourite(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
      alert("Añadido a Mis Favoritos");
      router.push("/map/favourites");
    },
    onError: (error) => {
      alert("No se pudo añadir a favoritos");
      console.error("Add favourite mutation error:", error);
    },
  });

  const { mutate: deleteFavouriteMutation } = useMutation({
    mutationKey: ["delete-favourite", id],
    mutationFn: () => deleteFavourite(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
      alert("Eliminado de Mis Favoritos");
      router.push("/map/favourites");
    },
    onError: (error) => {
      alert("No se pudo eliminar de favoritos");
      console.error("Delete favourite mutation error:", error);
    },
  });

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
                readOnly
              />
            </div>
          );
        })}
      </div>

      <div>
        <Link href={`/map/${id}/modify`}>Editar</Link>
        <button onClick={deleteMutation}>Eliminar</button>
        <button onClick={addFavouriteMutation}>Añadir a Mis Favoritos</button>
        <button onClick={deleteFavouriteMutation}>
          Eliminar de Mis Favoritos
        </button>
      </div>
    </div>
  );
}
