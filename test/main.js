const interactiveText_05nuo = document.getElementById("interactive-text-05nuo");
const interactiveText2_05nuo = document.getElementById("interactive-text2-05nuo");
const interactiveTextPlaceholder_05nuo = document.getElementById("placeholder-05nuo");
const interactiveTextPlaceholder2_05nuo = document.getElementById("placeholder2-05nuo");

const svg_05nuo = document.getElementById("header-svg-05nuo");
const svgContainer_05nuo = svg_05nuo.parentElement;
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
    posY = posY - paddingTop * 3;

    text.style.width = `${width}px`;
    text.style.setProperty("--face-height-05nuo", `${height}px`);
    text.style.top = `${posY}px`;
    text.style.left = `${posX}px`;

    for(let i = 0; i < text.children.length; i++){
        text.children.item(i).style.paddingTop = `${paddingTop}px`;
    }
}


//switch to horizontal and vertical mode
function switchHeroHV_05nuo(svg){
    const width = window.innerWidth;
    const height = window.innerHeight;

    if(width < 1050 && width < height){
        whRatio_05nuo = 0.675;
        svg.style.left = "-5%";
    }
    else{
        whRatio_05nuo = 2.13;
        svg.style.left = "calc(47% - max(3.35%, 28px))";
    }
}

//make svg and its container responsive in horizontal mode
function responsiveSVG_05nuo(container, svg){
    const width = window.innerWidth;
    const height = window.innerHeight;

    let w = window.innerWidth;
    let h = w / whRatio_05nuo;

    if(h > window.innerHeight){
        h = window.innerHeight;
    }
    container.style.width = `${w}px`;  
    container.style.height = `${h}px`;

    let top;
    let svgW;

    if(width < 1050 && width < height){
        svgW = w * 1.1;
        top = h - svgW / 1.604;
    }
    else{
        svgW = w * 0.53;
        top = (h - (svgW / 1.604)) / 2;
    }

    svg.style.width = `${svgW}px`;
    svg.style.top = `${top}px`;
}

function resizeHero_05nuo(){
    switchHeroHV_05nuo(svg_05nuo)
    responsiveSVG_05nuo(svgContainer_05nuo, svg_05nuo);
}

const responsiveFunc_05nuo = function(){
    resizeHero_05nuo();
    responsiveInteractivText_05nuo(interactiveText_05nuo, interactiveTextPlaceholder_05nuo);
    responsiveInteractivText_05nuo(interactiveText2_05nuo, interactiveTextPlaceholder2_05nuo);
}

responsiveFunc_05nuo();

window.addEventListener("resize", responsiveFunc_05nuo);
