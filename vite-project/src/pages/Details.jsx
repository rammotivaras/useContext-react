import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalContext } from "../context";

const Details = () => {
  const { id } = useParams();
  console.log(id, "id");

  const { recipeDetailsData, setRecipeDetailsData, handleAddToFavorite ,favoritesList} = useContext(GlobalContext);

  useEffect(() => {
    async function getRecipeDetails() {
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );
      const data = await res.json();
      console.log(data);
      if (data?.data) {
        setRecipeDetailsData(data?.data);
      }
    }
    getRecipeDetails();
  }, []);
  console.log(recipeDetailsData, "recipeDetailsData");
  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 rounded-xl overflow-hidden group">
          <img
            src={recipeDetailsData?.recipe?.image_url}
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm text-cyan-700 font-medium">
          {recipeDetailsData?.recipe?.publisher}
        </span>
        <h3 className="font-bold text-2xl truncate text-black">
          {recipeDetailsData?.recipe?.title}
        </h3>
        <div>
          <Link to={'/favorites'}>
          <button onClick={()=>handleAddToFavorite(recipeDetailsData?.recipe)} className="p-3 px-8 uppercase rounded-lg text-sm font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white ">
            {
                favoritesList && favoritesList.length > 0 && favoritesList.findIndex(item => item.id ===recipeDetailsData?.recipe?.id ) !== -1 ? 
                "Remove From Favorites" : "Add To Favorites" 

            }
          </button>
          </Link>
        </div>
        <div>
          <span className="text-2xl text-black font-semibold">
            Ingredients:
          </span>
          <ul className="flex flex-col gap-3">
            {recipeDetailsData?.recipe?.ingredients.map(ingredient => 
              // eslint-disable-next-line react/jsx-key
              <li>
                <span className="text-2xl text-black font-semibold">
                  {ingredient.quntity} {ingredient.unit}
                </span>
                <span className="text-2xl text-black font-semibold">{ingredient.description}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Details;
