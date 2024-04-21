const RestaurantListCard = ({ name, address, image, comments }) => {
  return (
    <div className="flex flex-row h-[200px] gap-4 m-6">
      <div
        className="w-[200px] h-[200px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
          borderRadius: "10px",
        }}
      ></div>

      <div className="h-[200px] flex flex-col justify-between gap-5">
        <div className="flex flex-col gap-5">
          <p className="font-bold text-lg">{name}</p>
          <p className="text-sm">{address}</p>
        </div>

        <div className="flex mb-5">
          <img
            src="/five-stars.svg"
            alt="Logo"
            className="w-[192px] h-[32px]"
          />

          {comments === 1 ? (
            <p>({comments} comentario)</p>
          ) : (
            <p>({comments} comentarios)</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantListCard;
