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

function lerp_05nuo(v1, v2, speed, delta){
    return v1 + (v2 - v1) * (1 - Math.pow(speed, delta));
}

/************************************************************************************************************* 
 ***************************** responsive feature for svg, title div and texts ******************************* 
 ************************************************************************************************************* 
*/
const headerTitle_05nuo = document.getElementById("header-title-05nuo");
const mainTitle_05nuo = document.getElementById("main-title-05nuo");

const transitText_05nuo = document.getElementById("transit-text-05nuo");
const transitRotText_05nuo = document.getElementById("transit-rotate-text-05nuo");
const transitRotText2_05nuo = document.getElementById("transit-rotate-text2-05nuo");
const transitRotTextPlaceholder_05nuo = document.getElementById("placeholder3-05nuo");
const transitRotTextPlaceholder2_05nuo = document.getElementById("placeholder4-05nuo");

const transitMainText_05nuo = document.getElementById("transit-main-text-05nuo");

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
let svgHeight_05nuo = 0;
let svgWidth_05nuo = 0;
let svgLeft_05nuo = 0;
let svgTop_05nuo = 0;

//detect if svg is in scroll mode
let isSvgScroll_05nuo = false;

// set cube rotate text responsively
function responsiveTransitRotText_05nuo(text, placeholder){
    const hratio = 1.2;
    const wratio = 1.1;
    let width = placeholder.offsetWidth * wratio;
    let height = placeholder.offsetHeight * hratio;
    let paddingTop = (height - placeholder.offsetHeight) / 2;

    text.style.width = `${width}px`;
    text.style.setProperty("--face-height-05nuo", `${height}px`);

    for(let i = 0; i < text.children.length; i++){
        text.children.item(i).style.paddingTop = `${paddingTop}px`;
    }
}

//set static title responsively
function responsiveHeaderTitle(headerTitle){
    const width = window.innerWidth;
    const height = window.innerHeight;
    const subtitle = headerTitle.children.item(1);
    if(width < widthLimit_05nuo && width < height){
        headerTitle.style.setProperty("flex-direction", "column");
        headerTitle.style.setProperty("gap", "5px");
        subtitle.style.setProperty("width", "100%");
        subtitle.style.setProperty("font-size", "var(--large-title-size-05nuo)");
        headerTitle.children.item(0).style.setProperty("font-size", "55px");
        if(width < 750){
            headerTitle.children.item(0).style.setProperty("font-size", "45px");
            subtitle.style.setProperty("font-size", "var(--title-size-05nuo)");
        }
    }
    else{
        headerTitle.style.setProperty("flex-direction", "row");
        let gapsize = 150 / 1920 * width;
        if(gapsize <= 75){
            gapsize = 75;
        }
        headerTitle.style.setProperty("gap", `${gapsize}px`);
        subtitle.style.setProperty("font-size", "var(--large-title-size-05nuo)");;
        headerTitle.children.item(0).style.setProperty("font-size", "70px");

        if(width < 1500){
            subtitle.style.setProperty("width", "100%");
        }
        else{
            subtitle.style.setProperty("width", "65%");
        }

        if(width < 880){
            // subtitle.style.setProperty("font-size", "calc(var(--large-title-size-05nuo)*0.8)");
            headerTitle.style.setProperty("flex-direction", "column");
            headerTitle.style.setProperty("gap", "5px");
        }
    }

    if(width < 500){
        subtitle.children.item(0).innerHTML = "";
        subtitle.children.item(2).innerHTML = "Manage your Continuing Education Without doing any of the Admin Work";
        subtitle.children.item(2).style.setProperty("text-align", "left");
        subtitle.children.item(2).style.setProperty("padding-right", "3%");
    }
    else{
        subtitle.children.item(0).innerHTML = "Manage your Continuing Education";
        subtitle.children.item(2).innerHTML = "Without doing any of the Admin Work";
        subtitle.children.item(2).style.setProperty("text-align", "right");
        subtitle.children.item(2).style.setProperty("padding-right", "0");
    }
}

function responsiveTransitText(transitText){
    const prev = transitText.previousElementSibling;
    const parent = transitText.parentElement;
    let marginTop = parent.offsetHeight - (prev.offsetHeight + prev.offsetTop);
    transitText.style.marginTop = `${marginTop}px`;

    const width = window.innerWidth;
    const height = window.innerHeight;
    if(width < widthLimit_05nuo && width < height){
        transitText.style.flexDirection = "column";
        transitMainText_05nuo.innerHTML=`Continuing Education`;
        transitRotText_05nuo.parentElement.style.flexWrap = "wrap";
    }
    else{
        transitText.style.flexDirection = "row";
        transitMainText_05nuo.innerHTML=`Continuing<span style="opacity: 0;">_</span>Education`;
        transitRotText_05nuo.parentElement.style.flexWrap = "nowrap";
    }
}

//set title font size responsively
function responsiveFonts(headerContainer){
    const width = window.innerWidth;
    const height = window.innerHeight;

    if(width < widthLimit_05nuo){
        if(width < height){
            if(width < widthLimit_05nuo && width >= 600){
                headerContainer.style.setProperty("--title-size-05nuo", "26px");
                headerContainer.style.setProperty("--large-title-size-05nuo", "35px");
            }
            else if(width < 600 && width >= 400){
                headerContainer.style.setProperty("--title-size-05nuo", "23px");
                headerContainer.style.setProperty("--large-title-size-05nuo", "30px");
            }
            else if(width < 400 && width >= 350){
                headerContainer.style.setProperty("--title-size-05nuo", "23px");
                headerContainer.style.setProperty("--large-title-size-05nuo", "30px");
            }
            else{
                headerContainer.style.setProperty("--title-size-05nuo", "23x");
                headerContainer.style.setProperty("--large-title-size-05nuo", "27px");
            }
        }
        else{
            if(width < widthLimit_05nuo && width >= 600){
                headerContainer.style.setProperty("--title-size-05nuo", "26px");
                headerContainer.style.setProperty("--large-title-size-05nuo", "29px");
            }
            else if(width < 600 && width >= 400){
                headerContainer.style.setProperty("--title-size-05nuo", "23px");
                headerContainer.style.setProperty("--large-title-size-05nuo", "24px");
            }
            else{
                headerContainer.style.setProperty("--title-size-05nuo", "10px");
                headerContainer.style.setProperty("--large-title-size-05nuo", "15px");
            }
        }
    }
    else{
        if(width < 1200){
            headerContainer.style.setProperty("--title-size-05nuo", "26px");
            headerContainer.style.setProperty("--large-title-size-05nuo", "37px");
        }
        else if(width < 1450 && width >= 1200){
            headerContainer.style.setProperty("--title-size-05nuo", "30px");
            headerContainer.style.setProperty("--large-title-size-05nuo", "40px");
        }
        else{
            headerContainer.style.setProperty("--title-size-05nuo", "34px");
            headerContainer.style.setProperty("--large-title-size-05nuo", "41px");
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
            left = (svgW - w) / -2;
        }
        else{
            svgW = w * svgWRatioH_05nuo;
            if(svgW < minSVGW_H_05nuo){
                svgW = minSVGW_H_05nuo;
            }
            svgH = svgW / 1.604;
            left = (w - svgW) / 2;
        }
        top = (headerTitle.offsetHeight + headerTitle.offsetTop) * 1.1;
        h = svgH + top;
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

    svgHeight_05nuo = svgH;
    svgWidth_05nuo = svgW;
    svgLeft_05nuo = left;
    svgTop_05nuo = top;

    container.style.width = `${w}px`;  
    container.style.height = `${h}px`;
    svg.style.width = `${svgW}px`;
    svg.style.top = `${top}px`;
    svg.style.left = `${left}px`;
}

function responsiveEnterprisePanel(panel){
    const width = window.innerWidth;
    const height = window.innerHeight;

    let h = height + transitText_05nuo.offsetHeight * 1.5;
    panel.style.setProperty("height", `${h}px`);
}

function responsiveRotateText_05nuo(){
    responsiveTransitRotText_05nuo(transitRotText_05nuo, transitRotTextPlaceholder_05nuo);
    responsiveTransitRotText_05nuo(transitRotText2_05nuo, transitRotTextPlaceholder2_05nuo);
}

function resizeHero_05nuo(){
    responsiveSVG_05nuo(fullHeader_05nuo, svg_05nuo, headerTitle_05nuo);
}

function responsiveTitle_05nuo(){
    responsiveHeaderTitle(headerTitle_05nuo);
    responsiveFonts(fullHeader_05nuo);
    responsiveRotateText_05nuo();
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
    const svgWidth = svgWidth_05nuo;
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
    const svgLeft = svgLeft_05nuo;
    const svgWidth = svgWidth_05nuo;
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

    const svgLeft = svgLeft_05nuo;
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

//for safari clip path aniamtio compatibility
let svgClipPathSafari = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

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
        startPosY_05nuo = svgTop_05nuo;
        if(width < widthLimit_05nuo && width < height){
            targetPosY_05nuo = enterprisePanel_05nuo.offsetTop + transitText_05nuo.offsetHeight * 1.7;
        }
        else{
            targetPosY_05nuo = enterprisePanel_05nuo.offsetTop + (enterprisePanel_05nuo.offsetHeight - svgHeight_05nuo + transitText_05nuo.offsetHeight*1.5) / 2;
        }
    }
    else if(state === 1){
        startSvgScroll_05nuo = svgScrollTriggerPoints_05nuo.start2;
        endSvgScroll_05nuo = svgScrollTriggerPoints_05nuo.end2;
        startPosY_05nuo = svgTop_05nuo;
        if(width < widthLimit_05nuo && width < height){
            targetPosY_05nuo = enterprisePanel_05nuo.offsetTop + enterprisePanel_05nuo.offsetHeight * 0.1;
        }
        else{
            targetPosY_05nuo = enterprisePanel_05nuo.offsetTop + (enterprisePanel_05nuo.offsetHeight - svgHeight_05nuo) / 2;
        }
    }
    else if(state === 2){
        startSvgScroll_05nuo = svgScrollTriggerPoints_05nuo.start3;
        endSvgScroll_05nuo = svgScrollTriggerPoints_05nuo.end3;
        startPosY_05nuo = svgTop_05nuo;
        if(width < widthLimit_05nuo && width < height){
            targetPosY_05nuo = enterprisePanel_05nuo.offsetTop + enterprisePanel_05nuo.offsetHeight * 0.1;
        }
        else{
            targetPosY_05nuo = enterprisePanel_05nuo.offsetTop + (enterprisePanel_05nuo.offsetHeight - svgHeight_05nuo) / 2;
        }
    }

    return {startSvgScroll_05nuo, endSvgScroll_05nuo, startPosY_05nuo, targetPosY_05nuo}
}

//set start, end scroll animation position and scroll animation targets
function scrollSvg_05nuo(){
    //init start and end points
    svgScrollTriggerPoints_05nuo.init(
        svgTop_05nuo + svgHeight_05nuo * 0.35, enterprisePanel_05nuo.offsetTop * 0.95,
        enterprisePanel_05nuo.offsetTop + enterprisePanel_05nuo.offsetHeight * 0.55, 1000,
        1100, 2000);

    svgScrollTriggerPoints_05nuo.updateScrollState(window.scrollY);
    let state = svgScrollTriggerPoints_05nuo.scrollState;

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

    svgClipPathSafari = window.getComputedStyle(svg_05nuo).getPropertyValue("clip-path");
    console.log(svgClipPathSafari);

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

let setSvgClipPathAnim = undefined;
function setSvgClipPathSafari_05nuo(){
    svg_05nuo.style.setProperty("clip-path", "none");
    svg_05nuo.style.setProperty("-webkit-clip-path", "none");
    svg_05nuo.offsetWidth;
    svg_05nuo.style.setProperty("clip-path", `${svgClipPathSafari}`);
    svg_05nuo.style.setProperty("-webkit-clip-path", `${svgClipPathSafari}`);
    cancelAnimationFrame(setSvgClipPathAnim)
    setSvgClipPathAnim = requestAnimFrame(setSvgClipPathSafari_05nuo);
}

setSvgClipPathAnim = requestAnimFrame(setSvgClipPathSafari_05nuo);
/* ********************************************************************************************************
************************************** cube text rotate animation ****************************************
***********************************************************************************************************/

let titleAnim_05nuo;
const titleAnimInterval_05nuo = 1700;
let titleRotationL_05nuo = 0
let titleRotationR_05nuo = 0
let currentTitleRotation_05nuo = 0;
let hasResetTransitionTitleAnim_05nuo = true;
let currentTimeTitleAnim_05nuo = undefined;


function titleRotate_05nuo(text1, text2, timestamp){
    currentTimeTitleAnim_05nuo = timestamp;
    currentTitleRotation_05nuo = (currentTitleRotation_05nuo + 1) % 4;

    //reset rotation degree without rendered transition
    if(titleRotationL_05nuo >= 360){
        text1.style.setProperty("--transform-transition-time-05nuo", "0s");
        text2.style.setProperty("--transform-transition-time-05nuo", "0s");
        titleRotationL_05nuo = titleRotationL_05nuo % 360;
        titleRotationR_05nuo = titleRotationR_05nuo % 360;
        text1.style.setProperty("--cube-rotate-05nuo", `${titleRotationL_05nuo}deg`);
        text2.style.setProperty("--cube-rotate2-05nuo", `${titleRotationR_05nuo}deg`);
        currentTimeTitleAnim_05nuo = timestamp - titleAnimInterval_05nuo + 10;
        hasResetTransitionTitleAnim_05nuo = false;
    }
    else{
        if(!hasResetTransitionTitleAnim_05nuo){
            text1.style.setProperty("--transform-transition-time-05nuo", "1s");
            text2.style.setProperty("--transform-transition-time-05nuo", "1s");
            hasResetTransitionTitleAnim_05nuo = true;
        }
        titleRotationL_05nuo += 90;
        titleRotationR_05nuo -= 90;

        text1.style.setProperty("--cube-rotate-05nuo", `${titleRotationL_05nuo}deg`);
        text2.style.setProperty("--cube-rotate2-05nuo", `${titleRotationR_05nuo}deg`);
    }
}


function titleRotateAnimate_05nuo(timestamp){
    if(currentTimeTitleAnim_05nuo == undefined){
        currentTimeTitleAnim_05nuo = timestamp;
    }
    let elapse = timestamp - currentTimeTitleAnim_05nuo;
    if(elapse >= titleAnimInterval_05nuo){
        titleRotate_05nuo(transitRotText_05nuo, transitRotText2_05nuo, timestamp);
    }

    cancelAnimationFrame(titleAnim_05nuo);
    titleAnim_05nuo = requestAnimFrame(titleRotateAnimate_05nuo);
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
    responsiveTransitText(transitText_05nuo, fullHeader_05nuo);
    responsiveEnterprisePanel(enterprisePanel_05nuo);

    requestTimeout(responsiveRotateText_05nuo, 20);
    svgPanStartCheck(svg_05nuo);
    scrollSvg_05nuo();
}

requestTimeout(responsiveFunc_05nuo, 0);
requestTimeout(responsiveFunc_05nuo, 50);

window.addEventListener("resize", responsiveFunc_05nuo);
document.addEventListener('DOMContentLoaded', ()=>{
    //start animation for titles
    requestTimeout(()=>{
        headerTitle_05nuo.style.transform = "translateY(0)";
        requestTimeout(()=>{
            const titleItems = mainTitle_05nuo.children;
            for(let i = 0; i < titleItems.length; i ++){
                let delay = 2 + i/10 * 2;
                titleItems.item(i).style.setProperty("animation", `letter-slide-05nuo 10s ease ${delay}s infinite normal both`);
            }
            mainTitle_05nuo.style.setProperty("animation", "acea-slide-05nuo 10s ease 1.9s infinite normal both");
        }, 1000);
    }, 200);
    //start listen to scroll events
    window.addEventListener("scroll", scrollSvg_05nuo, eventListenerOption_05nuo);
    //start transit text cube roate animation
    titleAnim_05nuo = requestAnimFrame(titleRotateAnimate_05nuo);
});
