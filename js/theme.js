// ==========================================
// HOMENEST DARK MODE
// ==========================================

const themeToggle =
    document.getElementById("theme-toggle");


// Load saved theme
if (

    localStorage.getItem("theme") === "dark"

) {

    document.body.classList.add("dark");

    if (themeToggle) {

        themeToggle.textContent = "☀️";

    }

}


// Toggle theme
if (themeToggle) {

    themeToggle.onclick = function () {

        document.body.classList.toggle("dark");

        if (

            document.body.classList.contains("dark")

        ) {

            localStorage.setItem(

                "theme",

                "dark"

            );

            themeToggle.textContent = "☀️";

        }

        else {

            localStorage.setItem(

                "theme",

                "light"

            );

            themeToggle.textContent = "🌙";

        }

    };

}