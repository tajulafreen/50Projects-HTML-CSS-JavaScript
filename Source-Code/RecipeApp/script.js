/* eslint-disable no-use-before-define */

const searchRecipes = async () => {
  const query = document.getElementById('search-input').value;
  if (!query) return;

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
    );
    const data = await response.json();
    displayRecipes(data.meals);
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
};

const displayRecipes = (meals) => {
  const recipesContainer = document.getElementById('recipes');
  recipesContainer.innerHTML = '';

  if (!meals) {
    recipesContainer.innerHTML = '<p>No recipes found!</p>';
    return;
  }

  meals.forEach((meal) => {
    const recipe = document.createElement('div');
    recipe.className = 'recipe';
    recipe.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <a href="${meal.strSource}" target="_blank">View Recipe</a>
        `;
    recipesContainer.appendChild(recipe);
  });
};
document.getElementById('search').addEventListener('click', searchRecipes);
