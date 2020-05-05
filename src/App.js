import React, {useEffect, useState} from 'react';
import './App.css'
import Recipes from './Recipes';
const App = () =>{
  const App_Id = "574d025f";
  const App_Key = "3aeb9acbb920634a5e0a37ef0b8ae6c6";
  const exampleRequest = `https://api.edamam.com/search?q=chicken&app_id=${App_Id}&app_key=${App_Key}`;


  const [recipes, setRecipes] = useState([]); 
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken')

  useEffect(()=>{
    getRecipes();
    console.log("we are fetxhing data");
  }, [query])

  const getRecipes = async () =>{
      const Responce = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${App_Id}&app_key=${App_Key}`);
      const data =await Responce.json();
      setRecipes(data.hits)
      console.log(data.hits);
  }

  const updateSearch = e =>{
    setSearch(e.target.value);
    console.log(e.target.value);
  }

  const getsearch = e =>{
    e.preventDefault();
    setQuery(search);
  }

  return (
    <div className="App">
      <form onSubmit={getsearch} className="serch-form">
        <input className="serch-bar" type="text" value={search} onChange={updateSearch}/>
        <button  className="serch-btn" type="submit">search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipes key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image} ingredients={recipe.recipe.ingredients}/>
      ))}
      </div>
    </div>
  );
  
}

export default App;
