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

// class ToggleScroll_05nuo{
//     constructor(){
//         this.hasDisabled = false;
//         // left: 37, up: 38, right: 39, down: 40,
//         // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
//         this.keys = {37: 1, 38: 1, 39: 1, 40: 1};
        
//         this.wheelOpt = supportPassive_05nuo ? { passive: false } : false;
//         this.wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';
//     }

//     preventDefault(e) {
//         e.preventDefault();
//         window.scrollTo(0, fullHeader_05nuo.offsetHeight + fullHeader_05nuo.offsetTop);
//     }
      
//     preventDefaultForScrollKeys(e) {
//         if (this.keys[e.keyCode]) {
//             preventDefault(e);
//             window.scrollTo(0, fullHeader_05nuo.offsetHeight + fullHeader_05nuo.offsetTop);
//             return false;
//         }
//     }
      
//     // call this to Disable
//     disableScroll() {
//         if(!this.hasDisabled){
//             window.addEventListener('DOMMouseScroll', this.preventDefault, false); // older FF
//             window.addEventListener(this.wheelEvent, this.preventDefault, this.wheelOpt); // modern desktop
//             window.addEventListener('touchmove', this.preventDefault, this.wheelOpt); // mobile
//             window.addEventListener('keydown', this.preventDefaultForScrollKeys.bind(this), false);
//             this.hasDisabled = true;
//         }
//     }
    
//     // call this to Enable
//     enableScroll() {
//         if(this.hasDisabled){
//             window.removeEventListener('DOMMouseScroll', this.preventDefault, false);
//             window.removeEventListener(this.wheelEvent, this.preventDefault, this.wheelOpt); 
//             window.removeEventListener('touchmove', this.preventDefault, this.wheelOpt);
//             window.removeEventListener('keydown', this.preventDefaultForScrollKeys.bind(this), false);
//             this.hasDisabled = false;
//         }
//     }
// }
// const toggleScroll_05nuo = new ToggleScroll_05nuo();

function lerp_05nuo(v1, v2, speed, delta){
    return v1 + (v2 - v1) * (1 - Math.pow(speed, delta));
}

/************************************************************************************************************* 
 ***************************** responsive feature for svg, title div and texts ******************************* 
 ************************************************************************************************************* 
*/

const interactiveText_05nuo = document.getElementById("interactive-text-05nuo");
const interactiveText2_05nuo = document.getElementById("interactive-text2-05nuo");
const interactiveTextPlaceholder_05nuo = document.getElementById("placeholder-05nuo");
const interactiveTextPlaceholder2_05nuo = document.getElementById("placeholder2-05nuo");
const headerTitle_05nuo = document.getElementById("header-title-05nuo");
const mainTitle_05nuo = document.getElementById("main-title-05nuo");
const inBtwTitle_05nuo = document.getElementById("in-btw-title-05nuo");

const svg_05nuo = document.getElementById("header-svg-05nuo");
const fullHeader_05nuo = document.getElementById("header-container-05nuo");

const widthLimit_05nuo = 1050;
let whRatio_05nuo = 2.3;

// svg width height ratio & min width in responsive mode
// const minSVGW_V_05nuo = 575;
const minSVGW_H_05nuo = 1170;
const svgWRatioH_05nuo = 0.75;
// const svgWRatioV_05nuo = 1.1;

//store svg width, height, left, top values after resize
let svg_height_05nuo = 0;
let svg_width_05nuo = 0;
let svg_left_05nuo = 0;
let svg_top_05nuo = 0;

//detect if svg is in scroll mode
let isSvgScroll_05nuo = false;

// set cube rotate text responsively
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

//set cube rotate text line height responsively
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

//set static title responsively
function responsiveHeaderTitle(headerTitle, inBtwTitle){
    const width = window.innerWidth;
    const height = window.innerHeight;
    if(width < widthLimit_05nuo && width < height){
        headerTitle.style.width = "100%";
        headerTitle.style.background = "none";
        headerTitle.style.boxShadow = "none";
        headerTitle.style.border = "none";
        headerTitle.style.textAlign="left";
        headerTitle.style.margin="0% 0% 0% 5%";
        inBtwTitle.innerHTML = "<br> Should Be <br>";
    }
    else{
        let w = 0;

        w = width * svgWRatioH_05nuo;
        if(w < minSVGW_H_05nuo){
            w = minSVGW_H_05nuo;
        }

        w = w / 2.25;
        let marginLeft = (width - w) / 1.9;
        headerTitle.style.width = `${w}px` 
        headerTitle.style.background = "rgba(106, 185, 16, 0.775)";
        headerTitle.style.boxShadow = "inset 0px 0px 30px rgba(255, 255, 255, 0.5)";
        headerTitle.style.border = "2px solid white";
        headerTitle.style.textAlign="center";
        headerTitle.style.margin=`-1% 2.5% 0% ${marginLeft}px`;
        inBtwTitle.innerHTML = "<br> Should Be <br>";
    }
}

//set title font size responsively
function responsiveTitleFont(headerTitle, mainTitle){
    const width = window.innerWidth;
    const height = window.innerHeight;

    if(width < widthLimit_05nuo){
        if(width < height){
            if(width < widthLimit_05nuo && width >= 600){
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
            if(width < widthLimit_05nuo && width >= 600){
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
            mainTitle.style.fontSize="37px";
        }
        else if(width < 1450 && width >= 1200){
            headerTitle.style.setProperty("--title-size-05nuo", "30px");
            mainTitle.style.fontSize="40px";
        }
        else{
            headerTitle.style.setProperty("--title-size-05nuo", "34px");
            mainTitle.style.fontSize="41px";
        }
    } 
}

//make svg and its container responsive in horizontal mode
function responsiveSVG_05nuo(container, svg, headerTitle){
    const width = window.innerWidth;
    const height = window.innerHeight;

    let w = width;
    let h;
    let top;
    let left;
    let svgW;
    let svgH;

    //before svg is in scroll mode(this will always be run first when refreshed)
    if(!isSvgScroll_05nuo){
        if(width < widthLimit_05nuo && width < height){
            svgH = ( height - headerTitle.offsetHeight - headerTitle.offsetTop ) * 0.95;
            svgW = svgH * 1.604;

            top = (headerTitle.offsetHeight + headerTitle.offsetTop) * 1.2;
            left = (svgW - w) / -2;
        }
        else{
            svgW = w * svgWRatioH_05nuo;
            if(svgW < minSVGW_H_05nuo){
                svgW = minSVGW_H_05nuo;
            }
            svgH = svgW / 1.604;

            top = (headerTitle.offsetHeight + headerTitle.offsetTop) * 0.5;
            left = (w - svgW) / 2;
        }
        h = ( svgH + top ) * 1.05;
    }
    //after svg is in scroll
    else{
        if(width < widthLimit_05nuo && width < height){
            svgW = w * 0.95;
            if(svgW > 470){
                svgW = 470;
            }
            svgH = svgW / 1.604;

            top = (headerTitle.offsetHeight + headerTitle.offsetTop) * 1.2;
        }
        else{
            svgW = w * 0.55;
            svgH = svgW / 1.604;
            top = (headerTitle.offsetHeight + headerTitle.offsetTop) * 0.5;
        }
        //set svg left in scroll mode based on scroll state
        let state = svgScrollTriggerPoints_05nuo.scrollState;
        if(state === 0){
            left = w * 0.05;
        }
        else if(state === 1){
            left = (w - 2 * svgW) / 2
        }
        else if(state === 2){
            left = (w - svgW) * 0.95;
        }
    }

    svg_height_05nuo = svgH;
    svg_width_05nuo = svgW;
    svg_left_05nuo = left;
    svg_top_05nuo = top;

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
    responsiveHeaderTitle(headerTitle_05nuo, inBtwTitle_05nuo);
    responsiveTitleFont(headerTitle_05nuo, mainTitle_05nuo);
    responsiveInteractiveText_05nuo();
}


/************************************************************************************************************ 
 * ****************************************** svg pan *******************************************************
 * **********************************************************************************************************
*/
let svgTranslateX_05nuo = 0;
let svgPrevTranslateX_05nuo = 0;
let svgPanAnim_05nuo = undefined;
let svgPanAnimLastTime_05nuo = undefined;
let svgPanDir_05nuo = 1;
let svgPanSpeed_05nuo = 0.12;
let stopSvgPan_05nuo = true;
let canCheckSvgPan_05nuo = true;

//check svg width to know if need to pan svg translate x
function svgPanCheck_05uo(){
    const svgWidth = svg_width_05nuo;
    const width = window.innerWidth;

    if(svgWidth >= width * 1.15){
        stopSvgPan_05nuo = false;
    }
    else{
        stopSvgPan_05nuo = true;
    }
}

//set svg pan direction, translateX target and check to switch direction 
function svgPan_05nuo(svg, deltaTime){
    const svgLeft = svg_left_05nuo;
    const svgWidth = svg_width_05nuo;
    const width = window.innerWidth;

    let target;

    let totalDistance = svgLeft + svgTranslateX_05nuo + svgPrevTranslateX_05nuo;
    if((svgPanDir_05nuo > 0) && (totalDistance >= -1) 
    || ((svgPanDir_05nuo < 0) && (totalDistance + svgWidth) <= (width * 0.95)) ){
        svgPanDir_05nuo *= -1;
        svgTranslateX_05nuo = 0;
        svgPanSpeed_05nuo = svgPanDir_05nuo < 0 ? (100 / 800 * width / 1000) : (150 / 800 * width / 1000);
    }

    if(svgPanDir_05nuo > 0){
        target = 0 - svgLeft - svgTranslateX_05nuo;
    }
    else{
        target = (svgWidth - width) - svgTranslateX_05nuo;
    }

    let move =  target * svgPanSpeed_05nuo * svgPanDir_05nuo * deltaTime;
    svgTranslateX_05nuo = svgPrevTranslateX_05nuo + move;
    svgPrevTranslateX_05nuo = svgTranslateX_05nuo;

    let matrix = window.getComputedStyle(svg).getPropertyValue("transform");
    let matrixSplits = matrix.split(',');
    let ty = parseFloat(matrixSplits[matrixSplits.length - 1]);

    svg.style.setProperty(`transform`, `translateX(${svgTranslateX_05nuo}px) translateY(${ty}px)`);
}

//animate svg pan through request animation
function svgPanAnimate_05nuo(timestamp){
    if(svgPanAnimLastTime_05nuo === undefined){
        svgPanAnimLastTime_05nuo = timestamp;
    }

    let deltaTime = (timestamp - svgPanAnimLastTime_05nuo) / 1000;

    if(!stopSvgPan_05nuo){
        svgPan_05nuo(svg_05nuo, deltaTime);
        cancelAnimationFrame(svgPanAnim_05nuo);
        svgPanAnim_05nuo = requestAnimFrame(svgPanAnimate_05nuo);
        svgPanAnimLastTime_05nuo = timestamp;
    }
    else{
        cancelAnimationFrame(svgPanAnim_05nuo);
        svgPanAnimLastTime_05nuo = undefined;
    }
}

//set svg to pan back to original pos if pan is stopped
function svgStopPan_05nuo(svg, deltaTime){
    const speed = 0.7;
    let target = 0;
    let move = (target - svgPrevTranslateX_05nuo) * speed * deltaTime; 

    svgTranslateX_05nuo = svgPrevTranslateX_05nuo + move;
    svgPrevTranslateX_05nuo = svgTranslateX_05nuo;

    let matrix = window.getComputedStyle(svg).getPropertyValue("transform");
    let matrixSplits = matrix.split(',');
    let ty = parseFloat(matrixSplits[matrixSplits.length - 1]);
    svg.style.transform = `translateX(${svgTranslateX_05nuo}px) translateY(${ty}px)`;
}

//animate svg to pan back through request animation
function svgStopPanAnimate_05nuo(timestamp){
    if(svgPanAnimLastTime_05nuo === undefined){
        svgPanAnimLastTime_05nuo = timestamp;
    }

    let deltaTime = (timestamp - svgPanAnimLastTime_05nuo) / 1000;

    const svgLeft = svg_left_05nuo;
    if(Math.abs((svgLeft + svgTranslateX_05nuo) - svgLeft) > 0.1){
        svgStopPan_05nuo(svg_05nuo, deltaTime);
        cancelAnimationFrame(svgPanAnim_05nuo);
        svgPanAnim_05nuo = requestAnimFrame(svgStopPanAnimate_05nuo);
        svgPanAnimLastTime_05nuo = timestamp;
    }
    else{
        cancelAnimationFrame(svgPanAnim_05nuo);
        svgPanAnimLastTime_05nuo = undefined;
    }
}

//the function to call to start check/initiate/stop svg pan
const svgPanStartCheck = function(){
    if(canCheckSvgPan_05nuo){
        svgPanCheck_05uo();
        if(!stopSvgPan_05nuo){
            cancelAnimationFrame(svgPanAnim_05nuo);
            svgPanAnim_05nuo = requestAnimFrame(svgPanAnimate_05nuo);
        }
        else{
            cancelAnimationFrame(svgPanAnim_05nuo);
            requestTimeout(()=>{
                svgPanAnim_05nuo = requestAnimFrame(svgStopPanAnimate_05nuo);
            }, 10);
        }
    }
    else{
        cancelAnimationFrame(svgPanAnim_05nuo);
        requestTimeout(()=>{
            svgPanAnim_05nuo = requestAnimFrame(svgStopPanAnimate_05nuo);
        }, 10);
    }
}

/* ************************************************************************************************************
*****************************************scroll control svg ***************************************************
*************************************************************************************************************** 
*/

const svgScrollBg_05nuo = document.getElementById("scroll-bg-05nuo");
const svgBgGradient_05nuo = document.getElementById('scroll-bg-gradient-05nuo');
const enterprisePanel_05nuo = document.getElementById("enterprise-panel-05nuo");
//svg scroll animation
const svgScrollTriggerPoints_05nuo = {
    start1: 0,
    end1: 0,
    start2: 0,
    end2: 0,
    start3: 0,
    end3: 0,
    init: function(s1, e1, s2, e2, s3, e3){
        this.start1 = s1;
        this.end1 = e1;
        this.start2 = s2;
        this.end2 = e2;
        this.start3 = s3;
        this.end3 = e3;
    },
    scrollState: 0,
    updateScrollState: function(scrollY){
        if(scrollY < this.start2){
            this.scrollState = 0;
        }
        else if(scrollY >= this.start2 && scrollY < this.start3){
            this.scrollState = 1;
        }
        else if(scrollY >= this.start3){
            this.scrollState = 2;
        }
    }
};

let lastScrollTarget_05nuo = 0;
let curScrollMove_05nuo = 0;

//scrollY values
let lastScrollY_05nuo = 0;

//clip path animation
let curClipAnimSeek_05nuo = 0;
let lastClipAnimSeek_05nuo = 0;

//svg scroll background gradient values
let svgHideScrollBg_05nuo = true;
let svgBgGradientY2_05nuo = 200;
let svgBgGradientY1_05nuo = 0;
let svgBgGradientFactor_05nuo = 100;

//svgScroll lerp values
let lastScrollSVGLerpTime_05nuo = undefined;
let scrollLerpAnim_05nuo = undefined;
let svgScrollLerpSpeed_05nuo = 0.1;

let hasReduceSvgOnScroll_05nuo = false;

//get svg scroll start end positions and targets based on state
function getScrollStartEndTargets(state){
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    let startSvgScroll_05nuo;
    let endSvgScroll_05nuo;
    let startPosY_05nuo;
    let targetPosY_05nuo;
    
    if(state === 0){
        startSvgScroll_05nuo = svgScrollTriggerPoints_05nuo.start1;
        endSvgScroll_05nuo = svgScrollTriggerPoints_05nuo.end1;
        startPosY_05nuo = svg_top_05nuo;
        if(width < widthLimit_05nuo && width < height){
            targetPosY_05nuo = enterprisePanel_05nuo.offsetTop + enterprisePanel_05nuo.offsetHeight * 0.1;
        }
        else{
            targetPosY_05nuo = enterprisePanel_05nuo.offsetTop + (enterprisePanel_05nuo.offsetHeight - svg_height_05nuo) / 2;
        }
    }
    else if(state === 1){
        startSvgScroll_05nuo = svgScrollTriggerPoints_05nuo.start2;
        endSvgScroll_05nuo = svgScrollTriggerPoints_05nuo.end2;
        startPosY_05nuo = svg_top_05nuo;
        if(width < widthLimit_05nuo && width < height){
            targetPosY_05nuo = enterprisePanel_05nuo.offsetTop + enterprisePanel_05nuo.offsetHeight * 0.1;
        }
        else{
            targetPosY_05nuo = enterprisePanel_05nuo.offsetTop + (enterprisePanel_05nuo.offsetHeight - svg_height_05nuo) / 2;
        }
    }
    else if(state === 2){
        startSvgScroll_05nuo = svgScrollTriggerPoints_05nuo.start3;
        endSvgScroll_05nuo = svgScrollTriggerPoints_05nuo.end3;
        startPosY_05nuo = svg_top_05nuo;
        if(width < widthLimit_05nuo && width < height){
            targetPosY_05nuo = enterprisePanel_05nuo.offsetTop + enterprisePanel_05nuo.offsetHeight * 0.1;
        }
        else{
            targetPosY_05nuo = enterprisePanel_05nuo.offsetTop + (enterprisePanel_05nuo.offsetHeight - svg_height_05nuo) / 2;
        }
    }

    return {startSvgScroll_05nuo, endSvgScroll_05nuo, startPosY_05nuo, targetPosY_05nuo}
}

//set start, end scroll animation position and scroll animation targets
function scrollSvg_05nuo(){
    //init start and end points
    svgScrollTriggerPoints_05nuo.init(
        fullHeader_05nuo.offsetHeight * 0.3, enterprisePanel_05nuo.offsetTop * 0.75,
        enterprisePanel_05nuo.offsetTop + enterprisePanel_05nuo.offsetHeight * 0.55, 1000,
        1100, 2000);

    svgScrollTriggerPoints_05nuo.updateScrollState(window.scrollY);
    let state = svgScrollTriggerPoints_05nuo.scrollState;
        console.log(state);

    //get start end points and start target pos based on scroll state
    let {startSvgScroll_05nuo, endSvgScroll_05nuo, startPosY_05nuo, targetPosY_05nuo} = getScrollStartEndTargets(state);


    //detect if svg is in scroll mode (scrollY is larger than the begin scroll point)
    {
        //get the very beginning pos value where svg starts to scroll
        if(!isSvgScroll_05nuo && window.scrollY >= svgScrollTriggerPoints_05nuo.start1){
            isSvgScroll_05nuo = true;
            canCheckSvgPan_05nuo = false;
            svgPanStartCheck(svg_05nuo);
        }
        else if(isSvgScroll_05nuo && window.scrollY < svgScrollTriggerPoints_05nuo.start1){
            isSvgScroll_05nuo = false;
            canCheckSvgPan_05nuo = true;
            resizeHero_05nuo();
            svgPanStartCheck(svg_05nuo);
        }

        if(!hasReduceSvgOnScroll_05nuo && window.scrollY >= svgScrollTriggerPoints_05nuo.end1 * 0.8){
            hasReduceSvgOnScroll_05nuo = true;
            resizeHero_05nuo();
        }
        else if(hasReduceSvgOnScroll_05nuo && window.scrollY < svgScrollTriggerPoints_05nuo.end1 * 0.8){
            hasReduceSvgOnScroll_05nuo = false;
        }
    }

    //set scrollY values
    let getScrollY = function(){
        let scrollY = window.scrollY;
        if(window.scrollY < startSvgScroll_05nuo){
            scrollY = startSvgScroll_05nuo;
        }
        else if(window.scrollY > endSvgScroll_05nuo){
            scrollY = endSvgScroll_05nuo;
        }
        return scrollY;
    }

    lastScrollY_05nuo = getScrollY();

    //show and hide svg scroll bg
    {
        if(!svgHideScrollBg_05nuo && window.scrollY < startSvgScroll_05nuo){
            requestTimeout(()=>{
                if(!svgHideScrollBg_05nuo && window.scrollY < startSvgScroll_05nuo){
                    svgHideScrollBg_05nuo = true;
                    svgScrollBg_05nuo.style.opacity = "0";
                }
            }, 600);
        }
        else if(svgHideScrollBg_05nuo && window.scrollY >= startSvgScroll_05nuo && window.scrollY < endSvgScroll_05nuo){
            svgHideScrollBg_05nuo = false;
            svgScrollBg_05nuo.style.opacity = "1";
        }
        else if(!svgHideScrollBg_05nuo && window.scrollY >= endSvgScroll_05nuo){
            requestTimeout(()=>{
                if(!svgHideScrollBg_05nuo && window.scrollY >= endSvgScroll_05nuo){
                    svgHideScrollBg_05nuo = true;
                    svgScrollBg_05nuo.style.opacity = "0";
                }
            }, 600);
        }
    }

    let scrollPercent = (lastScrollY_05nuo - startSvgScroll_05nuo) / (endSvgScroll_05nuo - startSvgScroll_05nuo);
    //scroll svg translateY
    lastScrollTarget_05nuo = scrollPercent * (targetPosY_05nuo - startPosY_05nuo);
    //scroll animate svg clip path
    lastClipAnimSeek_05nuo = scrollPercent;

    //change gradient pos y1 y2 values
    let gradient_y1 = svgBgGradientY1_05nuo - svgBgGradientFactor_05nuo * scrollPercent;
    let gradient_y2 = svgBgGradientY2_05nuo - svgBgGradientFactor_05nuo * scrollPercent;
    svgBgGradient_05nuo.setAttribute("y1", `${gradient_y1}%`);
    svgBgGradient_05nuo.setAttribute("y2", `${gradient_y2}%`); 

    cancelAnimationFrame(scrollLerpAnim_05nuo);
    scrollLerpAnim_05nuo = requestAnimFrame(scrollSvgLerp_05nuo);
}

//lerp svg translateY and clip path animtion
function scrollSvgLerp_05nuo(timestamp){
    if(lastScrollSVGLerpTime_05nuo === undefined){
        lastScrollSVGLerpTime_05nuo = timestamp;
    }

    let deltaTime = (timestamp - lastScrollSVGLerpTime_05nuo) / 1000;
    lastScrollSVGLerpTime_05nuo = timestamp;

    curScrollMove_05nuo = lerp_05nuo(curScrollMove_05nuo, lastScrollTarget_05nuo, svgScrollLerpSpeed_05nuo, deltaTime);
    curClipAnimSeek_05nuo = lerp_05nuo(curClipAnimSeek_05nuo, lastClipAnimSeek_05nuo, svgScrollLerpSpeed_05nuo, deltaTime);

    let matrix = window.getComputedStyle(svg_05nuo).getPropertyValue("transform");
    let matrixSplits = matrix.split(',');
    let tx = parseFloat(matrixSplits[matrixSplits.length - 2]);

    svg_05nuo.style.setProperty("transform", `translateX(${tx}px) translateY(${curScrollMove_05nuo}px)`);
    svg_05nuo.style.setProperty("--animation-seek-05nuo", curClipAnimSeek_05nuo);

    
    if(Math.abs(curScrollMove_05nuo - lastScrollTarget_05nuo) <= 0.1 && 
    Math.abs(curClipAnimSeek_05nuo - lastClipAnimSeek_05nuo) <= 0.1){
        cancelAnimationFrame(scrollLerpAnim_05nuo);
    }
    else{
        cancelAnimationFrame(scrollLerpAnim_05nuo);
        scrollLerpAnim_05nuo = requestAnimFrame(scrollSvgLerp_05nuo);
    }
}

/* ********************************************************************************************************
************************************** title text rotate animation ****************************************
***********************************************************************************************************/

let titleAnim_05nuo;
const titleAnimInterval_05nuo = 2300;
let titleRotationL_05nuo = 0
let titleRotationR_05nuo = 0
let currentTitleRotation_05nuo = 0;
let hasResetTransitionTitleAnim_05nuo = true;
let currentTimeTitleAnim_05nuo = undefined;
const interactiveCubeChildren1 = interactiveText_05nuo.children;
const interactiveCubeChildren2 = interactiveText2_05nuo.children;

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

/* ********************************************************************************************************
*********************************** prevent choppy anim after focus out ***********************************
*********************************************************************************************************** */

let vis = (function(){
    var stateKey, 
        eventKey, 
        keys = {
                hidden: "visibilitychange",
                webkitHidden: "webkitvisibilitychange",
                mozHidden: "mozvisibilitychange",
                msHidden: "msvisibilitychange"
    };
    for (stateKey in keys) {
        if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
        }
    }
    return function(c) {
        if (c) document.addEventListener(eventKey, c);
        return !document[stateKey];
    }
  })();
  // check if current tab is active or not
vis(function(){
    if(vis() == false) {
    // tab not focused
        svgPanAnimLastTime_05nuo = undefined;
        lastScrollSVGLerpTime_05nuo = undefined;
    }
});

let notIE = (document.documentMode === undefined),
    isChromium = window.chrome;
if (notIE && !isChromium) {
    // checks for Firefox and other  NON IE Chrome versions
    window.addEventListener("focusout", function () {
    // blur
    svgPanAnimLastTime_05nuo = undefined;
    lastScrollSVGLerpTime_05nuo = undefined;
    });
} 
else {
    // checks for IE and Chromium versions
    // bind blur event
    window.addEventListener("blur", function () {
    // blur
    svgPanAnimLastTime_05nuo = undefined;
    lastScrollSVGLerpTime_05nuo = undefined;
    });
}


/* *******************************************************************************************************
*************************************************start ***************************************************
***********************************************************************************************************/

const responsiveFunc_05nuo = function(){
    responsiveTitle_05nuo();
    resizeHero_05nuo();

    requestTimeout(responsiveInteractiveText_05nuo, 20);
    svgPanStartCheck(svg_05nuo);
    scrollSvg_05nuo();
}

requestTimeout(responsiveFunc_05nuo, 0);
requestTimeout(responsiveFunc_05nuo, 50);

window.addEventListener("resize", responsiveFunc_05nuo);
document.addEventListener('DOMContentLoaded', ()=>{
    requestTimeout(()=>{
        headerTitle_05nuo.style.transform = "translateY(0)";
    }, 200);
    window.addEventListener("scroll", scrollSvg_05nuo, eventListenerOption_05nuo);
    titleAnim_05nuo = requestAnimFrame(titleRotate_05nuo);
});
