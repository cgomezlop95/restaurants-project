"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postRestaurant } from "@/app/service/restaurants";

export default function SignIn() {
  const {
    register,
    control,
    resetField,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setValue("image", event.target.files);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setValue("image", null);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    resetField("image");
  };

  const { mutate, isSuccess, isError } = useMutation({
    mutationKey: "signin",
    mutationFn: postRestaurant,
  });

  const onSubmit = async (data) => {
    if (data.image) {
      console.log("data with image", { ...data, image: data.image[0] });
      mutate({ ...data, image: data.image[0] });
    } else {
      console.log("data", data);
      console.error("Image is required");
    }
  };

  return (
    <main className="flex min-h-screen flex-row gap-10 p-10 items-end">
      {!isSuccess && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-row mt-20 gap-3"
          encType="multipart/form-data"
        >
          <div className="relative border border-black rounded p-3">
            {imagePreview ? (
              <>
                <img
                  src={imagePreview}
                  alt="Image preview"
                  style={{ width: "100%", height: "auto" }}
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="mt-2 bg-red-500 text-white py-2 px-4 rounded"
                >
                  Eliminar
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => document.getElementById("imageInput").click()}
              >
                Añadir imagen
              </button>
            )}

            <input
              type="file"
              id="imageInput"
              onChange={handleChange}
              style={{ visibility: "hidden" }}
            />
          </div>

          <div className="flex-1 flex flex-col">
            <div>
              <label className="font-bold">Nombre de restaurante:</label>
              <input
                type="text"
                placeholder="Nombre del restaurante"
                {...register("name")}
                className="border-white border-2 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="font-bold">Dirección de restaurante:</label>
              <input
                type="text"
                placeholder="Dirección"
                {...register("address")}
                className="border-white border-2 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="font-bold">Descripción del restaurante:</label>
              <textarea
                {...register("cuisine_type")}
                placeholder="Escribe información acerca del restaurante"
              />
            </div>
            <button
              type="submit"
              className="border-white border-2 bg-transparent py-2 px-4 rounded text-left w-40"
            >
              Guardar
            </button>
          </div>
        </form>
      )}

      {isSuccess && <div>Restaurante guardado</div>}
      {isError && <p>Ups, algo salió mal</p>}
    </main>
  );
}
