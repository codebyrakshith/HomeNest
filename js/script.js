// ==========================================
// HOMENEST HOME PAGE
// ==========================================

const propertyContainer =
    document.getElementById("property-container");


// ==========================================
// DISPLAY PROPERTIES
// ==========================================

function displayProperties() {

    if (!propertyContainer) return;

    propertyContainer.innerHTML = "";

    Object.keys(properties).forEach(function(id) {

        const property =
            properties[id];

        const numericPrice =
            property.numericPrice ||
            parseInt(
                String(property.price).replace(/\D/g, "")
            ) || 0;

        const card =
            document.createElement("div");

        card.className =
            "property-card";

        card.dataset.location =
            property.location.toLowerCase();

        card.dataset.type =
            property.type.toLowerCase();

        card.dataset.price =
            numericPrice;

        card.innerHTML = `

            <img
                src="${property.image}"
                alt="${property.name}"
            >

            <div class="property-info">

                <h3>
                    ${property.name}
                </h3>

                <p>
                    ${property.location}
                </p>

                <h4>
                    ${property.price}
                </h4>

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

                <a
                    href="property.html?id=${id}"
                    class="property-button"
                >
                    View Property
                </a>

            </div>

        `;

        propertyContainer.appendChild(card);

    });

}

displayProperties();