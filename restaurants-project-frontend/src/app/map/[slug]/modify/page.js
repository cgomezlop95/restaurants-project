"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getRestaurantById, modifyRestaurant } from "@/app/service/restaurants";
import mapboxgl from "mapbox-gl";
import Link from "next/link";
import CircularIndeterminate from "../../../components/CircularIndeterminate";

const access_token = (mapboxgl.accessToken =
  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN);

export default function ModifyMap({ params }) {
  const id = params.slug;

  const {
    register,
    control,
    resetField,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { data: current_data, isLoading } = useQuery({
    queryKey: ["restaurant", id],
    queryFn: () => getRestaurantById(id),
  });

  const [imagePreview, setImagePreview] = useState();

  useEffect(() => {
    if (current_data?.image) {
      setImagePreview(current_data.image);
      setValue("image", current_data.image);
    }
  }, [current_data]);

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
    mutationKey: ["modify-details", id],
    mutationFn: (updated_data) => modifyRestaurant(id, updated_data),
  });

  const onSubmit = async (data) => {
    const urlAddress = encodeURIComponent(data.address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${urlAddress}.json?access_token=${access_token}`;

    try {
      const response = await fetch(url);
      const geo_data = await response.json();

      if (geo_data.features && geo_data.features.length > 0) {
        const [longitude, latitude] = geo_data.features[0].geometry.coordinates;

        const updated_data = {
          ...data,
          ...(imagePreview !== current_data.image && { image: data.image[0] }),
          latlng: {
            lat: latitude,
            lng: longitude,
          },
        };
        mutate(updated_data);
      } else {
        alert("No se ha encontrado esta dirección.");
      }
    } catch (error) {
      console.error("Error during geocoding:", error);
    }
  };

  if (isLoading) {
    return <CircularIndeterminate />;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-10 p-10">
      <img
        src="/blue-logo-icon.svg"
        alt="Logo"
        className="w-[43.85px] h-[40px]"
      />
      {!isSuccess && !isError && (
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
            />
          </div>

          <div className="flex-1 flex flex-col gap-4">
            <label className="font-bold">Nombre de restaurante:</label>
            <input
              type="text"
              defaultValue={current_data.name}
              {...register("name")}
              className="border border-black placeholder-black rounded px-3 py-2"
            />

            <label className="font-bold">Dirección de restaurante:</label>
            <input
              type="text"
              defaultValue={current_data.address}
              {...register("address")}
              className="border border-black placeholder-black rounded px-3 py-2"
            />

            <label className="font-bold">Descripción del restaurante:</label>
            <textarea
              {...register("cuisine_type")}
              defaultValue={current_data.cuisine_type}
              className="border border-black placeholder-black rounded px-3 py-2"
            />

            <button
              type="submit"
              className="border border-black bg-transparent py-2 px-4 rounded text-center w-[154px]"
            >
              Modificar
            </button>
          </div>
        </form>
      )}

      {isSuccess && (
        <div className="flex flex-col gap-5">
          <p className="font-bold text-[#264BEB]">Restaurante modificado</p>
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
