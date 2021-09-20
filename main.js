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
/***************************************** */
function testBrowserSupportPassive_05nuo(){
    let supportsPassive = false;

    // modern Chrome requires { passive: false } when adding event
    //test if browser supports passive option
    try {
        let options = {
            get passive(){
                supportsPassive = true;
                return false;
            }
        }  
        window.addEventListener("test", null, options);
        window.removeEventListener("test", null, options);
    } catch(e) {
        supportsPassive = false;
    }

    return supportsPassive;
}

const supportPassive_05nuo = testBrowserSupportPassive_05nuo();
const eventListenerOption_05nuo = supportPassive_05nuo ? { passive: false } : false;

class ToggleScroll_05nuo{
    constructor(){
        this.hasDisabled = false;
        // left: 37, up: 38, right: 39, down: 40,
        // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
        this.keys = {37: 1, 38: 1, 39: 1, 40: 1};
        
        this.wheelOpt = supportPassive_05nuo ? { passive: false } : false;
        this.wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
    }

    preventDefault(e) {
        e.preventDefault();
        window.scrollTo(0, fullHeader_05nuo.offsetHeight + fullHeader_05nuo.offsetTop);
    }
      
    preventDefaultForScrollKeys(e) {
        if (this.keys[e.keyCode]) {
            preventDefault(e);
            window.scrollTo(0, fullHeader_05nuo.offsetHeight + fullHeader_05nuo.offsetTop);
            return false;
        }
    }
      
    // call this to Disable
    disableScroll() {
        if(!this.hasDisabled){
            window.addEventListener('DOMMouseScroll', this.preventDefault, false); // older FF
            window.addEventListener(this.wheelEvent, this.preventDefault, this.wheelOpt); // modern desktop
            window.addEventListener('touchmove', this.preventDefault, this.wheelOpt); // mobile
            window.addEventListener('keydown', this.preventDefaultForScrollKeys.bind(this), false);
            this.hasDisabled = true;
        }
    }
    
    // call this to Enable
    enableScroll() {
        if(this.hasDisabled){
            window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
            window.removeEventListener(this.wheelEvent, this.preventDefault, this.wheelOpt); 
            window.removeEventListener('touchmove', this.preventDefault, this.wheelOpt);
            window.removeEventListener('keydown', this.preventDefaultForScrollKeys.bind(this), false);
            this.hasDisabled = false;
        }
    }
}

const toggleScroll_05nuo = new ToggleScroll_05nuo();
/****************************************** */

const interactiveText_05nuo = document.getElementById("interactive-text-05nuo");
const interactiveText2_05nuo = document.getElementById("interactive-text2-05nuo");
const interactiveTextPlaceholder_05nuo = document.getElementById("placeholder-05nuo");
const interactiveTextPlaceholder2_05nuo = document.getElementById("placeholder2-05nuo");
const headerTitle_05nuo = document.getElementById("header-title-05nuo");
const mainTitle_05nuo = document.getElementById("main-title-05nuo");

const svg_05nuo = document.getElementById("header-svg-05nuo");
const fullHeader_05nuo = svg_05nuo.parentElement;

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

function responsiveHeaderTitle(headerTitle){
    const width = window.innerWidth;
    const height = window.innerHeight;
    if(width < widthLimit){
        if(width < height){
            headerTitle.style.width = "100%";
            headerTitle.style.float = "left";
            headerTitle.style.background = "none";
        }
    }
    else{
        headerTitle.style.width = "35%";
        headerTitle.style.float = "right";
        headerTitle.style.background = "linear-gradient(180deg, rgba(76, 180, 135, 0.95) 5%, rgba(90, 199, 152, 0.5) 100%)";
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
            mainTitle.style.fontSize="38px";
        }
        else{
            headerTitle.style.setProperty("--title-size-05nuo", "34px");
            mainTitle.style.fontSize="39px";
        }
    } 
}

//make svg and its container responsive in horizontal mode
function responsiveSVG_05nuo(container, svg, headerTitle){
    const width = window.innerWidth;
    const height = window.innerHeight;
    const minSVGW_V = 575;
    const minSVGW_H = 1170;

    let w = window.innerWidth;
    let h = height;
    let top;
    let left;
    let svgW;
    let svgH;

    if(width < widthLimit && width < height){
        svgW = w * 1.2;
        if(svgW < minSVGW_V){
            svgW = minSVGW_V;
        }
        svgH = svgW / 1.604;

        top = (headerTitle.offsetHeight + parseFloat(window.getComputedStyle(headerTitle).getPropertyValue("padding-top"))) * 1.2;
        left = (svgW - w) / -2.5;
    }
    else{
        svgW = w * 0.82;
        if(svgW < minSVGW_H){
            svgW = minSVGW_H;
        }
        svgH = svgW / 1.604;

        top = headerTitle.offsetHeight * 1.05;
        if(top > (h - svgH)){
            top = Math.max(80, h-svgH * 1.5);
        }
        left = (w - svgW) / 2;
    }

    container.style.width = `${w}px`;  
    container.style.height = `${h}px`;
    svg.style.width = `${svgW}px`;
    svg.style.top = `${top}px`;
    svg.style.left = `${left}px`;
}

function responsiveInteractiveText_05nuo(){
    responsiveInteractivText_05nuo(interactiveText_05nuo, interactiveTextPlaceholder_05nuo);
    responsiveInteractivText_05nuo(interactiveText2_05nuo, interactiveTextPlaceholder2_05nuo);
    requestTimeout(()=>{
        responsiveInteractiveTextLineHeight_05nuo(interactiveText_05nuo, interactiveTextPlaceholder_05nuo, interactiveText2_05nuo, interactiveTextPlaceholder2_05nuo);
    }, 250);
}

function resizeHero_05nuo(){
    responsiveSVG_05nuo(fullHeader_05nuo, svg_05nuo, headerTitle_05nuo);
}

function responsiveTitle_05nuo(){
    responsiveHeaderTitle(headerTitle_05nuo);
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

/** title text rotate animation*/
let titleAnim_05nuo;
const titleAnimInterval_05nuo = 2300;
let titleRotationL_05nuo = 0
let titleRotationR_05nuo = 0
let currentTitleRotation_05nuo = 0;
let hasResetTransitionTitleAnim_05nuo = true;
let currentTimeTitleAnim_05nuo = undefined;

function titleRotate_05nuo(timestamp){
    if(currentTimeTitleAnim_05nuo == undefined){
        currentTimeTitleAnim_05nuo = timestamp;
    }
    let elapse = timestamp - currentTimeTitleAnim_05nuo;
    if(elapse >= titleAnimInterval_05nuo){
        currentTimeTitleAnim_05nuo = timestamp;
        currentTitleRotation_05nuo = (currentTitleRotation_05nuo + 1) % 4;

        //reset rotation degree without rendered transition
        if(titleRotationL_05nuo >= 360){
            interactiveText_05nuo.style.setProperty("--transform-transition-time-05nuo", "0s");
            interactiveText2_05nuo.style.setProperty("--transform-transition-time-05nuo", "0s");
            titleRotationL_05nuo = titleRotationL_05nuo % 360;
            titleRotationR_05nuo = titleRotationR_05nuo % 360;
            interactiveText_05nuo.style.setProperty("--cube-rotate-05nuo", `${titleRotationL_05nuo}deg`);
            interactiveText2_05nuo.style.setProperty("--cube-rotate2-05nuo", `${titleRotationR_05nuo}deg`);
            currentTimeTitleAnim_05nuo = timestamp - titleAnimInterval_05nuo + 10;
            hasResetTransitionTitleAnim_05nuo = false;
        }
        else{
            if(!hasResetTransitionTitleAnim_05nuo){
                interactiveText_05nuo.style.setProperty("--transform-transition-time-05nuo", "1s");
                interactiveText2_05nuo.style.setProperty("--transform-transition-time-05nuo", "1s");
                hasResetTransitionTitleAnim_05nuo = true;
            }
            titleRotationL_05nuo += 90;
            titleRotationR_05nuo -= 90;

            interactiveText_05nuo.style.setProperty("--cube-rotate-05nuo", `${titleRotationL_05nuo}deg`);
            interactiveText2_05nuo.style.setProperty("--cube-rotate2-05nuo", `${titleRotationR_05nuo}deg`);
        }
    }

    cancelAnimationFrame(titleAnim_05nuo);
    titleAnim_05nuo = requestAnimFrame(titleRotate_05nuo);
}

titleAnim_05nuo = requestAnimFrame(titleRotate_05nuo);

/**scroll controls */

// let sumWheelDelta = 0;
// let haveStoppedWheel = false;

// window.addEventListener("wheel", (e) =>{
//     if((window.scrollY + window.innerHeight) >= ((fullHeader_05nuo.offsetHeight + fullHeader_05nuo.offsetTop)/2)){
//         console.log("!!")
//         toggleScroll_05nuo.disableScroll();
//         sumWheelDelta += e.deltaY;
//         if(sumWheelDelta >= 1000){
//             console.log(sumWheelDelta)
//             sumWheelDelta = 0;
//         }
//     }
// }, eventListenerOption_05nuo);

