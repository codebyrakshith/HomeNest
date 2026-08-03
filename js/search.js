// ==========================================
// HOMENEST SEARCH & FILTER
// ==========================================

const searchInput =
    document.getElementById("search-input");

const typeFilter =
    document.getElementById("type-filter");

const priceFilter =
    document.getElementById("price-filter");

const searchButton =
    document.getElementById("search-button");


// ==========================================
// SEARCH FUNCTION
// ==========================================

function searchProperties() {

    const keyword =
        searchInput.value
            .trim()
            .toLowerCase();

    const selectedType =
        typeFilter.value.toLowerCase();

    const selectedPrice =
        priceFilter.value;

    const cards =
        document.querySelectorAll(".property-card");

    cards.forEach(function(card) {

        const location =
            card.dataset.location || "";

        const type =
            (card.dataset.type || "").toLowerCase();

        const price =
            parseInt(card.dataset.price) || 0;


        // ------------------------------
        // CITY
        // ------------------------------

        const matchKeyword =
            location.includes(keyword);


        // ------------------------------
        // TYPE
        // ------------------------------

        const matchType =
            selectedType === "all" ||
            type === selectedType;


        // ------------------------------
        // PRICE
        // ------------------------------

        let matchPrice = true;

        switch (selectedPrice) {

            case "under50":

                matchPrice =
                    price < 50;

                break;

            case "50to80":

                matchPrice =
                    price >= 50 &&
                    price <= 80;

                break;

            case "above80":

                matchPrice =
                    price > 80;

                break;

            default:

                matchPrice = true;

        }


        // ------------------------------
        // SHOW / HIDE
        // ------------------------------

        if (
            matchKeyword &&
            matchType &&
            matchPrice
        ) {

            card.style.display = "block";

        }

        else {

            card.style.display = "none";

        }

    });

}


// ==========================================
// EVENTS
// ==========================================

if (searchButton) {

    searchButton.addEventListener(
        "click",
        searchProperties
    );

}

if (searchInput) {

    searchInput.addEventListener(
        "keyup",
        searchProperties
    );

}

if (typeFilter) {

    typeFilter.addEventListener(
        "change",
        searchProperties
    );

}

if (priceFilter) {

    priceFilter.addEventListener(
        "change",
        searchProperties
    );

}