const icon = document.querySelector(".fa-bars");
const navBar = document.querySelector(".nav-bar");
const ul = document.querySelector(".nav-bar ul");

const NAV_BAR_HIDE = "nav-bar-hide";

icon.addEventListener("click", () => {

    if (window.innerWidth < 992) {

        if (navBar.classList.contains(NAV_BAR_HIDE)) {

            navBar.classList.remove(NAV_BAR_HIDE);
            ul.style.opacity = 1;
            ul.style.display = "flex";
        }

        if (getComputedStyle(navBar).top == `-${window.innerHeight}px`) {

            navBar.style.top = "5px";
        }
        else {

            navBar.style.top = `-${window.innerHeight}px`;
        }
    }
    else {

        if (!navBar.classList.contains(NAV_BAR_HIDE)) {

            navBar.classList.add(NAV_BAR_HIDE);
            ul.style.opacity = 0;
        }
        else {
            ul.style.display = "flex";
            ul.style.opacity = 0;
            navBar.classList.remove(NAV_BAR_HIDE);
    
            window.setTimeout(() => {
    
                ul.style.opacity = 1;
            }, 1500);
        }
    }
});

ul.addEventListener("transitionend", () => {
        
    if (window.innerWidth < 992) {

        
    }
    else {

        if (!navBar.classList.contains(NAV_BAR_HIDE)) {

            ul.style.display = "flex";
        }
        else {

            ul.style.display = "none";
        }
    }
});



var map;

const marksArr = [
    [52.387, 31.023],
    [52.4195, 31.0047],
    [52.4482, 30.968],
]

const marksCaptions = [
    'Белица-Сити',
    'Уютный зал в доме',
    'ДК Гомсельмаш'
]

window.onload = () => {

    map = new ymaps.Map("map", {

        center: marksArr[0],
        zoom: 16
    });

    const marks = [];

    for (let i = 0; i < 3; i++) {

        marks[i] = new ymaps.Placemark(marksArr[i], { iconCaption: marksCaptions[i] }, { iconColor: 'red' });
    }

    marks.forEach((item) => {

        map.geoObjects.add(item);
    });

    const itemsMapLegend = document.querySelectorAll(".map-legend ul li");

    itemsMapLegend.forEach((item, index) => {

        item.addEventListener("click", () => {

            itemsMapLegend.forEach((item) => {

                item.classList.remove("active");
            });

            item.className = "active";

            map.setCenter(marksArr[index]);
        });
    });
}

/* код перематывания наверх */
var IntervalId;

document.querySelector(".upBtn").addEventListener("click", () => { 

    IntervalId = setInterval(() => {
        window.scrollBy(0, -150);
    }, 20);
});


window.addEventListener("scroll", () => {

    if (pageYOffset <= 0) {

        clearInterval(IntervalId);
    }
});

const BENEFITS_START = `benefit-start`;
const BENEFITS_END = `benefit-end`;
const benefs = document.querySelector(".benefits");
const benefits = document.querySelectorAll(".benefits-content > .benefit"); 

window.addEventListener("load", () => {

    benefits.forEach(element => {

        element.classList.add(BENEFITS_START);
    });
});

window.addEventListener("scroll", () => {
    
    if (benefs.getBoundingClientRect().top < document.documentElement.clientHeight) {

        benefits.forEach(element => {
    
            element.classList.remove(BENEFITS_START);
            element.classList.add(BENEFITS_END);
        });
    }   
});


/* работающий код скрытия меню 

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

    if (getComputedStyle(ul).opacity == "0") {

        ul.style.display = "none";
    }
});

// работающий код скрытия меню */
