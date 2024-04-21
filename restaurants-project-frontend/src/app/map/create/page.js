"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postRestaurant } from "@/app/service/restaurants";
import mapboxgl from "mapbox-gl";
import Link from "next/link";

const access_token = (mapboxgl.accessToken =
  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN);

export default function CreateMap() {
  const {
    register,
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
    mutationKey: "create",
    mutationFn: postRestaurant,
  });

  const onSubmit = async (data) => {
    const urlAddress = encodeURIComponent(data.address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${urlAddress}.json?access_token=${access_token}`;

    try {
      const response = await fetch(url);
      const geo_data = await response.json();

      if (geo_data.features && geo_data.features.length > 0) {
        const [longitude, latitude] = geo_data.features[0].geometry.coordinates;
        mutate({
          ...data,
          image: data.image[0],
          latlng: {
            lat: latitude,
            lng: longitude,
          },
        });
      } else {
        alert("No se ha encontrado esta dirección.");
      }
    } catch (error) {
      console.error("Error during geocoding:", error);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-10 p-10">
      <img
        src="/blue-logo-icon.svg"
        alt="Logo"
        className="w-[43.85px] h-[40px]"
      />
      {!isSuccess && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-row mt-20 gap-3"
          encType="multipart/form-data"
        >
          <div className="flex-1 relative border border-black rounded p-3">
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
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-white text-white py-2 px-4 rounded"
                >
                  Eliminar
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => document.getElementById("imageInput").click()}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 py-2 px-4 rounded"
              >
                Añadir imagen
              </button>
            )}

            <input
              type="file"
              id="imageInput"
              onChange={handleChange}
              style={{ visibility: "hidden" }}
              required
            />
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <label className="font-bold">Nombre de restaurante:</label>
            <input
              type="text"
              placeholder="Nombre del restaurante"
              {...register("name")}
              className="border border-black placeholder-black rounded px-3 py-2"
            />

            <label className="font-bold">Dirección de restaurante:</label>
            <input
              type="text"
              placeholder="Dirección"
              {...register("address")}
              className="border border-black placeholder-black rounded px-3 py-2"
            />

            <label className="font-bold">Descripción del restaurante:</label>
            <textarea
              {...register("cuisine_type")}
              placeholder="Escribe información acerca del restaurante"
              className="border border-black placeholder-black rounded px-3 py-2"
            />

            <button
              type="submit"
              className="border border-black bg-transparent py-2 px-4 rounded text-center w-[154px]"
            >
              Guardar
            </button>
          </div>
        </form>
      )}

      {isSuccess && (
        <div className="flex flex-col gap-5">
          <p className="font-bold text-[#264BEB]">Restaurante guardado</p>
          <Link
            href="/map"
            className="border border-black px-4 py-2 rounded font-bold text-center"
          >
            Ver restaurante
          </Link>
        </div>
      )}

      {isError && (
        <div className="flex flex-col gap-5">
          <p className="font-bold text-[#264BEB]">Ups, algo salió mal</p>
          <Link
            href="/map"
            className="border border-black px-4 py-2 rounded font-bold text-center"
          >
            Volver
          </Link>
        </div>
      )}
      <img src="/blue-logo-icon.svg" alt="Logo" className="w-[43px] h-[40px]" />
    </main>
  );
}
