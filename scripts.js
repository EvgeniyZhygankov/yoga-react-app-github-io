const icon = document.querySelector(".nav-bar-icon");
const navBar = document.querySelector(".nav-bar");
const ul = document.querySelector(".nav-bar ul");

icon.addEventListener("click", () => {
    
    if (navBar.style.width == "0px") {

        navBar.style.width = "739px";
        ul.style.display = "flex";
        ul.style.opacity = "0";
        window.setTimeout(() => {

            ul.style.opacity = "1";
            
        }, 1500);
    } 
    else {
        
        navBar.style.width = "0px";
        ul.style.opacity = "0";
    }
});

ul.addEventListener("transitionend", () => {

    if (ul.style.opacity == "0") {

        ul.style.display = "none";
    }
});