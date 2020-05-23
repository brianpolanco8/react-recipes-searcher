import React, { useEffect, useState } from "react";
import "./App.css";
import Recipe from "Recipe";
import Loader from "components/Loader";

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  const [isLoading, setIsLoading] = useState(false)

  const getRecipes = async () => {
    setIsLoading(true)
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    setIsLoading(false)
  };

  useEffect(() => {
    getRecipes();
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);

  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (

    <div className="App">
      <form className="search-form" onSubmit={getSearch}>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <Loader isLoading={isLoading}>
        <div className="recipes">
          {recipes.map((recipe, i) => (
            <Recipe
              key={i}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))}
        </div>
      </Loader >
    </div>
  );
};

export default App;
