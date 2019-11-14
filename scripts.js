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

/* код перематывания */
function Scrolling() {

    return setInterval(() => {

        if (srcollUp) {
            
            window.scrollBy(0, -20);
        }
        else {

            window.scrollBy(0, 20);
        }
        
    }, 1);
}

var srcollUp;
var IntervalId;
var scrollTarget;

document.querySelector(".upBtn").addEventListener("click", () => { 

    srcollUp = true;
    IntervalId = Scrolling();
});

window.addEventListener("scroll", () => {

    if (pageYOffset <= 0) {

        clearInterval(IntervalId);
    }

    if (scrollTarget != undefined) {

        if (srcollUp) {

            if (scrollTarget.getBoundingClientRect().top > 30) {

                clearInterval(IntervalId);
                scrollTarget = undefined;
            }
        }
        else {

            if (scrollTarget.getBoundingClientRect().top < 30 ||
                mainBlocks.item(mainBlocks.length - 1).getBoundingClientRect().bottom < document.documentElement.clientHeight + 10) {

                clearInterval(IntervalId);
                scrollTarget = undefined;
            }
        }
     }
});

const mainBlocks = document.querySelectorAll("section > *");
const targetBlocks = [
    mainBlocks[0],
    mainBlocks[2],
    mainBlocks[0],
    mainBlocks[1],
    mainBlocks[5],
    mainBlocks[6]];

const uls = document.querySelectorAll(".nav-bar ul");

uls.forEach((UL) => {

    UL.querySelectorAll("li").forEach((LI, indexLI) => {

        LI.addEventListener("click", () => {

            if (pageYOffset + targetBlocks[indexLI].getBoundingClientRect().top < pageYOffset) {
                
                srcollUp = true;
                IntervalId = Scrolling();
            }
            else {
                
                if (pageYOffset + targetBlocks[indexLI].getBoundingClientRect().top > pageYOffset) {

                    srcollUp = false;
                    IntervalId = Scrolling();
                }
            }
            scrollTarget = targetBlocks[indexLI];
        });
    });
});


function myGetBoundingClientRect(s) {

    return document.querySelector(s).getBoundingClientRect();
}

const BENEFITS_START = `benefit-start`;
const BENEFITS_END = `benefit-end`;
const benefs = document.querySelector(".benefits");
const benefits = document.querySelectorAll(".benefits-content > .benefit"); 

const BLOCK_START = `block-start`;
const BLOCK_END = `block-end`;

window.addEventListener("load", () => {

    benefits.forEach(element => {

        element.classList.add(BENEFITS_START);
    });

    mainBlocks[1].classList.add(BLOCK_START);
    mainBlocks[2].classList.add(BLOCK_START);
    mainBlocks[4].classList.add(BLOCK_START);
    document.querySelector(".green-form").classList.add("green-form-start");
});

window.addEventListener("scroll", () => {

    if (document.querySelector(".green-form").getBoundingClientRect().top > document.documentElement.clientHeight) {

        document.querySelector(".green-form").classList.remove("green-form-start");
        document.querySelector(".green-form").classList.add("green-form-end");
    }

    mainBlocks.forEach((elem) => {

        if (elem.getBoundingClientRect().top < document.documentElement.clientHeight - 300 &&
            elem.classList.contains(BLOCK_START)) {

            elem.classList.remove(BLOCK_START);
            elem.classList.add(BLOCK_END);

            setTimeout(() => {

                elem.classList.remove(BLOCK_END);
            }, 10000)
        }
    });

    if (benefs.getBoundingClientRect().top < document.documentElement.clientHeight - 300) {

        benefits.forEach((element, index) => {
    
            setTimeout(() => {

                element.classList.remove(BENEFITS_START);
                element.classList.add(BENEFITS_END);
            }, (index + 1) * (100));
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
