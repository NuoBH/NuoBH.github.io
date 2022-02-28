class SwitchButton{
    constructor(id){
        this.button = this.createSwtichButton(id);
        this.expandSwitchButton();
    }

    createSwtichButton(id){
        let button = document.createElement("div");
        button.id = id;
        button.classList.add("switch-button", "noselect");
        document.body.insertBefore(button, archiveCubeDOM.nextElementSibling);
        return button;
    }

    switchClick(){
        if(canSwitchCube){
      
          canSwitchCube = false;
          if(isChatCube){
            showArchiveCube();
            // rotate button
            $({rotate: 0}).animate({rotate: 180},{
              duration: 900,
              easing: `easeOutBack`,
              step: function(now){
                this.button.style.setProperty(`--switchRotate`, `${now}deg`);
              }.bind(this)
            });

            //reset cube size and title sizes
            archiveCube.cubeOnResize();
            
            let titles = archiveCubeDOM.querySelectorAll(".title");
            titles.forEach(function(title){
              title.dispatchEvent(resizeTitleEvent);
            });

            let imgCubes = archiveCubeDOM.querySelectorAll(".media-cube");
            imgCubes.forEach(function(val){
              val.dispatchEvent(resizeImageCubeEvent);
            });
          }
          else{
            showInstructionCube();
            // rotate button
            $({rotate: 180}).animate({rotate: 0},{
              duration: 900,
              easing: `easeOutBack`,
              step: function(now){
                this.button.style.setProperty(`--switchRotate`, `${now}deg`);
              }.bind(this)
            });

            //reset cube and title sizes
            chatCube.cubeOnResize();

            let titles = chatCubeDOM.querySelectorAll(".title");
            titles.forEach(function(title){
              title.dispatchEvent(resizeTitleEvent);
            });

            let imgCubes = chatCubeDOM.querySelectorAll(".media-cube");
            imgCubes.forEach(function(val){
              val.dispatchEvent(resizeImageCubeEvent);
            });
          }
        }
      }
      
      switchHover(begin){
        if(begin){
          this.button.classList.add("switch-button-hover");
        }
        else{
          this.button.classList.remove("switch-button-hover");
        }
      }
      
      expandSwitchButton(){
        $({scale: 0}).animate({scale: 1},{
          duration: 550,
          easing: `easeOutBack`,
          step: function(now){
            this.button.style.setProperty(`--switchScale`, `${now}`);
          }.bind(this),
          complete: function(){
            //add mouse up and touch end event
            this.button.addEventListener("mouseup", this.switchClick.bind(this));
            this.button.addEventListener("touchend", this.switchClick.bind(this));
            window.addEventListener("touchend", function(){
              this.switchHover(false);
            }.bind(this));
      
            this.button.addEventListener("touchstart", function(){
              this.switchHover(true);
            }.bind(this));
            this.button.addEventListener("mouseenter", function(){
              this.switchHover(true);
            }.bind(this));
            this.button.addEventListener("mouseleave", function(){
              this.switchHover(false);
            }.bind(this));
            canSwitchCube = true;
          }.bind(this)
        });
      }
}