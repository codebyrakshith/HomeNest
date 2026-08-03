const container =
    document.getElementById("property-container");

function displayProperties() {

    if (!container) return;

    container.innerHTML = "";

    Object.keys(properties).forEach(function(id) {

        const property = properties[id];

        const priceNumber =
            parseInt(
                property.price.replace(/[^\d]/g, "")
            );

        container.innerHTML += `

            <div
                class="property-card"
                data-location="${property.location}"
                data-type="${property.type.toLowerCase()}"
                data-price="${priceNumber}"
            >

                <img
                    src="${property.image}"
                    alt="${property.name}"
                >

                <span class="property-badge">
                    For Sale
                </span>

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

                    <a
                        href="property.html?id=${id}"
                        class="property-button"
                    >
                        View Property
                    </a>

                </div>

            </div>

        `;

    });

}

displayProperties();