import React, { useState } from 'react';

import './App.css';

function getRandomPrice() {
    return (Math.random() * (10 - 1) + 1).toFixed(2); // Random price between 1 and 10
}

const recipes = [
    { name: "Chicken Soup", emoji: "🍲", ingredients: ["🥦", "🥒", "🍗"] },
    { name: "Salad", emoji: "🥗", ingredients: ["🥬", "🫛", "🌶"] },
    { name: "Spaghetti", emoji: "🍝", ingredients: ["🧀", "🥩", "🌽"] },
    { name: "Sushi", emoji: "🍣", ingredients: ["🍤", "🧀", "🥡"] },
    { name: "Pizza", emoji: "🍕", ingredients: ["🍤", "🥩", "🫓"] },
    { name: "Burger", emoji: "🍔", ingredients: ["🥩", "🍤", "🧀"] },
    { name: "Ice Cream", emoji: "🍨", ingredients: ["🍓", "🍉", "🍼"] },
    { name: "Pancakes", emoji: "🥞", ingredients: ["🍩", "🥝", "🍞"] }
];
const allIngredients = recipes.reduce((acc, recipe) => {
    acc.push(...recipe.ingredients.map(ingredient => ({
        name: ingredient,
        emoji: recipe.emoji,
        price: getRandomPrice()
    })));
    return acc;
}, []);


function App() {



    const [leftFood, setLeftFood] = useState([]);
    const [centerFood, setCenterFood] = useState([]);
    const [rightFood, setRightFood] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const handleRecipeClick = (recipe) => {
        const { ingredients, emoji } = recipe;
        const left = ingredients[0];
        const center = ingredients[1];
        const right = ingredients[2];

        setSelectedRecipe({
            emoji,
            ingredients,
        })

        setLeftFood([left]);
        setCenterFood([center]);
        setRightFood([right]);
    };

    return (
        <div className="App">
            <header className="header">
                <div className="dishes-done">Dishes done: 0</div>
                <div className="money-received">Money received: 100 $</div>
            </header>
            <div className="container">
                <aside className="sidebar">
                    <h3>Meniu</h3>
                    <ul className="recipe-list">
                        {recipes.map((recipe, index) => (
                            <li key={index} className="recipe-item" onClick={() => handleRecipeClick(recipe)}>
                                <div className="recipe-title">
                                    <span className="emoji">{recipe.emoji}</span> {recipe.name}
                                </div>
                                <div className="ingredients">
                                    {recipe.ingredients.map((ingredient, i) => (
                                        <span key={i} className="ingredient-emoji">{ingredient}</span>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </aside>
                <main className="main-content">
                    <div className="content-center">
                        <div className="mainRecept">
                            {selectedRecipe && (
                                <>
                                    <span className="emoji">{selectedRecipe.emoji}</span>
                                    {selectedRecipe.ingredients.map((ingredient, i) => (
                                        <span key={i} className="ingredient-emoji">{ingredient}</span>
                                    ))}
                                </>
                            )}
                        </div>
                        <div className="cook">This is the main content area.</div>
                        <img
                            src="https://png.pngtree.com/png-vector/20230809/ourmid/pngtree-cartoon-baker-holding-a-plate-of-cookies-vector-png-image_6838409.png"
                            alt="Baker"
                            className="baker-image"
                        />
                    </div>
                    <div className="bottom-grid">
                        <div className="leftFood box">
                            {leftFood.map((ingredient, index) => (
                                <span key={index} className="ingredient-emoji">{ingredient}</span>
                            ))}
                        </div>
                        <div className="centerFood box">
                            {centerFood.map((ingredient, index) => (
                                <span key={index} className="ingredient-emoji">{ingredient}</span>
                            ))}
                        </div>
                        <div className="rightFood box">
                            {rightFood.map((ingredient, index) => (
                                <span key={index} className="ingredient-emoji">{ingredient}</span>
                            ))}
                        </div>
                    </div>

                </main>
                <div className="sidebar-right">
                    <h3>Ingredients shop</h3>
                    <ul className="ingredient-list">
                        {allIngredients.map((ingredient, index) => (
                            <li key={index}>
                                <span className="ingredient-emoji">{ingredient.emoji}</span>
                                <span className="ingredient-emoji">{ingredient.name}</span>
                                <span className="ingredient-price">${ingredient.price}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <footer className="footer">
                <p>&copy; 2024 My Application</p>
            </footer>
        </div>
    );
}

export default App;
