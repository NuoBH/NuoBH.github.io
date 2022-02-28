function addImageCube(id, face, mediaLinks, isVideoCube=false, videoCubeAutoPlay=false, addBorder=false, isArchiveImageCube = false){
    if(!Array.isArray(mediaLinks) || mediaLinks.length != 6){
        console.debug("add image cube, media links not valid");
        return;
    }

    let textDOM = face.children[0];
    let imageCubeDOM = document.createElement("div");
    imageCubeDOM.id = id;
    let classNamePre = isVideoCube ? "video" : "image";

    imageCubeDOM.classList.add("media-cube", `${classNamePre}-cube`, "noselect");

    let faceClasses = [`${classNamePre}-cube-front`, `${classNamePre}-cube-left`, `${classNamePre}-cube-right`, 
                       `${classNamePre}-cube-top`, `${classNamePre}-cube-bottom`, `${classNamePre}-cube-back`];
    let allFaceClass = `${classNamePre}-cube-face`;
    let mediaClass = `${classNamePre}-cube-media`;
    let dragClass = "todrag";

    for(let i = 0; i < faceClasses.length; i ++){
        let faceDOM = document.createElement("div");
        faceDOM.classList.add(`${allFaceClass}`, `${faceClasses[i]}`);
        if(isVideoCube){
            if(i == 0 || i == 3 || i == 4 || i == 5){
                faceDOM.classList.add('video-cube-face-regular');
            }
            else{
                faceDOM.classList.add('video-cube-face-small');
            }
        }
        else{
            if(addBorder){
                faceDOM.classList.add("add-border");
            }
        }

        let filepath = mediaLinks[i];
        let fileExtension = filepath.split('.').pop().toLowerCase();

        if( fileExtension == "jpg" || fileExtension == "jpeg" || fileExtension == "png" || fileExtension == "gif"){
            let mediaDOM = document.createElement("img");
            mediaDOM.classList.add(`${mediaClass}`);
            mediaDOM.src = filepath;

            let cover = document.createElement("div");
            cover.classList.add(`${mediaClass}`, `${dragClass}`);

            faceDOM.appendChild(mediaDOM);
            faceDOM.appendChild(cover);
        }
        else if(fileExtension == "mp4" || fileExtension == "mov" || fileExtension == "mkv"){
            let mediaDOM = document.createElement("video");
            mediaDOM.classList.add(`${mediaClass}`, `${dragClass}`);

            if(!isVideoCube || (isVideoCube && videoCubeAutoPlay && !mobileAndTabletCheck()) 
            || (filepath.toLowerCase().includes("animation") && !mobileAndTabletCheck()) ){
                mediaDOM.setAttribute("autoplay", "autoplay");
                mediaDOM.setAttribute("loop", "loop");
                mediaDOM.setAttribute("muted", "muted");
            }
            mediaDOM.setAttribute("playsinline", "playsinline");
            mediaDOM.setAttribute(`webkit-playsinline`, `webkit-playsinline`);

            let sourceDOM = document.createElement("source");
            sourceDOM.src = filepath;
            sourceDOM.type = `video/${fileExtension}`;

            mediaDOM.appendChild(sourceDOM);
            faceDOM.appendChild(mediaDOM);
        }
        imageCubeDOM.appendChild(faceDOM);
    }

    textDOM.appendChild(imageCubeDOM);

    scrollIntoView(imageCubeDOM, {
        time: 1000,
        align:{top: 0.5}
    })

    requestTimeout(()=>{
        $(imageCubeDOM).children().css(`opacity`, `1`);
    }, 200);

    let lerpSpeed = 0.1;
    if(isVideoCube){
        lerpSpeed = 0.35;
    }

    return new ImageCube(id, -15, 30, lerpSpeed, isVideoCube, videoCubeAutoPlay, isArchiveImageCube);
}

class ImageCube{
    constructor(id, startRotateX, startRotateY, lerpV, isVideoCube, videoCubeAutoPlay, isArchiveImageCube){
        this.cube = document.getElementById(id);

        //properties used to rotate cube
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.XDeg = startRotateX + 1;
        this.YDeg = startRotateY + 1;

        this.isDragging = false;

        //properties used to lerp rotation
        this.lastRotateAF = undefined;
        this.rotateCubeAnimFrame = undefined;
        this.lerpSpeed = lerpV;

        //used to test if touch moves on mobile after touch start
        this.hasTouchMoved = false;

        //if this cube contains only video
        this.isVideoCube = isVideoCube;
        this.videoCubeAutoPlay = videoCubeAutoPlay;

        //set video hover show control effect
        this.videos = this.cube.querySelectorAll("video");
        if(this.videos.length > 0){
            for(var i = 0; i < this.videos.length; i ++){
                this.videos[i].addEventListener("mouseenter", function(ev){
                    if(!this.isDragging){
                        if(ev.cancelable){
                            ev.preventDefault();
                        }
                        ev.target.setAttribute("controls", "controls");
                    }
                }.bind(this));

                this.videos[i].addEventListener("mouseleave", function(ev){
                    if(!this.isDragging){
                        if(ev.cancelable){
                            ev.preventDefault();
                        }
                        ev.target.removeAttribute("controls");
                    }
                }.bind(this));
            }

            //show video controls at start if device is mobile
            if(mobileAndTabletCheck()){
                ImageCube.showAllVideoControls(this.videos);
            }
        }

        if(this.isVideoCube){
            this.setVideoCube();
        }

        if(isArchiveImageCube){
            this.videos.forEach(function(vid){
                vid.muted = true;
            });
        }

        this.dragRotate();

        this.checkBlur();

        this.resizeCube();

        window.addEventListener("resize", this.resizeCube.bind(this));
        this.cube.addEventListener("resizeImageCube", this.resizeCube.bind(this));
    }

    resizeCube(){
        let cubeDOM = this.cube.parentElement.parentElement.parentElement;

        if(this.isVideoCube){
            let resizeH = cubeDOM.offsetHeight * 0.735;
            let resizeW = resizeH * 16 / 9;
            this.cube.style.setProperty("--faceWidth", `${resizeW}px`);
            this.cube.style.setProperty("--faceHeight", `${resizeH}px`);
        }
        else{
            let resizeS = cubeDOM.offsetHeight * 0.65;
            this.cube.style.setProperty("--faceSize", `${resizeS}px`);
        }
    }
    
    /** ---------------------------helper functions-------------------------- */

    //hide or show videos controls --- vids --- is a NodeList
    static hideAllVideoControls(vids){
        for(var i = 0; i < vids.length; i++){
            vids[i].removeAttribute("controls");
        }
    }

    static showAllVideoControls(vids){
        for(var i = 0; i < vids.length; i++){
            vids[i].setAttribute("controls", "controls");
        }
    }

    static checkSingleVideoControl(vid, action){
        if(action === undefined || (action !== 0 && action !== 1)){
            return;
        }

        //toggle if action is 1, do nothing if action is 0
        if(action === 1){
            if(vid.hasAttribute("controls")){
                vid.removeAttribute("controls");
            }
            else{
                vid.setAttribute("controls", "controls");
            }
        }
    }

    //check each video in vids and perform an action on their controls (show or hide)
    static checkAllVideoControls(vids, action){
        if(action === undefined || (action !== 0 && action !== 1)){
            return;
        }

        for(var i = 0; i < vids.length; i++){
            //toggle if action is 1, do nothing if action is 0
            ImageCube.checkSingleVideoControl(vids[i], action);
        }
    }

    /** -------------------------------------------------------------- */

    //function to rotate cube with mouse/touch
    rotateCubeByMousePos(ev){
        var deltaX;
        var deltaY;
        var speed;

        //if is mouse event, use mouse position to rotate cube
        if(ev.type === "mouseup" || ev.type === "mousedown" || ev.type === "mousemove"){
            deltaX = ev.pageX - this.lastMouseX;
            deltaY = ev.pageY - this.lastMouseY;

            this.lastMouseX = ev.pageX;
            this.lastMouseY = ev.pageY;

            speed = 0.32;
        }
        //if its touch event use touch pos to rotate cube
        else{
            var touch = ev.changedTouches[0];

            deltaX = touch.pageX - this.lastMouseX;
            deltaY = touch.pageY - this.lastMouseY;

            this.lastMouseX = touch.pageX;
            this.lastMouseY = touch.pageY;

            speed = 0.5;
        }

        //set the degree to rotate to
        this.YDeg += deltaX * speed;
        this.XDeg -= deltaY * speed;


    }

    //rotate cube using lerp
    rotateLerp(timestamp){
        if(this.lastRotateAF === undefined){
            this.lastRotateAF = timestamp;
        }

        //get delta time for lerp
        var curRotateAF = timestamp;
        var deltaTime = (curRotateAF - this.lastRotateAF)/1000;
        this.lastRotateAF = curRotateAF;

        //get current rotate degrees
        var curRotateX = parseFloat(getComputedStyle(this.cube).getPropertyValue("--imageRotateX"));
        var curRotateY = parseFloat(getComputedStyle(this.cube).getPropertyValue("--imageRotateY"));
        var targetX = this.XDeg;
        var targetY = this.YDeg;

        //lerp currrent rotation to target rotation
        curRotateX = lerp(curRotateX, targetX, 1 - Math.pow(this.lerpSpeed, deltaTime));
        curRotateY = lerp(curRotateY, targetY, 1 - Math.pow(this.lerpSpeed, deltaTime));
        //set rotate deg to css
        this.cube.style.setProperty("--imageRotateX", `${curRotateX}deg`);
        this.cube.style.setProperty("--imageRotateY", `${curRotateY}deg`);

        cancelAnimationFrame(this.rotateCubeAnimFrame);

        //test whether cur rotation is close enough to target rotation
        if(Math.abs(curRotateX - targetX) <= 0.05 && Math.abs(curRotateY - targetY) <= 0.05){
            this.lastRotateAF = undefined;
        }
        else{
            this.rotateCubeAnimFrame = requestAnimFrame(this.rotateLerp.bind(this));
        }

    }

    //drag that fires several events for rotating the cube
    dragRotate(){
        //all elements that can be dragged
        const media = this.cube.querySelectorAll(".todrag");

        //add event listeners to all draggable elements
        for(var i = 0; i < media.length; i ++){
            var node = media.item(i);

            if(node !== null && node !== undefined){
                node.addEventListener("mousedown", function(ev){
                    // if(ev.cancelable){
                    //     ev.preventDefault();
                    // }
                    this.isDragging = true;
                    this.lastMouseX = ev.pageX;
                    this.lastMouseY = ev.pageY;

                    cancelAnimationFrame(this.rotateCubeAnimFrame);
                    this.rotateCubeAnimFrame = requestAnimFrame(this.rotateLerp.bind(this));

                }.bind(this));

                node.addEventListener("touchstart", function(ev){
                    //mobile disable custom scroll on window
                    canAddScroll = false;
                    //adjust chat cube tilt to much smaller angles
                    chatCube.tiltXRate = 0.5;
                    chatCube.tiltYRate = 0.4;

                    if(ev.cancelable){
                        ev.preventDefault();
                    }
                    this.isDragging = true;
                    var touch = ev.changedTouches[0];
                    this.lastMouseX = touch.pageX;
                    this.lastMouseY = touch.pageY;
                    this.hasTouchMoved = false;
                    
                    cancelAnimationFrame(this.rotateCubeAnimFrame);
                    this.rotateCubeAnimFrame = requestAnimFrame(this.rotateLerp.bind(this));

                }.bind(this));

                node.addEventListener("mouseup", function(ev){
                    // if(ev.cancelable){
                    //     ev.preventDefault();
                    // }
                    this.isDragging = false;
                }.bind(this));

                node.addEventListener("touchend", function(ev){
                    if(ev.cancelable){
                        ev.preventDefault();
                    }
                    //enable mobile custom scroll
                    canAddScroll = true;
                    //adjust back chat cube tilt
                    chatCube.tiltXRate = 4;
                    chatCube.tiltYRate = 4;

                    this.isDragging = false;

                    if(!this.hasTouchMoved){
                        if(ev.currentTarget.tagName.toLowerCase() == "video"){
                            ImageCube.checkSingleVideoControl(ev.currentTarget, 1);
                        }
                    }
                    this.hasTouchMoved = false;

                }.bind(this));
        
                node.addEventListener("mousemove", function(ev){
                    if(this.isDragging){
                        ImageCube.hideAllVideoControls(this.videos);

                        // if(ev.cancelable){
                        //     ev.preventDefault();
                        // }
                        this.rotateCubeByMousePos(ev);
                    }
                    else{
                        if(this.isVideoCube){
                            if(ev.currentTarget.tagName.toLowerCase() == "video" && 
                            !ev.currentTarget.getElementsByTagName("source")[0].src.toLowerCase().includes("animation")){
                                ev.currentTarget.setAttribute("controls", "controls");
                            }   
                        }
                    }
                }.bind(this));

                node.addEventListener("touchmove", function(ev){
                    if(this.isDragging){
                        this.hasTouchMoved = true;
                        ImageCube.hideAllVideoControls(this.videos);
                        if(ev.cancelable){
                            ev.preventDefault();
                        }
                        this.rotateCubeByMousePos(ev);
                    }
                }.bind(this));
            }
        }

        window.addEventListener("mouseup", function(ev){
            // if(ev.cancelable){
            //     ev.preventDefault();
            // }
            this.isDragging = false;
        }.bind(this));

        window.addEventListener("touchend", function(ev){
            if(ev.cancelable){
                ev.preventDefault();
            }
            canAddScroll = true;
            this.isDragging = false;
            this.hasTouchMoved = false;
        }.bind(this));

        window.addEventListener("mousemove", function(ev){
            if(this.isDragging){
                ImageCube.hideAllVideoControls(this.videos);
                // if(ev.cancelable){
                //     ev.preventDefault();
                // }
                this.rotateCubeByMousePos(ev);
            }
        }.bind(this));

        window.addEventListener("touchmove", function(ev){
            if(this.isDragging){
                this.hasTouchMoved = true;
                ImageCube.hideAllVideoControls(this.videos);
                this.rotateCubeByMousePos(ev);
            }
        }.bind(this));
    }

    setVideoCube(){
        this.videos.forEach(function(curVid){
            if(this.videoCubeAutoPlay && !mobileAndTabletCheck()){
                curVid.muted = false;
                curVid.volume = 1 / this.videos.length;
            }
            else{
                if(!mobileAndTabletCheck()){
                    let promise = curVid.play();
                    if (promise !== undefined) {
                        promise.then(_ => {
                            // Autoplay started!
                        }).catch(error => {
                            // Autoplay was prevented.
                            // Show a "Play" button so that user can start playback.
                        });
                        }
                }
            }

            if(!curVid.getElementsByTagName("source")[0].src.toLowerCase().includes("animation")){
                //play event for videos
                curVid.addEventListener("play", function(e){
                    //scroll to view video cube
                    scrollIntoView(this.cube, {
                        time: 1000,
                        align:{top: 0.5}
                    });

                    //play all other videos in this video cube when play one video
                    if(!mobileAndTabletCheck()){
                        this.videos.forEach(function(iterPlay){
                            if(iterPlay.paused){
                                iterPlay.play();
                            }
                        });
                    }

                    //pause other video cubes if there are any
                    if(!mobileAndTabletCheck()){
                        let otherVideoCubes = this.cube.parentElement.querySelectorAll('[id^="videocube"]');

                        for(let i = 0; i < otherVideoCubes.length; i++){
                            if(otherVideoCubes[i].id != this.cube.id){
                                let videos = otherVideoCubes[i].querySelectorAll("video");
                                for(let j = 0 ; j < videos.length; j ++){
                                    if(!videos[j].getElementsByTagName("source")[0].src.toLowerCase().includes("animation")){
                                        videos[j].pause();
                                    }
                                }
                            }
                        }
                    }
                }.bind(this));


                if(!mobileAndTabletCheck()){
                //pause event for videos
                    curVid.addEventListener("pause", function(e){
                        //pause all other videos in this video cube
                        this.videos.forEach(function(iterPause){
                            if(!iterPause.paused){
                                if(!iterPause.getElementsByTagName("source")[0].src.toLowerCase().includes("animation")){
                                    iterPause.pause();
                                }
                            }
                        });
                    }.bind(this));
                }
            }
        }.bind(this));
    }

    checkBlur(){
        vis(function(){
            // if(vis()){                   
            // } 
            if(vis() == false) {
                // tab not focused
                this.lastRotateAF = undefined;
            }
        });
        
        var notIE = (document.documentMode === undefined),
            isChromium = window.chrome;
        if (notIE && !isChromium) {
            // checks for Firefox and other  NON IE Chrome versions
            $(window).on("focusout", function () {
                // blur
                this.lastRotateAF = undefined;
            });
        } 
        else {
            // checks for IE and Chromium versions
            // bind blur event
            window.addEventListener("blur", function () {
                // blur
                this.lastRotateAF = undefined;
            });
        }
    }
}
