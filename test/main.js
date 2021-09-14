const svg_05nuo = document.getElementById("header-svg-05nuo");
const svgContainer_05nuo = svg_05nuo.parentElement;
let whRatio_05nuo = 2.13;

//switch to horizontal and vertical mode
function switchHeroHV_05nuo(svg){
    const width = window.innerWidth;
    const height = window.innerHeight;

    if(width < 1050 && width < height){
        whRatio_05nuo = 0.675;
        svg.style.width = "110%";
        svg.style.left = "-5%";
    }
    else{
        whRatio_05nuo = 2.13;
        svg.style.width = "65%";
        svg.style.left = "calc(35% - max(3.35%, 28px))";
    }
}

//make svg and its container responsive in horizontal mode
function responsiveSVGH_05nuo(container, svg){
    let w = window.innerWidth;
    let h = w / whRatio_05nuo;

    if(h > window.innerHeight){
        h = window.innerHeight;
    }
    container.style.width = `${w}px`;  
    container.style.height = `${h}px`;

    let top = h - parseFloat(window.getComputedStyle(svg).getPropertyValue('height'));
    console.log(h - window.getComputedStyle(svg).getPropertyValue('height'));
    svg.style.top = `${top}px`;
}

//make svg and its container responsive in vertical mode
function responsiveSVGV_05nuo(container, svg){
    
}

function resizeHero_05nuo(){
    switchHeroHV_05nuo(svg_05nuo)
    responsiveSVGH_05nuo(svgContainer_05nuo, svg_05nuo);
}

resizeHero_05nuo();

window.addEventListener("resize", resizeHero_05nuo);
