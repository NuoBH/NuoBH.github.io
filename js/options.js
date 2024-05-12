class Option{
    constructor(){
        this.optionDomAnimFrame = undefined;
        this.whiteConnector = "<span class='white'>a</span>";
    }

    //apend option buttons to the end of textDOM
    //buttonTesxt is an array container texts for each button
    addOptionButtons(face, buttonTexts, addWhiteSpace=true, scrollUpToVideo=false){
        if(!Array.isArray(buttonTexts) || buttonTexts.length <= 0){
            console.debug("add option buttons, button texts not valid");
            return undefined;
        }

        let textDOM = face.children[0];

        //create option container and append to textDOM
        let optionDOM = document.createElement("div");
        optionDOM.classList.add("option-container");
        textDOM.append(optionDOM);

        //add option buttons to option container(optionDOM)
        for(let i = 0; i < buttonTexts.length; i ++){
            let button = document.createElement("div");
            button.classList.add("option-button");
            //add break after each option button so that when use cnterOptionButtons, it 
            //will get the correct offsetWidth of each <span> element of the buttons
            if(addWhiteSpace){
                button.innerHTML = `[${this.whiteConnector}${buttonTexts[i]}${this.whiteConnector}]<br>`;
            }
            else{
                button.innerHTML = `[ ${buttonTexts[i]} ]<br>`;      
            }
            this.onMouseTouchEnterOptionButton(button);
            this.onMouseTouchLeaveOptionButton(button);
            this.onMouseUpOptionButton(button, optionDOM, textDOM);
            optionDOM.appendChild(button);
        }

        //center all buttons in option container and update it when window is resized
        this.centerOptionButtons(optionDOM);
        window.addEventListener("resize", function(){
            clearRequestTimeout(this.optionDomAnimFrame);
            this.optionDomAnimFrame = requestTimeout(function(){
                    this.centerOptionButtons(optionDOM);
                }.bind(this), 250);
        }.bind(this));

        scrollIntoView(optionDOM, {
            time: 1000,
            align:{top: 1}
        });

        requestTimeout(function(){
            optionDOM.style.setProperty("--optionRotateX", "0deg");
            optionDOM.style.setProperty("--optionOpacity", "1");
            if(scrollUpToVideo){
                requestTimeout(function(){
                    scrollIntoView(optionDOM.previousElementSibling, {
                        time: 1000,
                        align:{top: 0.5}
                    });
                }, 900);
            }
        }, 350);

        return optionDOM;
    }

    addContinueButtons(face, buttonTexts){
        if(!Array.isArray(buttonTexts) || buttonTexts.length <= 0){
            console.debug("add continue buttons, button texts not valid");
            return undefined;
        }

        let textDOM = face.children[0];

        //create option container and append to textDOM
        let optionDOM = document.createElement("div");
        optionDOM.classList.add("option-container");
        textDOM.append(optionDOM);

        //add option buttons to option container(optionDOM)
        for(let i = 0; i < buttonTexts.length; i ++){
            let button = document.createElement("div");
            button.classList.add("option-button");
            //add break after each option button so that when use cnterOptionButtons, it 
            //will get the correct offsetWidth of each <span> element of the buttons
            button.innerHTML = `[${this.whiteConnector}${buttonTexts[i]}${this.whiteConnector}]<br>`;
            this.onMouseTouchEnterOptionButton(button);
            this.onMouseTouchLeaveOptionButton(button);
            this.onMouseUpContinueButton(button, optionDOM, textDOM);
            optionDOM.appendChild(button);
        }

        //center all buttons in option container and update it when window is resized
        this.centerOptionButtons(optionDOM);
        window.addEventListener("resize", function(){
            clearRequestTimeout(this.optionDomAnimFrame);
            this.optionDomAnimFrame = requestTimeout(function(){
                    this.centerOptionButtons(optionDOM);
                }.bind(this), 250);
        }.bind(this));

        scrollIntoView(optionDOM, {
            time: 1000,
            align:{top: 1}
        })

        requestTimeout(function(){
            optionDOM.style.setProperty("--optionRotateX", "0deg");
            optionDOM.style.setProperty("--optionOpacity", "1");
        }, 350);

        return optionDOM;
    }

    //center all option buttons in option container
    centerOptionButtons(optionDOM){
        if(optionDOM == undefined || optionDOM == null || 
            optionDOM.parentElement == null || optionDOM.parentElement == undefined){
            return;
        }

        //get parent width = target width - [padding size(20) + factor(5)]*2
        let padding = parseFloat(getComputedStyle(optionDOM.parentElement).getPropertyValue(`padding-left`));
        let parentWidth = chatCube.targetFaceWidthFour - (padding + 5) * 2;
        let maxWidth = parentWidth - parentWidth / 3;

        let incrementSteps = 0;
        let childWidthIncrement = 0;
        let childrenToSet = [];
        let buttons = optionDOM.children;

        //reset all buttons by adding <br> at end
        for(let i = 0; i < buttons.length; i ++){
            if(buttons[i].innerHTML.slice(-4) != "<br>"){
                buttons[i].innerHTML = buttons[i].innerHTML + "<br>";
            }
        }

        for(let i = 0; i < buttons.length; i++){
            childWidthIncrement += buttons[i].offsetWidth;
            incrementSteps += 1;
            childrenToSet.push(buttons[i]);

            let margin;
            //if all previous children width overflows set margin
            if(childWidthIncrement >= maxWidth){
                //if total two or more buttons overflow, subtract current button width and set all previous
                //button margin
                if(incrementSteps > 1){
                    //removed the overflowed button from the list of buttons to be set
                    childWidthIncrement -= buttons[i].offsetWidth;
                    incrementSteps -= 1; 
                    childrenToSet.pop();
                    //if there are more than one button on one line, calculate the margins
                    if(incrementSteps > 1){
                        margin = (parentWidth - childWidthIncrement) / (incrementSteps * 2);

                        //set margin of children to set
                        for(let j = 0; j < childrenToSet.length; j++){
                            childrenToSet[j].style.setProperty("--buttonMargin", `${margin}px`);
                            childrenToSet[j].style.setProperty("--buttonMargin", `${margin}px`);
                            if(j < childrenToSet.length - 1){
                                childrenToSet[j].innerHTML = childrenToSet[j].innerHTML.slice(0,-4);
                            }
                        }
                    }
                    //if only one button a line, set the margin to auto
                    else{
                        margin = 0;
                        childrenToSet[0].style.setProperty("--buttonMargin", `auto`);
                        childrenToSet[0].style.setProperty("--buttonMargin", `auto`);
                    }
                    //back one step, to set current button margin if overflows with this button included
                    i -= 1;
                }
                //do not set button margin if the single button(increment = 1) overflows
                else {
                    margin = 0;
                    childrenToSet[0].style.setProperty("--buttonMargin", `auto`);
                    childrenToSet[0].style.setProperty("--buttonMargin", `auto`);
                }
                //reset incrememnts
                childWidthIncrement = 0;
                incrementSteps = 0;
                childrenToSet = [];
            }
        }

        if(incrementSteps > 0){
            let margin;
            if(incrementSteps > 1){
                margin = (parentWidth - childWidthIncrement) / (incrementSteps * 2);
                for(let j = 0; j < childrenToSet.length; j++){
                    childrenToSet[j].style.setProperty("--buttonMargin", `${margin}px`);
                    childrenToSet[j].style.setProperty("--buttonMargin", `${margin}px`);
                    if(j < childrenToSet.length - 1){
                        childrenToSet[j].innerHTML = childrenToSet[j].innerHTML.slice(0,-4);
                    }
                }
            }
            else{
                margin = 0;
                childrenToSet[0].style.setProperty("--buttonMargin", `auto`);
                childrenToSet[0].style.setProperty("--buttonMargin", `auto`);
            }
        }
    }

/***************** help function ************/
    hoverChange(button, state){
        if(button == undefined || button == null){
            console.debug(`button is not defined`);
            return;
        }

        if(state != 0 && state != 1){
            console.debug(`state error`);
            return;
        }

        // 0 is mouse enter; 1 is mouse leave
        if(state == 0){
            if(!mobileAndTabletCheck() && !isSafari){
                button.style.setProperty("font-weight", "bold");
            }
            button.style.setProperty("--buttonTextDecoration", "underline");
        }
        else{
            button.style.setProperty("font-weight", "normal");
            button.style.setProperty("--buttonTextDecoration", "none");
        }

    }

    //help function on click / tap option and continue buttons
    clickOnButtons(button, optionDOM, textDOM, isContinue=false){
        if((!isContinue && !hasClickedLastOption) || 
            (isContinue && !hasClickedLastContinue)){
            // console.log("start of button");
            if(!isContinue){
                hasClickedLastOption = true;
            }
            else{
                hasClickedLastContinue = true;
            }

            let chosenText = button.innerHTML;
            if(chosenText.slice(-4) == '<br>'){
                chosenText = chosenText.slice(0, -4);
            }

            lastResponse = chosenText;

            if(!isContinue){
                let prev = optionDOM.previousElementSibling;
                
                if(prev.classList.value.includes('videoContainer')){
                    cubeContent.snapToVideo(prev, textDOM);
                }
                else if(prev.classList.value.includes('imag-cube')){
                    let padding = parseFloat(getComputedStyle(textDOM).getPropertyValue(`padding-bottom`));

                    optionDOM.style.setProperty("--optionRotateX", "90deg");
                    optionDOM.style.setProperty("--optionOpacity", "0");

                    scrollIntoView(prev, {
                        time: 1000,
                        align:{top: 0.5, topOffset: padding}
                    })
                }
                else if(prev.classList.value.includes('textInput')){
                    optionDOM.style.setProperty("--optionRotateX", "90deg");
                    optionDOM.style.setProperty("--optionOpacity", "0");

                    scrollIntoView(prev, {
                        time: 1000,
                        align:{top: 1}
                    })
                }
                else{
                    let padding = parseFloat(getComputedStyle(textDOM).getPropertyValue(`padding-bottom`));

                    optionDOM.style.setProperty("--optionRotateX", "90deg");
                    optionDOM.style.setProperty("--optionOpacity", "0");

                    scrollIntoView(prev, {
                        time: 1000,
                        align:{top: 1, topOffset: padding*4}
                    })
                }
            }
            else{
                optionDOM.style.setProperty("--optionRotateX", "90deg");
                optionDOM.style.setProperty("--optionOpacity", "0");
            }

            requestTimeout(function(){
                if(!isContinue){
                    /*********** add chosen text here!!! ************/
                    if(!chosenText.includes(`--&gt`)){
                        cubeContent.addResponse(textDOM.parentElement, chosenText);
                    }

                    optionDOM.dispatchEvent(optionEndedEvent);
                    hasClickedLastOption = false;
                    // console.log("end of option button");
                }
                else{
                    /********** rotate face here!!! ****************/
                    optionDOM.dispatchEvent(rotateFaceEvent);
                    optionDOM.style.setProperty("--optionRotateX", "0deg");
                    optionDOM.style.setProperty("--optionOpacity", "1");
                    // console.log("end of continue button");
                }       
            }, 900);
        }
    }

/************ */


    /************* mouse and touch event for option buttons ***********/
    //handle hover mouse enter or touch start
    onMouseTouchEnterOptionButton(button){
        button.addEventListener("mouseenter", function(){
            this.hoverChange(button, 0);
        }.bind(this));

        button.addEventListener("touchstart", function(ev){
            if(ev.cancelable){
                ev.preventDefault();
            }
            canAddScroll = false;
            this.hoverChange(button, 0);
        }.bind(this));
    }

    //handle hover mouse leave or touch end
    onMouseTouchLeaveOptionButton(button){
        button.addEventListener("mouseleave", function(){
            this.hoverChange(button, 1);
        }.bind(this));
    }

    //handle click or tap on option buttons
    onMouseUpOptionButton(button, optionDOM, textDOM){
        //mouse up
        button.addEventListener("mouseup", function(){
            this.clickOnButtons(button, optionDOM, textDOM);
        }.bind(this));

        //touch end 
        button.addEventListener("touchend", function(ev){
            //hover end
            if(ev.cancelable){
                ev.preventDefault();
            }
            this.hoverChange(button, 1);
            canAddScroll = true;
            //click button
            this.clickOnButtons(button, optionDOM, textDOM);
        }.bind(this));
    }

    //handle click or tap on continue buttons (click and rotate face)
    onMouseUpContinueButton(button, optionDOM, textDOM){
        //mouse up
        button.addEventListener("mouseup", function(){
            this.clickOnButtons(button, optionDOM, textDOM, true);
        }.bind(this));

        //touch end 
        button.addEventListener("touchend", function(ev){
            //hover end
            if(ev.cancelable){
                ev.preventDefault();
            }
            this.hoverChange(button, 1);
            canAddScroll = true;
            //click button
            this.clickOnButtons(button, optionDOM, textDOM, true);
        }.bind(this));
    }
//class ends
}

let optionCreator = new Option();






