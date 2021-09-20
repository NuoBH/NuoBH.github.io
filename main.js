/*******************************request time out***************************************** */
// requestAnimationFrame() shim by Paul Irish
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function() {
    return  window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback, /* DOMElement */ element){
          window.setTimeout(callback, 1000 / 60);
        };
  })();
  
/**
 * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
 * @param {function} fn The callback function
 * @param {int} delay The delay in milliseconds
 */
  
window.requestTimeout = function(fn, delay) {
    if( !window.requestAnimationFrame       && 
        !window.webkitRequestAnimationFrame && 
        !(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
        !window.oRequestAnimationFrame      && 
        !window.msRequestAnimationFrame)
        return window.setTimeout(fn, delay);
        
    var start = new Date().getTime(),
        handle = new Object();
        
    function loop(){
        var current = new Date().getTime(),
        delta = current - start;
        
        delta >= delay ? fn.call() : handle.value = requestAnimFrame(loop);
    };

    handle.value = requestAnimFrame(loop);
    return handle;
};

const interactiveText_05nuo = document.getElementById("interactive-text-05nuo");
const interactiveText2_05nuo = document.getElementById("interactive-text2-05nuo");
const interactiveTextPlaceholder_05nuo = document.getElementById("placeholder-05nuo");
const interactiveTextPlaceholder2_05nuo = document.getElementById("placeholder2-05nuo");
const headerTitle_05nuo = document.getElementById("header-title-05nuo");
const mainTitle_05nuo = document.getElementById("main-title-05nuo");

const svg_05nuo = document.getElementById("header-svg-05nuo");
const svgContainer_05nuo = svg_05nuo.parentElement;

const widthLimit = 1050;
let whRatio_05nuo = 2.3;

function responsiveInteractivText_05nuo(text, placeholder){
    let posX = placeholder.offsetLeft;
    let posY = placeholder.offsetTop;
    
    const hratio = 1.2;
    const wratio = 1.1;
    let width = placeholder.offsetWidth * wratio;
    let height = placeholder.offsetHeight * hratio;
    let paddingTop = (height - placeholder.offsetHeight) / 2;
    posY = posY - paddingTop;

    text.style.width = `${width}px`;
    text.style.setProperty("--face-height-05nuo", `${height}px`);
    text.style.top = `${posY}px`;
    text.style.left = `${posX}px`;

    for(let i = 0; i < text.children.length; i++){
        text.children.item(i).style.paddingTop = `${paddingTop}px`;
    }
}

function responsiveInteractiveTextLineHeight_05nuo(text1, p1, text2, p2){
    if(Math.abs(p1.offsetTop - p2.offsetTop) >= 1){
        let y = p2.offsetTop + p2.offsetHeight * 0.2;
        text2.style.top = `${y}px`;
    }
    else{
        const b1Right = parseFloat(window.getComputedStyle(text1).getPropertyValue("left")) +
        parseFloat(window.getComputedStyle(text1).getPropertyValue("width"));
        const b2Left = parseFloat(window.getComputedStyle(text2).getPropertyValue("left"))
        if(b1Right - b2Left > 0){
            let x = p2.offsetLeft + p2.offsetWidth * 0.1;
            text2.style.left = `${x}px`;
        }
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
                headerTitle.style.setProperty("--title-size-05nuo", "23px");
                mainTitle.style.fontSize="30px";
            }
        }
        else{
            if(width < widthLimit && width >= 600){
                headerTitle.style.setProperty("--title-size-05nuo", "26px");
                mainTitle.style.fontSize="30px";
            }
            else if(width < 600 && width >= 400){
                headerTitle.style.setProperty("--title-size-05nuo", "23px");
                mainTitle.style.fontSize="24px";
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
        svg.style.left = "-10%";
    }
    else{
        whRatio_05nuo = 2.3;
        svg.style.left = "calc(35% - max(3.35%, 28px))";
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
        svgW = w * 1.2;
        svgH = svgW / 1.604;
    }
    else{
        svgW = w * 0.65;
        svgH = svgW / 1.604;
    }

    //adjust header container height
    // if(h >= height){
    //     h = height;
    // }
    // if(h < headerTitle.offsetHeight + svgH){
        h = (headerTitle.offsetHeight + svgH) * 1.05;
    // }

    if(width < widthLimit && width < height){
        top = h - svgH;
    }
    else{
        // top = (document.getElementById("main-title-05nuo").offsetHeight + parseFloat(window.getComputedStyle(headerTitle).getPropertyValue("padding-top")));
        top = headerTitle.offsetHeight * 1.05;
    }

    container.style.width = `${w}px`;  
    container.style.height = `${h}px`;
    svg.style.width = `${svgW}px`;
    svg.style.top = `${top}px`;
}

function responsiveInteractiveText_05nuo(){
    responsiveInteractivText_05nuo(interactiveText_05nuo, interactiveTextPlaceholder_05nuo);
    responsiveInteractivText_05nuo(interactiveText2_05nuo, interactiveTextPlaceholder2_05nuo);
    requestTimeout(()=>{
        responsiveInteractiveTextLineHeight_05nuo(interactiveText_05nuo, interactiveTextPlaceholder_05nuo, interactiveText2_05nuo, interactiveTextPlaceholder2_05nuo);
    }, 250);
}

function resizeHero_05nuo(){
    switchHeroHV_05nuo(svg_05nuo)
    responsiveSVG_05nuo(svgContainer_05nuo, svg_05nuo, headerTitle_05nuo);
}

function responsiveTitle_05nuo(){
    responsiveTitleFont(headerTitle_05nuo, mainTitle_05nuo);
    responsiveInteractiveText_05nuo();
}

const responsiveFunc_05nuo = function(){
    responsiveTitle_05nuo();
    resizeHero_05nuo();

    requestTimeout(responsiveInteractiveText_05nuo, 20);
}

requestTimeout(responsiveFunc_05nuo, 0);
requestTimeout(responsiveFunc_05nuo, 50);

window.addEventListener("resize", responsiveFunc_05nuo);
