// ==========================================
// PROPERTY DETAILS
// ==========================================

const urlParams =
    new URLSearchParams(
        window.location.search
    );

const propertyId =
    urlParams.get("id");

const property =
    properties[propertyId];

const container =
    document.getElementById("property-details");


// ==========================================
// PROPERTY NOT FOUND
// ==========================================

if (!property) {

    container.innerHTML = `

        <div class="property-not-found">

            <h1>
                😕 Property Not Found
            </h1>

            <p>
                This property does not exist.
            </p>

            <a
                href="index.html"
                class="property-button"
            >
                ← Back to Home
            </a>

        </div>

    `;

}

// ==========================================
// SHOW PROPERTY
// ==========================================

else {

    container.innerHTML = `

        <div class="property-image-section">

            <img
                src="${property.image}"
                alt="${property.name}"
            >

        </div>

        <div class="property-info-section">

            <h1>
                ${property.name}
            </h1>

            <p class="property-location">
                ${property.location}
            </p>

            <h2 class="property-price">
                ${property.price}
            </h2>

            <p class="property-description">
                ${property.description}
            </p>

            <div class="property-features">

                <span>
                    ${property.bedrooms}
                </span>

                <span>
                    ${property.bathrooms}
                </span>

                <span>
                    ${property.parking}
                </span>

            </div>

            <div class="property-extra">

                <div>

                    <strong>
                        Property Type
                    </strong>

                    <span>
                        ${property.type}
                    </span>

                </div>

                <div>

                    <strong>
                        Size
                    </strong>

                    <span>
                        ${property.size}
                    </span>

                </div>

            </div>

            <div class="property-actions">

                <a
                    href="contact.html?id=${propertyId}"
                    class="contact-owner-button"
                >
                    Contact Owner
                </a>

                <button
                    id="favorite-button"
                    class="favorite-button"
                >
                    ❤️ Add to Favorites
                </button>

            </div>

        </div>

    `;

}


// ==========================================
// FAVORITES
// ==========================================

const favoriteButton =
    document.getElementById("favorite-button");

if (favoriteButton) {

    let favorites =
        JSON.parse(
            localStorage.getItem("favorites")
        ) || [];

    favorites =
        favorites.map(String);

    if (
        favorites.includes(
            String(propertyId)
        )
    ) {

        favoriteButton.innerHTML =
            "❤️ Added to Favorites";

    }

    favoriteButton.addEventListener(
        "click",
        function () {

            if (
                favorites.includes(
                    String(propertyId)
                )
            ) {

                alert(
                    "This property is already in your favorites."
                );

                return;

            }

            favorites.push(
                String(propertyId)
            );

            localStorage.setItem(
                "favorites",
                JSON.stringify(favorites)
            );

            favoriteButton.innerHTML =
                "❤️ Added to Favorites";

            alert(
                "Property added to Favorites."
            );

        }
    );

}