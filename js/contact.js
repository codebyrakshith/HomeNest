// ==========================================
// CONTACT PAGE
// ==========================================

const urlParams =
    new URLSearchParams(
        window.location.search
    );

const propertyId =
    urlParams.get("id");

const selectedProperty =
    document.getElementById("selected-property");


// ==========================================
// SHOW SELECTED PROPERTY
// ==========================================

if (
    propertyId &&
    properties[propertyId]
) {

    const property =
        properties[propertyId];

    selectedProperty.innerHTML = `

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

            </div>

        </div>

    `;

}


// ==========================================
// CONTACT FORM
// ==========================================

const form =
    document.getElementById("contact-form");

const message =
    document.getElementById("form-message");


form.addEventListener(
    "submit",
    function(event){

        event.preventDefault();

        const enquiry = {

            propertyId:
                propertyId,

            property:
                propertyId
                    ? properties[propertyId].name
                    : "General Enquiry",

            name:
                document.getElementById("name").value,

            email:
                document.getElementById("email").value,

            phone:
                document.getElementById("phone").value,

            message:
                document.getElementById("message").value,

            date:
                new Date().toLocaleString()

        };


        let enquiries =
            JSON.parse(
                localStorage.getItem("enquiries")
            ) || [];

        enquiries.push(
            enquiry
        );

        localStorage.setItem(
            "enquiries",
            JSON.stringify(enquiries)
        );


        message.innerHTML =
            "✅ Your enquiry has been sent successfully!";

        form.reset();

    }
);