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

function getScrollbarWidth_05nuo() {

    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
}

const scrollBarWidth_05nuo = getScrollbarWidth_05nuo();

/************************************************************************************************************* 
 ***************************** responsive feature for svg, title div and texts ******************************* 
 ************************************************************************************************************* 
*/
const headerTitle_05nuo = document.getElementById("header-title-05nuo");

// const transitText_05nuo = document.getElementById("transit-text-05nuo");
// const transitRotText_05nuo = document.getElementById("transit-rotate-text-05nuo");
// const transitRotText2_05nuo = document.getElementById("transit-rotate-text2-05nuo");
// const transitRotTextPlaceholder_05nuo = document.getElementById("placeholder3-05nuo");
// const transitRotTextPlaceholder2_05nuo = document.getElementById("placeholder4-05nuo");

// const transitMainText_05nuo = document.getElementById("transit-main-text-05nuo");

// const signInButton_05nuo = document.getElementById("sign-in-05nuo");

const svg_05nuo = document.getElementById("header-svg-05nuo");
const fullHeader_05nuo = document.getElementById("header-container-05nuo");
const navButtonContainer_05nuo = document.getElementById("nav-buttons-05nuo");

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
//detect if title is in scroll
let isTitleScroll_05nuo = false;

// set cube rotate text responsively
// function responsiveTransitRotText_05nuo(text, placeholder){
//     const hratio = 1.2;
//     const wratio = 1.1;
//     let width = placeholder.offsetWidth * wratio;
//     let height = placeholder.offsetHeight * hratio;
//     let paddingTop = (height - placeholder.offsetHeight) / 2;

//     text.style.width = `${width}px`;
//     text.style.setProperty("--face-height-05nuo", `${height}px`);

//     for(let i = 0; i < text.children.length; i++){
//         text.children.item(i).style.paddingTop = `${paddingTop}px`;
//     }
// }

//set static title responsively
function responsiveHeaderTitle(headerTitle){
    const width = window.innerWidth;
    const height = window.innerHeight;
    const subtitle = headerTitle.children.item(0);
    const subtitleItem1 = subtitle.children.item(1);
    const subtitleLine1 = subtitle.children.item(0);
    const subtitleLine2 = subtitle.children.item(2);

    if(width < widthLimit_05nuo && width < height){
        headerTitle.style.setProperty("mix-blend-mode", "normal");

        subtitle.style.setProperty("display", "flex");
        subtitleLine1.style.setProperty("width", "4px");
        subtitle.style.setProperty("gap", "20px");
        subtitle.style.setProperty("width", "100%");
        subtitle.style.setProperty("font-size", "35px");
        subtitle.style.setProperty("justify-content", "center");
        subtitle.style.setProperty("text-align", "center");
        subtitleItem1.innerHTML = "Manage Continuing Education<br><em>without</em> the Admin Work";
        subtitleLine1.innerHTML = `<span style="opacity: 0;user-select: none;">B</span>`;
        subtitleLine2.innerHTML = `<span style="opacity: 0;user-select: none;">B</span>`;
        if(width < 680){
            subtitle.style.setProperty("text-align", "left");
            subtitleLine1.style.setProperty("width", "0");
            subtitle.style.setProperty("gap", "5px");
            subtitle.style.setProperty("justify-content", "flex-start");
            subtitleItem1.innerHTML = "Manage<br><span id='ce-text-05nuo'>Continuing Education</span><br><em>without</em><br><span id='aw-text-05nuo'>the Admin Work</span>";
            subtitleLine2.innerHTML = `<span style="opacity: 0;user-select: none;">B<br>B<br>B</span>`;

            const ceText = document.getElementById("ce-text-05nuo");
            const awText = document.getElementById('aw-text-05nuo');

            ceText.style.setProperty("font-size", "26px");
            awText.style.setProperty("font-size", "26px");
        }
        
        if(isTitleScroll_05nuo){
            subtitle.style.setProperty("display", "none");
            headerTitle.style.setProperty("mix-blend-mode", "difference");
        }
    }
    else{
        headerTitle.style.setProperty("mix-blend-mode", "normal");

        subtitle.style.setProperty("justify-content", "center");
        subtitle.style.setProperty("text-align", "center");
        subtitle.style.setProperty("font-size", "45px");
        subtitle.style.setProperty("display", "flex");      
        subtitleLine1.style.setProperty("width", "4px");
        subtitle.style.setProperty("gap", "20px");

        if(width < 1420 && width >= 1250){
            subtitle.style.setProperty("font-size", "37px");    
        }
        else if(width < 1250 && width >= 880){
            subtitle.style.setProperty("font-size", "34px");    
        }
        else if(width < 880){
            subtitle.style.setProperty("font-size", "calc(var(--large-title-size-05nuo) * 1.05)");
            headerTitle.style.setProperty("flex-direction", "column");
            headerTitle.style.setProperty("gap", "5px");
        }

        if(width < widthLimit_05nuo){
            subtitleItem1.innerHTML = "Manage Continuing Education<br><em>without</em> the Admin Work";
            subtitleLine1.innerHTML = `<span style="opacity: 0;user-select: none;">B<br>B</span>`;
            subtitleLine2.innerHTML = `<span style="opacity: 0;user-select: none;">B<br>B</span>`;
        }
        else{
            subtitleItem1.innerHTML = "Manage Continuing Education <em>without</em> the Admin Work";
            subtitleLine1.innerHTML = `<span style="opacity: 0;user-select: none;">B</span>`;
            subtitleLine2.innerHTML = `<span style="opacity: 0;user-select: none;">B</span>`;
        }

        if(isTitleScroll_05nuo){
            subtitle.style.setProperty("display", "none");
            headerTitle.style.setProperty("mix-blend-mode", "difference");
        }
    }
}

// function responsiveTransitText(transitText){
//     const prev = transitText.previousElementSibling;
//     const parent = transitText.parentElement;
//     let marginTop = parent.offsetHeight - (prev.offsetHeight + prev.offsetTop);
//     transitText.style.marginTop = `${marginTop}px`;

//     const width = window.innerWidth;
//     const height = window.innerHeight;
//     if(width < widthLimit_05nuo && width < height){
//         transitText.style.flexDirection = "column";
//         transitMainText_05nuo.innerHTML=`Continuing Education`;
//         transitRotText_05nuo.parentElement.style.flexWrap = "wrap";
//     }
//     else{
//         transitText.style.flexDirection = "row";
//         transitMainText_05nuo.innerHTML=`Continuing<span style="opacity: 0;">_</span>Education`;
//         transitRotText_05nuo.parentElement.style.flexWrap = "nowrap";
//     }
// }

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
function responsiveSVG_05nuo(container, svg, headerTitle, state=0){
    const width = window.innerWidth;
    const height = window.innerHeight;

    let w = width;
    let h;
    let top;
    let left;
    let svgW;
    let svgH;

    let titleHeight = isTitleScroll_05nuo ? headerTitle.offsetHeight * 2 : headerTitle.offsetHeight;

    //before svg is in scroll mode(this will always be run first when refreshed)
    if(!isSvgScroll_05nuo){
        if(width < widthLimit_05nuo && width < height){
            svgH = ( height - titleHeight - headerTitle.offsetTop ) * 0.95;
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
        top = (titleHeight + headerTitle.offsetTop) * 1.15;
        h = svgH + top;
    }
    //after svg is in scroll
    else{
        if(width < widthLimit_05nuo && width < height){
            svgW = w * 1.1;
            svgH = svgW / 1.604;

            top = (titleHeight + headerTitle.offsetTop) * 1.15;
            svg_05nuo.classList.add("svg-mobile-clip-path-05nuo");
            svg_05nuo.classList.remove("svg-clip-path-05nuo");
        }
        else{
            svgW = w * 0.67;
            svgH = svgW / 1.604;
            top = (titleHeight + headerTitle.offsetTop) * 1.15;
            svg_05nuo.classList.add("svg-clip-path-05nuo");
            svg_05nuo.classList.remove("svg-mobile-clip-path-05nuo");
        }
        //set svg left in scroll mode based on scroll state
        if(state === 0){
            let dist = w - scrollBarWidth_05nuo - svgW;
            left = dist - 120 / 1920 * w;
        }
        else if(state === 1){
            left = w * 0.05;
        }
        else if(state === 2){
            let dist = w - scrollBarWidth_05nuo - svgW;
            left = dist / 2;
        }
    }

    svgHeight_05nuo = svgH;
    svgWidth_05nuo = svgW;
    svgLeft_05nuo = left;
    svgTop_05nuo = top;

    container.style.width = `${w}px`;  
    container.style.height = `${h}px`;
    svg.style.width = `${svgW}px`;
    svg.style.height = `${svgH}px`;
    svg.style.top = `${top}px`;
    svg.style.left = `${left}px`;
}

//responsive feature for sign in button
// function responsiveSignInButton_05nuo(button){
//     const width = window.innerWidth;
//     let w = svgWidth_05nuo / 3 * 0.3;
//     if(w <= 72){
//         w = 72;
//     }
//     let marginLeft = (width - w) /2;
//     let marginTop = fullHeader_05nuo.offsetHeight / 1.75 - w;
//     let paddingTop = (w - button.children.item(1).offsetHeight) / 2;
//     button.style.setProperty("width", `${w}px`);
//     button.style.setProperty("height", `${w}px`);
//     button.style.setProperty("margin-left", `${marginLeft}px`);
//     button.style.setProperty("margin-top", `${marginTop}px`);
//     button.style.setProperty("padding-top", `${paddingTop}px`);
// }

function responsiveNavButton_05nuo(){
    const width = window.innerWidth;
    const height = window.innerHeight;

    let top;
    let left;
    let w;
    let h;

    let buttonW;
    let buttonH;
    let gap;

    if(width < widthLimit_05nuo && width < height){
        let multFactor = 1;
        buttonH = `clamp(15px, 3vmax, 90px)`;
        buttonW = `calc(clamp(20px, 3vmax, 90px)* ${multFactor})`
        gap = 40;

        navButtonContainer_05nuo.style.setProperty("height", `${buttonH}`);
        w = navButtonContainer_05nuo.offsetHeight * multFactor * 4 + gap * 3;
        navButtonContainer_05nuo.style.setProperty("width", `${w}px`);
        navButtonContainer_05nuo.style.setProperty("flex-direction", `row`);

        top = (height - navButtonContainer_05nuo.offsetHeight) * 0.95;
        left = (width - navButtonContainer_05nuo.offsetWidth) * 0.5;
    }
    else{
        buttonW = buttonH = `clamp(20px, 1.15vmax, 80px)`;
        gap = 20;

        navButtonContainer_05nuo.style.setProperty("width", `${buttonW}`);
        h = navButtonContainer_05nuo.offsetWidth * 4 + gap * 3;
        navButtonContainer_05nuo.style.setProperty("height", `${h}px`);
        navButtonContainer_05nuo.style.setProperty("flex-direction", `column`);

        top = (height - navButtonContainer_05nuo.offsetHeight) * 0.95;
        left = navButtonContainer_05nuo.offsetWidth * 1.5;
    }

    navButtonContainer_05nuo.style.setProperty("gap", `${gap}px`);
    let children = navButtonContainer_05nuo.children
    for(let i = 0; i < children.length; i++){
        children.item(i).style.setProperty("width", `${buttonW}`);
        children.item(i).style.setProperty("height", `${buttonH}`);
    }

    navButtonContainer_05nuo.style.setProperty("top", `${top}px`);
    navButtonContainer_05nuo.style.setProperty("left", `${left}px`);
}

function responsiveEnterprisePanel_05nuo(panel){
    // const height = window.innerHeight;

    // let h = height + transitText_05nuo.offsetHeight * 1.5;
    // panel.style.setProperty("height", `${h}px`);
}

// function responsiveRotateText_05nuo(){
//     responsiveTransitRotText_05nuo(transitRotText_05nuo, transitRotTextPlaceholder_05nuo);
//     responsiveTransitRotText_05nuo(transitRotText2_05nuo, transitRotTextPlaceholder2_05nuo);
// }

function resizeHero_05nuo(state=0){
    if(svgScrollTriggerPoints_05nuo){
        state = svgScrollTriggerPoints_05nuo.scrollState;
    }
    responsiveSVG_05nuo(fullHeader_05nuo, svg_05nuo, headerTitle_05nuo,state);
}

function responsiveTitle_05nuo(){
    responsiveHeaderTitle(headerTitle_05nuo);
    responsiveFonts(fullHeader_05nuo);
    // responsiveRotateText_05nuo();
}

/*************************************************************************************************
 * ********************************** transition for button, in between texts**************************
 * ***************************************************************************************************
 */
// let hasHideSignInButton_05nuo = true;

// function signInButtonAppear_05nuo(){
//     signInButton_05nuo.style.setProperty("animation", "none");
//     signInButton_05nuo.style.setProperty("animation", "button-rotate-down-05nuo 0.65s cubic-bezier(.25,-0.07,.67,1.84) 0s 1 normal both");
// }

// function signInButtonDisappear_05nuo(){
//     signInButton_05nuo.style.setProperty("animation", "none");
//     signInButton_05nuo.style.setProperty("animation", "button-rotate-up-05nuo 0.65s cubic-bezier(.25,-0.07,.67,1.84) 0s 1 normal both");
// }

// function showHideSignInButton_05nuo(){
//     if(isTitleScroll_05nuo){
//         if(hasHideSignInButton_05nuo){
//             signInButtonAppear_05nuo();
//             hasHideSignInButton_05nuo = false;
//         }
//     }
//     else{
//         if(!hasHideSignInButton_05nuo){
//             signInButtonDisappear_05nuo();
//             hasHideSignInButton_05nuo = true;
//         }
//     }
// }

// function signInButtonOnHover_05nuo(){
//     signInButton_05nuo.style.setProperty("box-shadow", "0 0 20px rgb(243, 237, 149), inset 0 0 15px rgba(114, 146, 44, 0.75)");
// }

// function signInButtonOffHover_05nuo(){
//     signInButton_05nuo.style.setProperty("box-shadow", "none");
// }

// function setButtonHoverEffects_05nuo(){
//     signInButton_05nuo.addEventListener("mouseenter", signInButtonOnHover_05nuo, eventListenerOption_05nuo);
//     signInButton_05nuo.addEventListener("touchstart", signInButtonOnHover_05nuo, eventListenerOption_05nuo);
//     signInButton_05nuo.addEventListener("mouseleave", signInButtonOffHover_05nuo, eventListenerOption_05nuo);
//     signInButton_05nuo.addEventListener("touchend", signInButtonOffHover_05nuo, eventListenerOption_05nuo);
// }




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
    const speed = 1.5;
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
const institutionPanel_05nuo = document.getElementById("institution-panel-05nuo");
const associationPanel_05nuo = document.getElementById("association-panel-05nuo");

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
let svgBgGradientY2_05nuo = 400;
let svgBgGradientY1_05nuo = 0;
let svgBgGradientFactor_05nuo = 300;

//svgScroll lerp values
let lastScrollSVGLerpTime_05nuo = undefined;
let scrollLerpAnim_05nuo = undefined;
let svgScrollLerpSpeed_05nuo = 0.005;

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
        startPosY_05nuo = svgTop_05nuo;
        if(width < widthLimit_05nuo && width < height){
            // targetPosY_05nuo = enterprisePanel_05nuo.offsetTop + transitText_05nuo.offsetHeight * 1.7;
            targetPosY_05nuo = enterprisePanel_05nuo.offsetTop + enterprisePanel_05nuo.offsetHeight * 0.1 - svgHeight_05nuo * 0.4 ;
        }
        else{
            // targetPosY_05nuo = enterprisePanel_05nuo.offsetTop + (enterprisePanel_05nuo.offsetHeight - svgHeight_05nuo + transitText_05nuo.offsetHeight*1.5) / 2;
            targetPosY_05nuo = enterprisePanel_05nuo.offsetTop + (enterprisePanel_05nuo.offsetHeight - svgHeight_05nuo) / 2;
        }
    }
    else if(state === 1){
        startSvgScroll_05nuo = svgScrollTriggerPoints_05nuo.start2;
        endSvgScroll_05nuo = svgScrollTriggerPoints_05nuo.end2;

        if(width < widthLimit_05nuo && width < height){
            startPosY_05nuo = enterprisePanel_05nuo.offsetTop + enterprisePanel_05nuo.offsetHeight * 0.1 - svgHeight_05nuo * 0.4 ;
            targetPosY_05nuo = institutionPanel_05nuo.offsetTop + institutionPanel_05nuo.offsetHeight * 0.1 - svgHeight_05nuo * 0.4;
        }
        else{
            startPosY_05nuo = enterprisePanel_05nuo.offsetTop + (enterprisePanel_05nuo.offsetHeight - svgHeight_05nuo) / 2;
            targetPosY_05nuo = institutionPanel_05nuo.offsetTop + (institutionPanel_05nuo.offsetHeight - svgHeight_05nuo) / 2;
        }
    }
    else if(state === 2){
        startSvgScroll_05nuo = svgScrollTriggerPoints_05nuo.start3;
        endSvgScroll_05nuo = svgScrollTriggerPoints_05nuo.end3;

        if(width < widthLimit_05nuo && width < height){
            startPosY_05nuo = institutionPanel_05nuo.offsetTop + institutionPanel_05nuo.offsetHeight * 0.1 - svgHeight_05nuo * 0.4;
            targetPosY_05nuo = associationPanel_05nuo.offsetTop + associationPanel_05nuo.offsetHeight * 0.5 - svgHeight_05nuo * 0.4;
        }
        else{
            startPosY_05nuo = institutionPanel_05nuo.offsetTop + (institutionPanel_05nuo.offsetHeight - svgHeight_05nuo) / 2;
            targetPosY_05nuo = associationPanel_05nuo.offsetTop + (associationPanel_05nuo.offsetHeight - svgHeight_05nuo) / 2;
        }
    }

    return {startSvgScroll_05nuo, endSvgScroll_05nuo, startPosY_05nuo, targetPosY_05nuo}
}

//set start, end scroll animation position and scroll animation targets
function scrollSvg_05nuo(){
    //init start and end points
    svgScrollTriggerPoints_05nuo.init(
        svgTop_05nuo + svgHeight_05nuo * 0.15, enterprisePanel_05nuo.offsetTop*0.9,
        enterprisePanel_05nuo.offsetTop + enterprisePanel_05nuo.offsetHeight * 0.15, institutionPanel_05nuo.offsetTop*0.9,
        institutionPanel_05nuo.offsetTop + institutionPanel_05nuo.offsetHeight * 0.15, associationPanel_05nuo.offsetTop*0.9);

    svgScrollTriggerPoints_05nuo.updateScrollState(window.scrollY);
    let state = svgScrollTriggerPoints_05nuo.scrollState;

    //get start end points and start target pos based on scroll state
    let {startSvgScroll_05nuo, endSvgScroll_05nuo, startPosY_05nuo, targetPosY_05nuo} = getScrollStartEndTargets(state);
    resizeHero_05nuo();
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
            requestTimeout(()=>{
                if(!isSvgScroll_05nuo){
                    svgPanStartCheck(svg_05nuo);
                }
            }, 300); 
            resizeHero_05nuo();
            // responsiveSignInButton_05nuo(signInButton_05nuo);
            // responsiveTransitText(transitText_05nuo, fullHeader_05nuo);
        }

        if(!hasReduceSvgOnScroll_05nuo && window.scrollY >= svgScrollTriggerPoints_05nuo.end1 * 0.8){
            hasReduceSvgOnScroll_05nuo = true;
            resizeHero_05nuo();
            // responsiveSignInButton_05nuo(signInButton_05nuo);
            // responsiveTransitText(transitText_05nuo, fullHeader_05nuo);
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
            }, 300);
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
            }, 300);
        }
    }

    let scrollPercent = (lastScrollY_05nuo - startSvgScroll_05nuo) / (endSvgScroll_05nuo - startSvgScroll_05nuo); 
    lastScrollTarget_05nuo = scrollPercent * (targetPosY_05nuo - startPosY_05nuo) + startPosY_05nuo - svgTop_05nuo;
    //scroll animate svg clip path
    lastClipAnimSeek_05nuo = scrollPercent / 3 + state / 3;

    //change gradient pos y1 y2 values
    let gradient_y1 = svgBgGradientY1_05nuo - svgBgGradientFactor_05nuo * lastClipAnimSeek_05nuo;
    let gradient_y2 = svgBgGradientY2_05nuo - svgBgGradientFactor_05nuo * lastClipAnimSeek_05nuo;
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

function scrollTitle_05nuo(){
    let scrollY = window.scrollY;
    if(!isTitleScroll_05nuo && scrollY >= headerTitle_05nuo.offsetHeight * 0.65){
        isTitleScroll_05nuo = true;
        responsiveHeaderTitle(headerTitle_05nuo);
        resizeHero_05nuo();
    }
    else if(isTitleScroll_05nuo && scrollY < headerTitle_05nuo.offsetHeight * 0.65){
        isTitleScroll_05nuo = false;
        responsiveHeaderTitle(headerTitle_05nuo);
        resizeHero_05nuo();
    }
}

//snap scroll and precent default scroll
class ControlScroll_05nuo{
    constructor(){
        // left: 37, up: 38, right: 39, down: 40,
        // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
        this.keys = {37: 1, 38: 1, 39: 1, 40: 1};
        this.wheelOpt = supportPassive_05nuo ? { passive: false } : false;
        this.wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

        //reset scrollPos
        window.scrollTo(0, 0);
        //scroll status for scrolling in each panel
        this.currentStats = {
            getTargetPos: function (target){
                if(target === 0){
                    return 0;
                }
                else if(target === 1){
                    return enterprisePanel_05nuo.offsetTop;
                }
                else if(target === 2){
                    return institutionPanel_05nuo.offsetTop;
                }
                else if(target === 3){
                    return associationPanel_05nuo.offsetTop;
                }
            },
            curPanel:0,
            updateCurPanel: function(scrollY){
                const p0Start = 0;
                const p0End = fullHeader_05nuo.offsetTop + fullHeader_05nuo.offsetHeight;
                const p1End = enterprisePanel_05nuo.offsetTop + enterprisePanel_05nuo.offsetHeight;
                const p2End = institutionPanel_05nuo.offsetTop + institutionPanel_05nuo.offsetHeight;

                if(scrollY >= p0Start && scrollY < p0End){
                    this.curPanel = 0;
                }
                else if(scrollY >= p0End && scrollY < p1End){
                    this.curPanel = 1;
                }
                else if(scrollY >= p1End && scrollY < p2End){
                    this.curPanel = 2;
                }
                else{
                    this.curPanel = 3;
                }

                console.log(this.curPanel);
            }
        }

        this.currentScrollPos = window.scrollY;
        this.targetScrollPos = this.currentScrollPos;
        this.scrollLerpSpeed = 0.05;
        this.scrollLerpLastTime = undefined;
        this.scrollLerpAnim = undefined;
    }

    preventDefault(e) {
        e.preventDefault();
    }

    preventDefaultForScrollKeys(e) {
        if (this.keys[e.keyCode]) {
            preventDefault(e);
            return true;
        }
        return false;
    }

    scrollLerp(timestamp){
        if(this.scrollLerpLastTime === undefined){
            this.scrollLerpLastTime = timestamp;
        }

        let deltaTime = (timestamp - this.scrollLerpLastTime) / 1000;
        this.scrollLerpLastTime = timestamp;

        this.currentScrollPos = lerp_05nuo(this.currentScrollPos, this.targetScrollPos, this.scrollLerpSpeed, deltaTime);

        window.scrollTo(0, this.currentScrollPos);
        scrollSvg_05nuo();

        if(Math.abs(this.currentScrollPos - this.targetScrollPos) <= 1){
            cancelAnimationFrame(this.scrollLerpAnim);
            this.enbaleScroll();
            this.currentStats.updateCurPanel(window.scrollY);
        }
        else{
            cancelAnimationFrame(this.scrollLerpAnim);
            this.scrollLerpAnim = requestAnimFrame(this.scrollLerp.bind(this));
        }
    }

    snapScroll(targetPanelIdx){
        //disable normal scroll function
        this.disableScroll();

        //update target scroll pos
        this.targetScrollPos = this.currentStats.getTargetPos(targetPanelIdx);

        cancelAnimationFrame(this.scrollLerpAnim);
        this.scrollLerpAnim = requestAnimFrame(this.scrollLerp.bind(this));
    }

    disableScroll() {
        window.addEventListener('DOMMouseScroll', this.preventDefault, false); // older FF
        window.addEventListener(this.wheelEvent, this.preventDefault, this.wheelOpt); // modern desktop
        window.addEventListener('touchmove', this.preventDefault, this.wheelOpt); // mobile
        window.addEventListener('keydown', this.preventDefaultForScrollKeys.bind(this), false);
    }

    enbaleScroll(){
        window.removeEventListener('DOMMouseScroll', this.preventDefault, false); // older FF
        window.removeEventListener(this.wheelEvent, this.preventDefault, this.wheelOpt); // modern desktop
        window.removeEventListener('touchmove', this.preventDefault, this.wheelOpt); // mobile
        window.removeEventListener('keydown', this.preventDefaultForScrollKeys.bind(this), false);  
    }
}
    
const controlScroll_05nuo = new ControlScroll_05nuo();

function scrollFunc_05nuo(){
    window.addEventListener("scroll", scrollSvg_05nuo, eventListenerOption_05nuo);
    window.addEventListener("scroll", scrollTitle_05nuo, eventListenerOption_05nuo);
    window.addEventListener("scroll", ()=>{
        controlScroll_05nuo.currentStats.updateCurPanel(window.scrollY);
    }, eventListenerOption_05nuo);
    // window.addEventListener("scroll", showHideSignInButton_05nuo, eventListenerOption_05nuo);
}

/* ********************************************************************************************************
************************************** cube text rotate animation ****************************************
***********************************************************************************************************/

// let titleAnim_05nuo;
// const titleAnimInterval_05nuo = 1700;
// let titleRotationL_05nuo = 0
// let titleRotationR_05nuo = 0
// let currentTitleRotation_05nuo = 0;
// let hasResetTransitionTitleAnim_05nuo = true;
// let currentTimeTitleAnim_05nuo = undefined;


// function titleRotate_05nuo(text1, text2, timestamp){
//     currentTimeTitleAnim_05nuo = timestamp;
//     currentTitleRotation_05nuo = (currentTitleRotation_05nuo + 1) % 4;

//     //reset rotation degree without rendered transition
//     if(titleRotationL_05nuo >= 360){
//         text1.style.setProperty("--transform-transition-time-05nuo", "0s");
//         text2.style.setProperty("--transform-transition-time-05nuo", "0s");
//         titleRotationL_05nuo = titleRotationL_05nuo % 360;
//         titleRotationR_05nuo = titleRotationR_05nuo % 360;
//         text1.style.setProperty("--cube-rotate-05nuo", `${titleRotationL_05nuo}deg`);
//         text2.style.setProperty("--cube-rotate2-05nuo", `${titleRotationR_05nuo}deg`);
//         currentTimeTitleAnim_05nuo = timestamp - titleAnimInterval_05nuo + 10;
//         hasResetTransitionTitleAnim_05nuo = false;
//     }
//     else{
//         if(!hasResetTransitionTitleAnim_05nuo){
//             text1.style.setProperty("--transform-transition-time-05nuo", "1s");
//             text2.style.setProperty("--transform-transition-time-05nuo", "1s");
//             hasResetTransitionTitleAnim_05nuo = true;
//         }
//         titleRotationL_05nuo += 90;
//         titleRotationR_05nuo -= 90;

//         text1.style.setProperty("--cube-rotate-05nuo", `${titleRotationL_05nuo}deg`);
//         text2.style.setProperty("--cube-rotate2-05nuo", `${titleRotationR_05nuo}deg`);
//     }
// }


// function titleRotateAnimate_05nuo(timestamp){
//     if(currentTimeTitleAnim_05nuo == undefined){
//         currentTimeTitleAnim_05nuo = timestamp;
//     }
//     let elapse = timestamp - currentTimeTitleAnim_05nuo;
//     if(elapse >= titleAnimInterval_05nuo){
//         titleRotate_05nuo(transitRotText_05nuo, transitRotText2_05nuo, timestamp);
//     }

//     cancelAnimationFrame(titleAnim_05nuo);
//     titleAnim_05nuo = requestAnimFrame(titleRotateAnimate_05nuo);
// }

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
    responsiveNavButton_05nuo();
    responsiveTitle_05nuo();
    resizeHero_05nuo();
    // responsiveSignInButton_05nuo(signInButton_05nuo);
    // responsiveTransitText(transitText_05nuo, fullHeader_05nuo);
    // responsiveRotateText_05nuo();
    responsiveEnterprisePanel_05nuo(enterprisePanel_05nuo);
    svgPanStartCheck(svg_05nuo);
    scrollSvg_05nuo();

}

const startTitleAnim_05nuo = function(){
    const subtitle = headerTitle_05nuo.children.item(0);
    const subtitleLine1 = subtitle.children.item(0);
    const subtitleLine2 = subtitle.children.item(2);

    requestTimeout(()=>{
        subtitleLine1.style.setProperty("background", "rgba(247, 247, 247, 0.5)")
        subtitleLine2.style.setProperty("background", "rgba(247, 247, 247, 0.5)")
    }, 1400);
}

requestTimeout(responsiveFunc_05nuo, 0);
requestTimeout(responsiveFunc_05nuo, 100);

window.addEventListener("resize", responsiveFunc_05nuo);
document.addEventListener('DOMContentLoaded', ()=>{
    //start animation for titles
    startTitleAnim_05nuo();
    //start listen to scroll events
    scrollFunc_05nuo();
    //start transit text cube roate animation
    // titleAnim_05nuo = requestAnimFrame(titleRotateAnimate_05nuo);
    // setButtonHoverEffects_05nuo()
});
