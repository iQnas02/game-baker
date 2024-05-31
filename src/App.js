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
    const [pickedIngredients, setPickedIngredients] = useState({ left: false, center: false, right: false });
    const [bakerPosition, setBakerPosition] = useState('start'); // start, center, left, right, cook
    const [cooking, setCooking] = useState(false);

    const handleRecipeClick = (recipe) => {
        const { ingredients, emoji } = recipe;
        const left = ingredients[0];
        const center = ingredients[1];
        const right = ingredients[2];

        setSelectedRecipe({
            emoji,
            ingredients,
        });
        setLeftFood([left]);
        setCenterFood([center]);
        setRightFood([right]);
        setPickedIngredients({ left: false, center: false, right: false });
        setBakerPosition('start');
        setCooking(false);
    };

    const handlePickIngredient = (position) => {
        if (!pickedIngredients[position]) {
            setBakerPosition(position);
            setTimeout(() => {
                setPickedIngredients((prev) => ({ ...prev, [position]: true }));
                setBakerPosition('cook');
                setTimeout(() => {
                    setBakerPosition('start');
                }, 1000); // Delay to move back to start position after reaching cook
            }, 1000); // Animation duration to pick the ingredient
        }
    };

    const handleCook = () => {
        if (pickedIngredients.left && pickedIngredients.center && pickedIngredients.right) {
            setCooking(true);
            alert('Cooking the dish!');
            // Reset the state after cooking
            setTimeout(() => {
                setSelectedRecipe(null);
                setLeftFood([]);
                setCenterFood([]);
                setRightFood([]);
                setPickedIngredients({ left: false, center: false, right: false });
                setBakerPosition('start');
                setCooking(false);
            }, 2000); // Simulate cooking time
        } else {
            alert('Please pick all ingredients first!');
        }
    };

    return (
        <div className="App">
            <header className="header">
                <div className="dishes-done">Dishes done: 0</div>
                <div className="money-received">Money received: 100 $</div>
            </header>
            <div className="container">
                <aside className="sidebar">
                    <h3>Menu</h3>
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
                        <div className="cook">
                            <div className="picked-ingredients">
                                {pickedIngredients.left && <span className="ingredient-emoji">{leftFood[0]}</span>}
                                {pickedIngredients.center && <span className="ingredient-emoji">{centerFood[0]}</span>}
                                {pickedIngredients.right && <span className="ingredient-emoji">{rightFood[0]}</span>}
                            </div>
                            {cooking ? (
                                <p>Cooking...</p>
                            ) : (
                                <button onClick={handleCook}>Cook</button>
                            )}
                        </div>
                        <img
                            src="https://png.pngtree.com/png-vector/20230809/ourmid/pngtree-cartoon-baker-holding-a-plate-of-cookies-vector-png-image_6838409.png"
                            alt="Baker"
                            className={`baker-image ${bakerPosition}`}
                        />
                    </div>
                    <div className="bottom-grid">
                        <div className="leftFood box" onClick={() => handlePickIngredient('left')}>
                            {leftFood.map((ingredient, index) => (
                                <span key={index} className="ingredient-emoji">{ingredient}</span>
                            ))}
                        </div>
                        <div className="centerFood box" onClick={() => handlePickIngredient('center')}>
                            {centerFood.map((ingredient, index) => (
                                <span key={index} className="ingredient-emoji">{ingredient}</span>
                            ))}
                        </div>
                        <div className="rightFood box" onClick={() => handlePickIngredient('right')}>
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
