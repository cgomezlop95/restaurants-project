import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { addReview } from "../service/restaurants";
import Rating from "@mui/material/Rating";
import BlueIcon from "./BlueIcon";
import EmptyIcon from "./EmptyIcon";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ReviewForm = ({ id }) => {
  const [rating, setRating] = useState(0);
  const router = useRouter();

  const {
    register,
    control,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isSuccess } = useMutation({
    mutationKey: ["review", id],
    mutationFn: (review_data) => addReview(id, review_data),
    onSuccess: () => {
      console.log("mutation success");
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
        name: "user name to be updated",
        date: formattedDate,
        ...data,
        rating,
      };

      console.log("review data", review_data);

      mutate(review_data);
    } catch (error) {
      console.error("Error during onSubmit function:", error);
    }
  };

  return (
    <div className="border-1 border-black ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mt-20 gap-3"
      >
        <Rating
          name="rating"
          defaultValue={0}
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
            console.log(newValue);
          }}
          precision={1}
          icon={<BlueIcon fontSize="inherit" />}
          emptyIcon={<EmptyIcon fontSize="inherit" />}
        />

        <input
          type="text"
          placeholder="Escribe tu comentario sobre el restaurante"
          {...register("comments", { required: true })}
        />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ReviewForm;
