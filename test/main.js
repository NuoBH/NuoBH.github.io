const interactiveText_05nuo = document.getElementById("interactive-text-05nuo");
const interactiveText2_05nuo = document.getElementById("interactive-text2-05nuo");
const interactiveTextPlaceholder_05nuo = document.getElementById("placeholder-05nuo");
const interactiveTextPlaceholder2_05nuo = document.getElementById("placeholder2-05nuo");
const headerTitle_05nuo = document.getElementById("header-title-05nuo");
const mainTitle_05nuo = document.getElementById("main-title-05nuo");

const svg_05nuo = document.getElementById("header-svg-05nuo");
const svgContainer_05nuo = svg_05nuo.parentElement;

const widthLimit = 1050;
let whRatio_05nuo = 2.13;

function responsiveInteractivText_05nuo(text, placeholder){
    const boudningRect = placeholder.getBoundingClientRect();
    let posX = boudningRect.x;
    let posY = boudningRect.y;
    
    const hratio = 1.2;
    const wratio = 1.1;
    let width = boudningRect.width * wratio;
    let height = boudningRect.height * hratio;
    let paddingTop = (height - boudningRect.height) / 2;
    posY = posY - paddingTop;

    text.style.width = `${width}px`;
    text.style.setProperty("--face-height-05nuo", `${height}px`);
    text.style.top = `${posY}px`;
    text.style.left = `${posX}px`;

    for(let i = 0; i < text.children.length; i++){
        text.children.item(i).style.paddingTop = `${paddingTop}px`;
    }
}

function responsiveTitleFont(headerTitle, mainTitle){
    const width = window.innerWidth;
    const height = window.innerHeight;

    if(width < widthLimit){
        if(width < height){
            if(width < widthLimit && width >= 600){
                headerTitle.style.setProperty("--title-size-05nuo", "26px");
                mainTitle.style.fontSize="35px";
            }
            else if(width < 600 && width >= 400){
                headerTitle.style.setProperty("--title-size-05nuo", "23px");
                mainTitle.style.fontSize="30px";
            }
            else{
                headerTitle.style.setProperty("--title-size-05nuo", "20px");
                mainTitle.style.fontSize="28px";
            }
        }
        else{
            if(width < widthLimit && width >= 600){
                headerTitle.style.setProperty("--title-size-05nuo", "22px");
                mainTitle.style.fontSize="29px";
            }
            else if(width < 600 && width >= 400){
                headerTitle.style.setProperty("--title-size-05nuo", "17px");
                mainTitle.style.fontSize="22px";
            }
            else{
                headerTitle.style.setProperty("--title-size-05nuo", "10px");
                mainTitle.style.fontSize="15px";
            }
        }
    }
    else{
        if(width < 1200){
            headerTitle.style.setProperty("--title-size-05nuo", "26px");
            mainTitle.style.fontSize="36px";
        }
        else if(width < 1450 && width >= 1200){
            headerTitle.style.setProperty("--title-size-05nuo", "30px");
            mainTitle.style.fontSize="40px";
        }
        else{
            headerTitle.style.setProperty("--title-size-05nuo", "35px");
            mainTitle.style.fontSize="45px";
        }
    } 
}

//switch to horizontal and vertical mode
function switchHeroHV_05nuo(svg){
    const width = window.innerWidth;
    const height = window.innerHeight;

    if(width < widthLimit && width < height){
        whRatio_05nuo = 0.675;
        svg.style.left = "-5%";
    }
    else{
        whRatio_05nuo = 2.13;
        svg.style.left = "calc(45% - max(3.35%, 28px))";
    }
}

//make svg and its container responsive in horizontal mode
function responsiveSVG_05nuo(container, svg, headerTitle){
    const width = window.innerWidth;
    const height = window.innerHeight;

    let w = window.innerWidth;
    let h = w / whRatio_05nuo;

    let top;
    let svgW;
    let svgH;

    if(width < widthLimit && width < height){
        svgW = w * 1.1;
        svgH = svgW / 1.604;
        top = h -  svgH;
    }
    else{
        svgW = w * 0.55;
        svgH = svgW / 1.604;
        top = (h - svgH) / 2;
    }

    //adjust header container height
    if(h >= height){
        h = height;
    }
    if(h < headerTitle.offsetHeight + svgH){
        h = (headerTitle.offsetHeight + svgH) * 1.1;
    }


    if(width < widthLimit && width < height){
        top = h -  svgH;
    }
    else{
        top = (h - svgH) / 2;
    }

    container.style.width = `${w}px`;  
    container.style.height = `${h}px`;
    svg.style.width = `${svgW}px`;
    svg.style.top = `${top}px`;
}

function resizeHero_05nuo(){
    switchHeroHV_05nuo(svg_05nuo)
    responsiveSVG_05nuo(svgContainer_05nuo, svg_05nuo, headerTitle_05nuo);
}

const responsiveFunc_05nuo = function(){
    resizeHero_05nuo();
    responsiveTitleFont(headerTitle_05nuo, mainTitle_05nuo);
    responsiveInteractivText_05nuo(interactiveText_05nuo, interactiveTextPlaceholder_05nuo);
    responsiveInteractivText_05nuo(interactiveText2_05nuo, interactiveTextPlaceholder2_05nuo);
}

responsiveFunc_05nuo();

window.addEventListener("resize", responsiveFunc_05nuo);
