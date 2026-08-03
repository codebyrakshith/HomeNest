  // ==========================================
// ADMIN PROPERTY MANAGEMENT
// ==========================================

// Check Login
if (localStorage.getItem("adminLoggedIn") !== "true") {

    alert("Please login first.");

    window.location.href = "admin.html";

}


// ==========================================
// LOAD PROPERTIES
// ==========================================

let allProperties = { ...properties };

const storedProperties =
    JSON.parse(localStorage.getItem("properties")) || {};

Object.assign(
    allProperties,
    storedProperties
);


// ==========================================
// ELEMENTS
// ==========================================

const form =
    document.getElementById("property-form");

const propertyList =
    document.getElementById("admin-properties");

const imageInput =
    document.getElementById("image");

const preview =
    document.getElementById("image-preview");

const submitButton =
    form.querySelector("button");

let uploadedImage = "";

let editPropertyId = null;


// ==========================================
// IMAGE PREVIEW
// ==========================================

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        uploadedImage = e.target.result;

        preview.src = uploadedImage;

        preview.style.display = "block";

    };

    reader.readAsDataURL(file);

});


// ==========================================
// DISPLAY PROPERTIES
// ==========================================

function displayProperties() {

    propertyList.innerHTML = "";

    Object.keys(allProperties).forEach(function(id){

        const property =
            allProperties[id];

        propertyList.innerHTML += `

            <div class="property-card">

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

                    <div
                        style="
                            display:flex;
                            gap:10px;
                            margin-top:15px;
                            flex-wrap:wrap;
                        "
                    >

                        <button
                            class="edit-property"
                            data-id="${id}"
                        >
                            ✏️ Edit
                        </button>

                        <button
                            class="remove-property"
                            data-id="${id}"
                        >
                            🗑️ Delete
                        </button>

                    </div>

                </div>

            </div>

        `;

    });


// ==========================================
// DELETE PROPERTY
// ==========================================

    document
        .querySelectorAll(".remove-property")
        .forEach(function(button){

            button.onclick = function(){

                const id =
                    this.dataset.id;

                if(confirm("Delete this property?")){

                    delete allProperties[id];

                    localStorage.setItem(

                        "properties",

                        JSON.stringify(allProperties)

                    );

                    displayProperties();

                }

            };

        });


// ==========================================
// EDIT PROPERTY
// ==========================================

    document
        .querySelectorAll(".edit-property")
        .forEach(function(button){

            button.onclick = function(){

                const id =
                    this.dataset.id;

                const property =
                    allProperties[id];

                editPropertyId = id;

                document.getElementById("name").value =
                    property.name;

                document.getElementById("location").value =
                    property.location.replace("📍 ","");

                document.getElementById("price").value =
                    property.price.replace("₹","");

                document.getElementById("bedrooms").value =
    String(property.bedrooms)
        .replace("🛏️ ","")
        .replace(" Bedrooms","");

                document.getElementById("bathrooms").value =
                    String(property.bathrooms)
                        .replace("🚿 ","")
                        .replace(" Bathrooms","");

                document.getElementById("parking").value =
                    String(property.parking)
                        .replace("🚗 ","")
                        .replace(" Parking","");

                document.getElementById("type").value =
                    property.type;

                document.getElementById("size").value =
                    property.size;

                document.getElementById("description").value =
                    property.description;

                uploadedImage = property.image;

preview.src = property.image;

preview.style.display = "block";

// Don't require a new image while editing
imageInput.required = false;

submitButton.textContent = "💾 Update Property";

                window.scrollTo({

                    top:0,

                    behavior:"smooth"

                });

            };

        });

}
// ==========================================
// ADD / UPDATE PROPERTY
// ==========================================

form.addEventListener("submit", function(e){

    e.preventDefault();

    if(uploadedImage===""){

        alert("Please choose an image.");

        return;

    }

    const priceInput=
        document
        .getElementById("price")
        .value
        .trim();

    const lowerPrice=
        priceInput.toLowerCase();

    let numericPrice=0;

    if(

        lowerPrice.includes("crore") ||

        lowerPrice.includes("cr")

    ){

        numericPrice=
            parseFloat(lowerPrice)*100;

    }

    else{

        numericPrice=
            parseFloat(lowerPrice);

    }


    const propertyData={

        name:
            document.getElementById("name").value,

        location:
            "📍 "+
            document.getElementById("location").value,

        price:
            priceInput.startsWith("₹")
            ? priceInput
            : "₹"+priceInput,

        numericPrice:
            numericPrice,

        image:
            uploadedImage,

        bedrooms:
            "🛏️ "+
            document.getElementById("bedrooms").value+
            " Bedrooms",

        bathrooms:
            "🚿 "+
            document.getElementById("bathrooms").value+
            " Bathrooms",

        parking:
            "🚗 "+
            document.getElementById("parking").value+
            " Parking",

        type:
            document
            .getElementById("type")
            .value
            .toLowerCase(),

        size:
            document.getElementById("size").value,

        description:
            document.getElementById("description").value

    };


    // ===============================
    // UPDATE PROPERTY
    // ===============================

    if(editPropertyId){

        allProperties[editPropertyId]=propertyData;

        alert("✅ Property Updated Successfully");

        editPropertyId=null;

        submitButton.textContent=
            "➕ Save Property";

    }

    // ===============================
    // ADD PROPERTY
    // ===============================

    else{

        const id=
            Date.now().toString();

        allProperties[id]=propertyData;

        alert("✅ Property Added Successfully");

    }


    localStorage.setItem(

        "properties",

        JSON.stringify(allProperties)

    );

   form.reset();

uploadedImage = "";

preview.src = "";

preview.style.display = "none";

imageInput.required = true;

editPropertyId = null;

submitButton.textContent = "➕ Save Property";

    displayProperties();

});


// ==========================================

displayProperties();