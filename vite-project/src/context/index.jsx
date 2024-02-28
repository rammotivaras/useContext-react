import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

// eslint-disable-next-line react/prop-types
export default function GlobalState({ children }) {
  const [searchParam, setSearchParam] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesList, setFavoritesList] = useState([]);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
      );
      const data = await res.json();
      console.log(data);
      if (data?.data?.recipes) {
        setRecipeList(data?.data?.recipes);
      }
      setLoading(false);
      setSearchParam("");
      navigate('/')
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSearchParam("");
    }
  }
  function handleAddToFavorite(getCurrentItem){
    console.log(getCurrentItem,'getCurrentItem');
    let cpyFavoriteList = [...favoritesList]
    const index = cpyFavoriteList.findIndex(item => item.id === getCurrentItem.id)
    if(index == -1) {
        cpyFavoriteList.push(getCurrentItem)
    }else{
        cpyFavoriteList.splice(index)
    }
    setFavoritesList(cpyFavoriteList)
  }

  console.log(favoritesList, 'favoritesList');

  return (
    <GlobalContext.Provider
      value={{
        searchParam,
        loading,
        recipeList,
        setSearchParam,
        handleSubmit,
        recipeDetailsData,
        setRecipeDetailsData,
        favoritesList,
        handleAddToFavorite
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
