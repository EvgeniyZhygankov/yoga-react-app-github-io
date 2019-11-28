const icon = document.querySelector(".header-left-top > i")
const navBar = document.querySelector(".nav-bar")
const ul = document.querySelector(".nav-bar ul")

const NAV_BAR_HIDE = `nav-bar-hide`

const DISPLAY_NONE = `display-none`
function Display_change(elem) {
    
    elem.classList.contains(DISPLAY_NONE) ? 
    elem.classList.remove(DISPLAY_NONE) 
                            : 
    elem.classList.add(DISPLAY_NONE)
}

const OVERFLOW_HIDDEN = `overflow-hidden`
function Overflow_hidden_change() {
    
    const main = document.documentElement;
    main.classList.contains(OVERFLOW_HIDDEN) ? 
    main.classList.remove(OVERFLOW_HIDDEN) 
                            : 
    main.classList.add(OVERFLOW_HIDDEN)
}

icon.addEventListener("click", () => {

    if (window.innerWidth < 992) {

        if (navBar.classList.contains(NAV_BAR_HIDE)) {

            navBar.classList.remove(NAV_BAR_HIDE);
            ul.style.opacity = 1;
            ul.style.display = "flex";
        }

        if (getComputedStyle(navBar).left == `-10000px`) {

            navBar.style.left = "0px"
            Overflow_hidden_change()
        }
        else {

            navBar.style.left = `-10000px`
            Overflow_hidden_change()
        }
    }
    else {

        if (!navBar.classList.contains(NAV_BAR_HIDE)) {

            navBar.classList.add(NAV_BAR_HIDE)
            ul.style.opacity = 0
        }
        else {
            ul.style.display = "flex"
            ul.style.opacity = 0
            navBar.classList.remove(NAV_BAR_HIDE);
    
            window.setTimeout(() => {
    
                ul.style.opacity = 1
            }, 1500)
        }
    }
})

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
})

var map

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

window.addEventListener("load", () => {

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

            item.classList.add("active");

            map.setCenter(marksArr[index]);
        });
    });
})



/* код слайдера mark 2 */

const ACTIVE = `active`
const FLEX = `flex`
const nextBtn = document.querySelector("#nextBtn")
const itemIndicators = document.querySelectorAll("#mySlider > ul li")
const items = document.querySelectorAll("#mySlider > .item")
const MAIN = document.querySelector(".main")

var indexCurrentItemGlobal, indexTargetItemGlobal

var sliderIntervalId

const arrayImages = ["man", "women", "tea"]

function GetCurrentItem() {
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        
        if (item.classList.contains(ACTIVE)) {

            return i
        }
    }

    return -1
}

function DisableCurrentItem() {
    
    itemIndicators[indexCurrentItemGlobal].classList.remove(ACTIVE)
    
    items[indexCurrentItemGlobal].classList.remove(ACTIVE)
    items[indexTargetItemGlobal].classList.remove(FLEX)
}

function ChangeSlide(indexTargetItem = -1) {
    
    indexCurrentItemGlobal = GetCurrentItem()

    if (indexCurrentItemGlobal > -1) {

        DisableCurrentItem()
    }

    indexTargetItemGlobal = indexTargetItem == -1 ? 
                            (indexCurrentItemGlobal + 1) % 3 
                                : 
                            indexTargetItem

    itemIndicators[indexTargetItemGlobal].classList.add(ACTIVE)

    items[indexTargetItemGlobal].classList.add(FLEX)
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            items[indexTargetItemGlobal].classList.add(ACTIVE)
        })
    })

    clearInterval(sliderIntervalId)

    AutoSlide()

    MAIN.className = "main"
    MAIN.classList.add(`main-${arrayImages[indexTargetItemGlobal]}`)
}

nextBtn.addEventListener("click", () => {

    ChangeSlide()
})

itemIndicators.forEach((item, index) => {

    item.addEventListener("click", () => {

        ChangeSlide(index)
    })
})

function AutoSlide() {
    
    sliderIntervalId = setInterval(() => {
    
        nextBtn.click()
    }, 10000);
}

nextBtn.click()

/* код слайдера mark 2 */



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
    mainBlocks[3],
    mainBlocks[0],
    mainBlocks[2],
    mainBlocks[6],
    mainBlocks[7]];

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

            icon.click()
        });
    });
});

const BENEFITS_START = `benefit-start`;
const BENEFITS_END = `benefit-end`;

const ANIM_START = `start`;
const ANIM_END = `end`;

const START_FORM = `start-form`;
const END_FORM = `end-form`;

const START_BIG_FORM = `start-big-form`;
const END_BIG_FORM = `end-big-form`;

const benefs = document.querySelector(".benefits");
const benefits = document.querySelectorAll(".benefits-content > .benefit"); 
const directions = document.querySelectorAll(".directions-container > .direction");
const textPs = document.querySelectorAll(".cols3-content > p");
const bigFormFields = document.querySelectorAll(`.big-form-container input, 
                                                .big-form-container textarea, 
                                                .big-form-container p, 
                                                .big-form-container .media`);
const photogallery = mainBlocks[6].querySelectorAll(".photos");

const polinasElements = document.querySelectorAll(".polina > *");
const mapElements = document.querySelectorAll(".map-content > div");
const footersElements = document.querySelectorAll(".footer-content > *");

function RemoveClassFrom(elem, className) {

    setTimeout(() => { 
    
        if (elem.classList.contains(className)) {

            elem.classList.remove(className);
        }
    }, 5000);
}

window.addEventListener("load", () => {

    document.querySelector(".green-form").classList.add(START_FORM);
    setTimeout(() => {

        document.querySelector(".green-form").classList.remove(START_FORM);
        document.querySelector(".green-form").classList.add(END_FORM);

        RemoveClassFrom(document.querySelector(".green-form"), END_FORM);
    }, 1);

    directions.forEach((elem) => {

        elem.classList.add(ANIM_START);
    });

    textPs.forEach((elem) => {

        elem.classList.add(ANIM_START);
    });

    benefits.forEach(element => {

        element.classList.add(BENEFITS_START);
    });

    bigFormFields.forEach((elem) => {

        elem.classList.add(START_BIG_FORM);
    });

    photogallery.forEach(elem => {
        
        elem.classList.add(ANIM_START);
    });

    polinasElements.forEach((elem) => {

        elem.classList.add(BENEFITS_START);
    });

    mapElements.forEach((elem) => {

        elem.classList.add(BENEFITS_START);
    });

    footersElements.forEach((elem) => {

        elem.classList.add(BENEFITS_START);  
    });
});

window.addEventListener("scroll", () => {

    const heightDifference = 200;

    directions.forEach((elem, index) => {

        if (elem.getBoundingClientRect().top < document.documentElement.clientHeight / 2 &&
        elem.classList.contains(ANIM_START)) {

            setTimeout(() => {
                
                elem.classList.remove(ANIM_START);
                elem.classList.add(ANIM_END);
                RemoveClassFrom(elem, ANIM_END);
            }, (index + 1) > 3 ? ((index - 2) * 100) : ((index + 1) * 100));
        }
    });

    textPs.forEach((elem, index) => {
        
        if (elem.getBoundingClientRect().top < document.documentElement.clientHeight / 2 &&
            elem.classList.contains(ANIM_START)) {

            setTimeout(() => {
                
                elem.classList.remove(ANIM_START);
                elem.classList.add(ANIM_END);
                RemoveClassFrom(elem, ANIM_END);
            }, (index + 1) * 100);
        }
    });

    if (benefs.getBoundingClientRect().top < document.documentElement.clientHeight / 2) {

        benefits.forEach((element, index) => {
    
            setTimeout(() => {

                element.classList.remove(BENEFITS_START);
                element.classList.add(BENEFITS_END);
            }, (index + 1) * (100));
        });
    }

    bigFormFields.forEach((elem, index) => {

        if (elem.getBoundingClientRect().top < ((document.documentElement.clientHeight < 992) ? (document.documentElement.clientHeight) : (document.documentElement.clientHeight / 2)) &&
            elem.classList.contains(START_BIG_FORM)) {
        
            setTimeout(() => {
                
                elem.classList.remove(START_BIG_FORM);
                elem.classList.add(END_BIG_FORM);

                RemoveClassFrom(elem, END_BIG_FORM);    
            }, (index + 1) * 10);
        }
    });

    photogallery.forEach((elem, index) => {

        if (elem.getBoundingClientRect().top < document.documentElement.clientHeight / 1.5 &&
            elem.classList.contains(ANIM_START)) {

            setTimeout(() => {
                
                elem.classList.remove(ANIM_START);
                elem.classList.add(ANIM_END);
                RemoveClassFrom(elem, ANIM_END);
            }, (index + 1) > 2 ? ((index - 1) * 100) : ((index + 1) * 100));
        }
    });

    if (polinasElements[0].getBoundingClientRect().top < document.documentElement.clientHeight / 1.5) {

        polinasElements.forEach((elem, index) => {

            setTimeout(() => {

                elem.classList.remove(BENEFITS_START)
                elem.classList.add(BENEFITS_END);
                RemoveClassFrom(elem, BENEFITS_END);
            }, (index + 1) * 100);
        });
    }

    if (mainBlocks[7].getBoundingClientRect().top < document.documentElement.clientHeight - heightDifference) {

        mapElements.forEach((elem, index) => {

            setTimeout(() => {

                elem.classList.remove(BENEFITS_START)
                elem.classList.add(BENEFITS_END);
                RemoveClassFrom(elem, BENEFITS_END);
            }, (index + 1) * 100);
        });

        footersElements.forEach((elem, index) => {

            setTimeout(() => {
                
                elem.classList.remove(BENEFITS_START);
                elem.classList.add(BENEFITS_END);
                RemoveClassFrom(elem, BENEFITS_END);
            }, (index + 1) * 100);
        });
    }
});

/* пролистывание на кнопки в слайдере начало*/

const btns = document.querySelectorAll("#mySlider .item > a")

btns[0].addEventListener("click", () => {

    if (pageYOffset + mainBlocks[5].getBoundingClientRect().top > pageYOffset) {

        srcollUp = false;
        IntervalId = Scrolling();
    }

    scrollTarget = mainBlocks[5];
})

btns[1].addEventListener("click", () => {

    if (pageYOffset + mainBlocks[6].getBoundingClientRect().top > pageYOffset) {

        srcollUp = false;
        IntervalId = Scrolling();
    }

    scrollTarget = mainBlocks[6];
})

btns[2].addEventListener("click", () => {

    if (pageYOffset + mainBlocks[5].getBoundingClientRect().top > pageYOffset) {

        srcollUp = false;
        IntervalId = Scrolling();
    }

    scrollTarget = mainBlocks[5];
})

/* пролистывание на кнопки в слайдере конец */




/* открытие расписания на кнопки direction */

const directBtns =  document.querySelectorAll(".direction-content > a")
const timetable = document.getElementById("timetable")

directBtns.forEach((elem) => {
    
    elem.addEventListener("click",() => {

        Display_change(timetable)

        Overflow_hidden_change()
    })
})

const modalWindows = document.querySelectorAll(".modalWindow")
modalWindows.forEach((elem) => {

    elem.addEventListener("click", (event) => {

        if (event.target == elem ||
            event.target == elem.querySelector(".modalWindow > div")) {

            Display_change(timetable)
            Overflow_hidden_change()
        }
    })
})

/* открытие расписания на кнопки direction */