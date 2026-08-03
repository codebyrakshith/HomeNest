// ==========================================
// HOMENEST PROPERTY DATABASE
// ==========================================

const properties = {

    "1": {

        name: "Modern Family House",

        location: "📍 Mangalore, Karnataka",

        price: "₹65 Lakh",

        numericPrice: 65,

        image: "images/modern.jpg",

        bedrooms: "🛏️ 3 Bedrooms",

        bathrooms: "🚿 2 Bathrooms",

        parking: "🚗 1 Parking",

        type: "house",

        size: "1,800 sq.ft",

        description:
            "A beautiful modern family house located in a peaceful area of Mangalore. Perfect for families looking for a spacious and comfortable lifestyle."

    },

    "2": {

        name: "Luxury Villa",

        location: "📍 Bangalore, Karnataka",

        price: "₹95 Lakh",

        numericPrice: 95,

        image: "images/luxury.jpg",

        bedrooms: "🛏️ 4 Bedrooms",

        bathrooms: "🚿 3 Bathrooms",

        parking: "🚗 2 Parking",

        type: "villa",

        size: "2,500 sq.ft",

        description:
            "A luxurious villa with premium interiors, modern facilities and excellent connectivity in Bangalore."

    },

    "3": {

        name: "Beautiful Family Home",

        location: "📍 Mysore, Karnataka",

        price: "₹55 Lakh",

        numericPrice: 55,

        image: "images/family.jpg",

        bedrooms: "🛏️ 3 Bedrooms",

        bathrooms: "🚿 2 Bathrooms",

        parking: "🚗 1 Parking",

        type: "house",

        size: "1,600 sq.ft",

        description:
            "A peaceful family home surrounded by greenery with easy access to schools, hospitals and shopping areas."

    }

};


// ==========================================
// LOAD ADMIN PROPERTIES
// ==========================================

const savedProperties =
    JSON.parse(
        localStorage.getItem("properties")
    );


if (savedProperties) {

    Object.keys(savedProperties).forEach(function(id) {

        const property =
            savedProperties[id];

        // Automatically create numericPrice
        if (
            !property.numericPrice &&
            property.price
        ) {

            property.numericPrice =
                parseInt(
                    property.price.replace(/\D/g, "")
                ) || 0;

        }

        // Make sure type is lowercase
        if (property.type) {

            property.type =
                property.type.toLowerCase();

        }

    });

    Object.assign(
        properties,
        savedProperties
    );

}