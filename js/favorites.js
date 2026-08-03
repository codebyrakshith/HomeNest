// ==========================================
// HOMENEST FAVORITES
// ==========================================

const favoritesContainer =
    document.getElementById("favorites-container");

const clearButton =
    document.getElementById("clear-favorites");


// ==========================================
// LOAD ALL PROPERTIES
// ==========================================

let allProperties = {};

if (typeof properties !== "undefined") {

    Object.assign(allProperties, properties);

}

// Rename this variable to avoid conflict
const storedProperties =
    JSON.parse(localStorage.getItem("properties")) || {};

Object.assign(allProperties, storedProperties);


// ==========================================
// LOAD FAVORITES
// ==========================================

let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

favorites = favorites.map(String);


// ==========================================
// DISPLAY FAVORITES
// ==========================================

function displayFavorites() {

    if (!favoritesContainer) return;

    favoritesContainer.innerHTML = "";

    if (favorites.length === 0) {

        favoritesContainer.innerHTML = `
            <div class="no-favorites">
                <h2>❤️ No Favorite Properties</h2>
                <p>You haven't added any properties yet.</p>
                <a href="index.html" class="property-button">
                    Browse Properties
                </a>
            </div>
        `;

        return;
    }

    favorites.forEach(function(id){

        const property = allProperties[id];

        if(!property) return;

        const card = document.createElement("div");

        card.className = "property-card";

        card.innerHTML = `
            <img src="${property.image}" alt="${property.name}">

            <div class="property-info">

                <h3>${property.name}</h3>

                <p>${property.location}</p>

                <h4>${property.price}</h4>

                <div class="property-features">
                    <span>${property.bedrooms}</span>
                    <span>${property.bathrooms}</span>
                    <span>${property.parking}</span>
                </div>

                <div style="display:flex;gap:10px;margin-top:15px;flex-wrap:wrap;">

                    <a href="property.html?id=${id}" class="property-button">
                        View Property
                    </a>

                    <button
                        class="remove-favorite"
                        data-id="${id}">
                        Remove
                    </button>

                </div>

            </div>
        `;

        favoritesContainer.appendChild(card);

    });

    document.querySelectorAll(".remove-favorite").forEach(function(button){

        button.onclick = function(){

            const id = this.dataset.id;

            favorites = favorites.filter(function(item){

                return item !== id;

            });

            localStorage.setItem(
                "favorites",
                JSON.stringify(favorites)
            );

            displayFavorites();

        };

    });

}


// ==========================================
// CLEAR ALL
// ==========================================

if(clearButton){

    clearButton.onclick = function(){

        if(favorites.length === 0){

            alert("No favorite properties.");

            return;

        }

        if(confirm("Clear all favorite properties?")){

            favorites = [];

            localStorage.removeItem("favorites");

            displayFavorites();

        }

    };

}


// ==========================================

displayFavorites();