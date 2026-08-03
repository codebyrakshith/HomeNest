// ==========================================
// ALL PROPERTIES PAGE
// ==========================================

const container =
    document.getElementById("property-container");

const noProperties =
    document.getElementById("no-properties");


// Get properties from localStorage
let savedProperties =
    JSON.parse(localStorage.getItem("properties"));


// If nothing is saved, use properties-data.js
if (!savedProperties) {

    savedProperties = properties;

}


// ==========================================
// DISPLAY PROPERTIES
// ==========================================

function displayAllProperties() {

    container.innerHTML = "";


    const propertyIds =
        Object.keys(savedProperties);


    if (propertyIds.length === 0) {

        noProperties.style.display = "block";

        return;

    }


    noProperties.style.display = "none";


    propertyIds.forEach(function(id) {

        const property =
            savedProperties[id];


        const card =
            document.createElement("div");

        card.className =
            "property-card";


        card.innerHTML = `

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

        `;


        container.appendChild(card);

    });

}


// Display properties
displayAllProperties();