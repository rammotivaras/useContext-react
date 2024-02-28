/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { GlobalContext } from "../context";
import RecipeItem from "../components/RecipeItem";
const Favorites = () => {
  const { favoritesList } = useContext(GlobalContext);

console.log(favoritesList);

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {favoritesList && favoritesList.length > 0 ? (
        favoritesList.map((item, index) => (
          // eslint-disable-next-line react/jsx-key
          <RecipeItem item={item} />
        ))
      ) : (
        <div>
          <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
            Nothing is added in favorites..
          </p>
        </div>
      )}
    </div>
  );
}

export default Favorites ;