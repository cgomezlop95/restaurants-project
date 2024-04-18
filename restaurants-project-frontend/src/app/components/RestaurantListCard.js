const RestaurantListCard = ({ name, address, image, comments }) => {
  return (
    <div className="flex flex-row h-[200px] gap-2 m-4">
      <div
        className="w-[200px] h-[200px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${image})`,
          borderRadius: "10px",
        }}
      ></div>

      <div className="h-[200px] flex flex-col">
        <p>Nombre: {name}</p>
        <p>Dirección: {address}</p>

        <div className="flex">
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
