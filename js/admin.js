// ==========================================
// ADMIN LOGIN
// ==========================================

const loginForm =
    document.getElementById("login-form");

const loginMessage =
    document.getElementById("login-message");

const adminMenu =
    document.getElementById("admin-menu");

const enquiriesContainer =
    document.getElementById("enquiries-container");

const enquiriesList =
    document.getElementById("enquiries-list");

const viewEnquiries =
    document.getElementById("view-enquiries");


// ==========================================
// CHECK LOGIN STATUS
// ==========================================

if (localStorage.getItem("adminLoggedIn") === "true") {

    loginForm.style.display = "none";

    adminMenu.style.display = "block";

}


// ==========================================
// LOGIN
// ==========================================

loginForm.addEventListener(
    "submit",
    function(event){

        event.preventDefault();

        const username =
            document
                .getElementById("username")
                .value;

        const password =
            document
                .getElementById("password")
                .value;


        if(

            username === "admin"

            &&

            password === "admin123"

        ){

            localStorage.setItem(
                "adminLoggedIn",
                "true"
            );

            loginMessage.innerHTML =
                "✅ Login Successful";

            loginForm.style.display =
                "none";

            adminMenu.style.display =
                "block";

        }

        else{

            loginMessage.innerHTML =
                "❌ Invalid Username or Password";

        }

    }
);

// ==========================================
// VIEW ENQUIRIES
// ==========================================

viewEnquiries.addEventListener(
    "click",
    function(){

        enquiriesContainer.style.display =
            "block";

        loadEnquiries();

    }
);


// ==========================================
// LOAD ENQUIRIES
// ==========================================

function loadEnquiries(){

    const enquiries =
        JSON.parse(
            localStorage.getItem("enquiries")
        ) || [];

    enquiriesList.innerHTML = "";

    if(enquiries.length===0){

        enquiriesList.innerHTML = `

            <p>No enquiries received.</p>

        `;

        if(enquiryCount){

            enquiryCount.textContent = 0;

        }

        return;

    }

    enquiries.forEach(function(item,index){

        enquiriesList.innerHTML += `

            <div class="admin-card">

                <h3>
                    ${item.property}
                </h3>

                <p>
                    <strong>Name:</strong>
                    ${item.name}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${item.email}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${item.phone}
                </p>

                <p>
                    <strong>Message:</strong>
                    ${item.message}
                </p>

                <p>
                    <strong>Date:</strong>
                    ${item.date}
                </p>

                <button
                    class="delete-enquiry"
                    data-index="${index}"
                >
                    🗑 Delete Enquiry
                </button>

            </div>

        `;

    });


    document
        .querySelectorAll(".delete-enquiry")
        .forEach(function(button){

            button.onclick = function(){

                if(confirm("Delete this enquiry?")){

                    const index =
                        this.dataset.index;

                    enquiries.splice(index,1);

                    localStorage.setItem(

                        "enquiries",

                        JSON.stringify(enquiries)

                    );

                    if(enquiryCount){

                        enquiryCount.textContent =
                            enquiries.length;

                    }

                    loadEnquiries();

                }

            };

        });

}
// ==========================================
// LOGOUT
// ==========================================

const logoutButton =
    document.getElementById("logout-button");

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function(){

            if(confirm("Do you want to logout?")){

                localStorage.removeItem(
                    "adminLoggedIn"
                );

                alert(
                    "✅ Logged out successfully."
                );

                window.location.href =
                    "admin.html";

            }

        }
    );

}
// ==========================================
// DASHBOARD COUNTS
// ==========================================

const propertyCount = document.getElementById("property-count");
const favoriteCount = document.getElementById("favorite-count");
const enquiryCount = document.getElementById("enquiry-count");

if (propertyCount) {

    const defaultProperties =
        typeof properties !== "undefined"
            ? Object.keys(properties).length
            : 0;

    const savedProperties =
        JSON.parse(localStorage.getItem("properties")) || {};

    propertyCount.textContent =
        defaultProperties + Object.keys(savedProperties).length;

}

if (favoriteCount) {

    const favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    favoriteCount.textContent =
        favorites.length;

}

if (enquiryCount) {

    const enquiries =
        JSON.parse(localStorage.getItem("enquiries")) || [];

    enquiryCount.textContent =
        enquiries.length;

}