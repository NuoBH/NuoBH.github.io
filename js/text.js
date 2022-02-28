class CubeContent{
    constructor(){

    }
    
    addTitle(face, str, factor=1.75){
        let textDOM = face.children[0];

        let titleDOM = document.createElement(`div`);
        titleDOM.classList.add(`title`);
        titleDOM.innerHTML = str;
        textDOM.prepend(titleDOM);

        let cube = face.parentElement.id.includes("instruction") ? chatCube : archiveCube;

        let fontSize = cube.targetFaceHeightFour / factor
        titleDOM.style.setProperty(`font-size`, `${fontSize}px`);
        titleDOM.style.setProperty(`opacity`, `1`);

        window.addEventListener(`resize`, ()=>{this.resizeTitle(titleDOM, factor, cube)});
        titleDOM.addEventListener(`resizeTitle`, ()=>{this.resizeTitle(titleDOM, factor, cube)});
    }

    resizeTitle(title, factor, cube){
        title.style.setProperty(`font-size`, `${cube.targetFaceHeightFour / factor}px`);
    }

    scrollDown(textToSend){
        // let padding = parseFloat(getComputedStyle(textDOM).getPropertyValue(`padding-bottom`));

        scrollIntoView(textToSend, {
            time: 1000,
            align:{ top: 0 } 
        });

        requestTimeout(function(){
            textToSend.classList.add(`send`);
        }, 350);
    }

    addChat(face, str){
        let textDOM = face.children[0];

        let chatDOM = document.createElement(`p`);
        chatDOM.classList.add(`paragraph`);
        chatDOM.classList.add(`chat`);
        chatDOM.innerHTML = str;
        textDOM.append(chatDOM);

        this.scrollDown(chatDOM);
    }

    addResponse(face, str){
        let textDOM = face.children[0];

        let responseDOM = document.createElement(`p`);
        responseDOM.classList.add(`paragraph`);
        responseDOM.classList.add(`response`);
        responseDOM.innerHTML = str;
        textDOM.append(responseDOM);

        this.scrollDown(responseDOM);
    }

    addSlider(face, id, min, max, initialVal){
        let textDOM = face.children[0];
        
        let slider = document.createElement(`input`);
        slider.setAttribute(`type`, `range`);
        slider.setAttribute(`min`, `${min}`);
        slider.setAttribute(`max`, `${max}`);
        slider.setAttribute(`value`, `${initialVal}`);
        
        slider.classList.add(`slider`);
        slider.id = id;

        let sliderVal = document.createElement(`div`);
        sliderVal.classList.add("paragraph", "response");
        sliderVal.innerHTML = slider.value;

        textDOM.append(slider);
        textDOM.append(sliderVal);

        slider.addEventListener(`input`, this.changeSliderCircle);
        slider.addEventListener(`sliderMove`, this.changeSliderCircle);

        slider.addEventListener('touchstart', function(){
            canAddScroll = false;
        });

        slider.addEventListener('touchend', function(){
            canAddScroll = true;
        });

        if(slider.previousElementSibling.classList.value.includes('videoContainer') ||
           slider.previousElementSibling.classList.value.includes('textInput') ||
           slider.previousElementSibling.classList.value.includes('title')){
            slider.previousElementSibling.style.setProperty(`margin-bottom`, `5%`);
        }
        else if(slider.previousElementSibling.classList.value.includes('image-cube')){
            ;
        }
        else{slider.previousElementSibling.style.setProperty(`padding-bottom`, `5%`);}

        this.scrollDown(slider);
        this.scrollDown(sliderVal);

        return slider;
    }

    changeSliderCircle(e){
        let val = e.target.value;
        let max = e.target.max;
        let min = e.target.min;

        let total = max - min;
        let scale = 1;
        let color = 0;

        if( total > Math.max(Math.abs(max), Math.abs(min)) ){
            scale = Math.abs(val) / ((max-min)*0.75);
            if(val <= 0){
                let maxmap = Math.max(Math.abs(max), Math.abs(min)) / ((max-min)*0.75)
                color = map(scale*50, 0, maxmap/2.5*50, 0, 255);

                color = Math.max(Math.min(255, color), 0);
            }
            else{
                color = 0;
            }
        }
        else{
            scale = Math.abs(val) / ((max-min)*1.5);
        }
        scale += 1;
        e.target.style.setProperty(`--scaling`, scale);
        e.target.style.setProperty(`--coloring`, color);
    }

    //works only for values with length = 3
    animateSlider(slider, values){
        let sliderVal = slider.nextElementSibling;

        let end = function(){
            $({val:values[2]}).animate({val:values[0]},            //stage 3 animate , loop back
                {duration: 1000,
                easing: "linear",
                step: function(now){
                    let n = Math.round(now * 100) / 100;
                    slider.value = now;
                    sliderVal.innerHTML =`%${n}`;

                    slider.dispatchEvent(sliderMoveEvent);
                },
                complete: function(){
                    requestTimeout(start, 500);
                }
            });
        }

        let state1 = function(){
            $({val:values[1]}).animate({val:values[2]},            //stage 2 animate
                {duration: 1000,
                easing: "linear",
                step: function(now){
                    let n = Math.round(now * 100) / 100;
                    slider.value = now;
                    sliderVal.innerHTML =`%${n}`;
                    
                    slider.dispatchEvent(sliderMoveEvent);
                },
                complete: function(){
                    requestTimeout(end, 500);
                }
            });
        }

        let start = function(){
            $({val:values[0]}).animate({val:values[1]},            //stage 1 animate
                {duration: 1000,
                easing: "linear",
                step: function(now){
                    let n = Math.round(now * 100) / 100;
                    slider.value = now;
                    sliderVal.innerHTML =`%${n}`;
                    
                    slider.dispatchEvent(sliderMoveEvent);
                },
                complete: function(){
                    requestTimeout(state1, 500);
                }
            });
        }

        start();
    }

    showVideo(face, src){
        let textDOM = face.children[0];

        let videoContainer = document.createElement(`div`);
        videoContainer.classList.add(`videoContainer`, `noselect`);

        let video = document.createElement(`video`);
        video.classList.add(`vid`, `noselect`);

        let source = document.createElement("source"); 
        source.type = "video/mp4";
        source.src = src;

        video.setAttribute(`controls`, `controls`);
        video.setAttribute(`playsinline`, `playsinline`);
        video.setAttribute(`webkit-playsinline`, `webkit-playsinline`);
        videoContainer.append(video);
        textDOM.append(videoContainer);
        this.scrollDown(videoContainer);

        requestTimeout(function(){
            //
            let vidShowFn = function(e){
                console.log(e.target.readyState)
                let vid = e == undefined ? video : e.target;
                let videoContainer = vid.parentElement;
                videoContainer.classList.add(`showVid`);

                requestTimeout(function(){
                    vid.classList.add(`show`);
                    this.snapToVideo(videoContainer, textDOM);

                    vid.addEventListener(`play`, function(){
                        this.snapToVideo(videoContainer, textDOM);
                    }.bind(this));

                }.bind(this), 750);
            }.bind(this);

            video.addEventListener(`canplay`, vidShowFn);

            video.append(source);

        }.bind(this), 1500);
    }
    
    snapToVideo(videoContainer, textDOM){
        let padding = parseFloat(getComputedStyle(textDOM).getPropertyValue(`padding-bottom`));

        scrollIntoView(videoContainer, {
            time: 1000,
            align: {
                    top: 0, 
                    topOffset: padding*0.85
                   }
        });
    }

    addInput(face, id, initialText=''){
        let textDOM = face.children[0];

        let input = document.createElement(`input`);
        input.setAttribute(`type`, `text`);
        input.id = id;
        input.classList.add(`textInput`);
        input.value = initialText;

        textDOM.append(input);

        this.scrollDown(input);

        return input;
    }

    addTextArea(face, text='', row='10'){
        let textDOM = face.children[0];

        let textArea = document.createElement(`textarea`);
        textArea.classList.add(`text-area`);
        textArea.innerHTML = text;
        textArea.cols = 30;
        textArea.rows = row;

        textDOM.append(textArea);

        this.scrollDown(textArea);

        return textArea;
    }
//class end    
}

var cubeContent = new CubeContent();
