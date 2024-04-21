import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { addReview } from "../service/restaurants";
import Rating from "@mui/material/Rating";
import BlueIcon from "./BlueIcon";
import EmptyIcon from "./EmptyIcon";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { queryClient } from "../context/ReactQueryClientProvider";

const ReviewForm = ({ id }) => {
  const [rating, setRating] = useState(0);
  let auth = useAuth();

  const {
    register,
    control,
    reset,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isSuccess } = useMutation({
    mutationKey: ["review", id],
    mutationFn: (review_data) => addReview(id, review_data),
    onSuccess: () => {
      queryClient.invalidateQueries(["restaurant", id]);
      reset();
      setRating(0);
      alert("Comentario añadido con éxito");
    },
  });

  const onSubmit = async (data) => {
    try {
      const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
      const currentDate = new Date();
      const month = months[currentDate.getMonth()];
      const day = currentDate.getDate();
      const year = currentDate.getFullYear();
      const formattedDate = `${day} de ${month} de ${year}`;

      const review_data = {
        name: auth.currentUser.username || "anónimo",
        date: formattedDate,
        ...data,
        rating,
      };

      mutate(review_data);
    } catch (error) {
      console.error("Error during onSubmit function:", error);
    }
  };

  return (
    <div className="border border-black m-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col m-3 gap-3"
      >
        <Rating
          name="rating"
          defaultValue={0}
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          precision={1}
          icon={<BlueIcon fontSize="inherit" />}
          emptyIcon={<EmptyIcon fontSize="inherit" />}
        />

        <textarea
          {...register("comments", { required: true })}
          placeholder="Escribe tu comentario sobre el restaurante"
          className="w-full h-32 p-2 placeholder-black"
        />

        <button type="submit" className="border border-black p-4 rounded-lg">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
