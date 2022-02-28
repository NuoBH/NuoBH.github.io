var lerp = function (value1, value2, amount) {
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    return value1 + (value2 - value1) * amount;
};
var map = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

/**************************request time out****************************** */
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
	if( !window.requestAnimationFrame      	&& 
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

/**
 * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame() where possible for better performance
 * @param {int|object} fn The callback function
 */
window.clearRequestTimeout = function(handle) {
  if(handle === undefined){handle = {value: undefined};}
  window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
  window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) :
  window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
  window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
  window.oCancelRequestAnimationFrame	? window.oCancelRequestAnimationFrame(handle.value) :
  window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) :
  clearTimeout(handle);
};

/**************check mobile**********************/
window.mobileAndTabletCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

/*********************check tab or window out of focus*********************** */
var vis = (function(){
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
/***************************************************************** */
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var weightSliderArchiveValues = [51, 86, 42];
var hardnessSliderArchiveValues = [95, 87, 79];
var phvalueSliderArchiveValues = [-78, 0, 24];
var turbiditySliderArchiveValues = [87, 49, 86];

//instruction chat cube
var chatCubeDOM = document.getElementById("instruction-cube");
var frontFace = document.getElementById(`front`);
var leftFace = document.getElementById(`left`);
var rightFace = document.getElementById(`right`);
var topFace = document.getElementById(`top`);
var bottomFace = document.getElementById(`bottom`);
var backFace = document.getElementById(`back`);

//archive chat cube
var archiveCube;
var archiveCubeDOM;
var archiveFrontFace;
var archiveLeftFace;
var archiveRightFace;
var archiveTopFace;
var archiveBottomFace;
var archiveBackFace;

const firstCollideEvent = new CustomEvent(`firstCollide`);
var lastResponse = '';
const optionEndedEvent = new CustomEvent(`optionEnded`);
const rotateFaceEvent = new CustomEvent(`rotateFace`);
const resizeTitleEvent = new CustomEvent(`resizeTitle`);
const resizeImageCubeEvent = new CustomEvent(`resizeImageCube`);
const sliderMoveEvent = new CustomEvent(`sliderMove`);

var hasClickedLastOption = false;
var hasClickedLastContinue = false;

//switch button
var canSwitchCube = false;
var isChatCube = true;

//copy clipboard
var toCopy;

//inputs
var sliderInputs = {};
var delivery = {};

//can add custom scroll to mobile when touch initiated
var canAddScroll = true;

//resize chat cube functions
function expandChatCube(cube, isStart=true){
  let start = 0;
  let target = 1;
  let dur = 550;
  if(!isStart){
    strat = 0.5;
    target = 1;
    dur = 900;
  }
  $({scale: start}).animate({scale: target},{
    duration: dur,
    easing: `easeOutBack`,
    step: function(now){
      cube.style.setProperty(`--chatCubeScale`, `${now}`);
    }
  });
}

function shrinkChatCube(cube, isStart=true){
  let start = 1;
  let target = 0;
  let dur = 550;
  if(!isStart){
    strat = 1;
    target = 0.5;
    dur = 900;
  }

  $({scale: start}).animate({scale: target},{
    duration: dur,
    easing: `easeOutBack`,
    step: function(now){
      cube.style.setProperty(`--chatCubeScale`, `${now}`);
    }
  });
}

//relocate chat cube functions
function showArchiveCube(){
  archiveCubeDOM.style.setProperty("display", "block");
  expandChatCube(archiveCubeDOM, false);
  shrinkChatCube(chatCubeDOM, false);

  $({translate:150}).animate({translate:0}, {
    duration: 1000,
    easing: `easeOutBack`,
    step: function(now){
      let instrTranslate = now - 150;
      chatCubeDOM.style.setProperty(`--instructionTranslate`, `${instrTranslate}vw`);
      archiveCubeDOM.style.setProperty(`--archiveTranslate`, `${now}vw`);
    },
    complete: function(){
      canSwitchCube = true;
      isChatCube = false;
      chatCubeDOM.style.setProperty("display", "none");
    }
  });
}

function showInstructionCube(){
  chatCubeDOM.style.setProperty("display", "block");
  expandChatCube(chatCubeDOM, false);
  shrinkChatCube(archiveCubeDOM, false);

  $({translate:0}).animate({translate:150}, {
    duration: 1000,
    easing: `easeOutBack`,
    step: function(now){
      let instrTranslate = now - 150;
      chatCubeDOM.style.setProperty(`--instructionTranslate`, `${instrTranslate}vw`);
      archiveCubeDOM.style.setProperty(`--archiveTranslate`, `${now}vw`);
    },
    complete: function(){
      canSwitchCube = true;
      isChatCube = true;
      archiveCubeDOM.style.setProperty("display", "none");
    }
  });
}