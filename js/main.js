let next = "--&gt";
let optionEventName = "optionEnded";
let continueEventName = "rotateFace";
let sliders = [];
let deliveryInputs = [];

function changeGravity(x, y){
    engine.gravity.x = x;
    engine.gravity.y = y;
}

window.addEventListener("mouseover", (e)=>{
    console.log(e.target);
})

/****** help funciton ********/
//add event hander to option/continue buttons and remove the listener and the DOM element afterwards
function addEventHandlerToButtons(optionDOM, event, fn){
    let ehandler = function(e){
        let isRemoveDOM = true;
        if(e.type == continueEventName){
            fn(e);
            isRemoveDOM = false;
        }
        else{
            fn();
        }
        e.target.removeEventListener(event, ehandler);

        if(isRemoveDOM){
            e.target.remove();
        }
    };

    optionDOM.addEventListener(event, ehandler);
}

//even listener function for continue button of front face
// use inside end function of each face
function rotateChatCubeHandler(allow, x='0', y='0'){
    if(chatCube.curstate == allow){
        chatCube.rotate();
        changeGravity(x, y);
        hasClickedLastContinue = false;
    }
}
/************************************ */

//set front face text opacity of instruction and opacity cube
frontFace.children[0].style.setProperty("opacity", `1`);

//WATER INTRO
//WATER INTRO start

cubeContent.addTitle(frontFace, `Water`, 1.8);


/************ uncomment code below after test is done ***********/

window.addEventListener(`firstCollide`, function(){
    requestTimeout(function(){
        cubeContent.addChat(frontFace, `<b>Water</b> is an unstable data structure with which you store, share and delete your data.`);
    }, 1000);
    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(frontFace, 
                        [next]);
            
        addEventHandlerToButtons(optionDOM, optionEventName, waterOption0);
    }, 2500);
    
});

/** **************************************************** */

/**test part delete later */
// window.addEventListener(`firstCollide`, function(){
//     requestTimeout(function(){
//         cubeContent.addTitle(leftFace, "Send<br>Water");
//         chatCube.rotate();
//         chatCube.rotate();
//         chatCube.rotate();
//         chatCube.rotate();
//         chatCube.rotate();

//      sendStart();
//     }, 1000);
// });


/************************** */

function waterOption0(){
    requestTimeout(function(){
        cubeContent.addChat(frontFace, `Data in water <b>cannot</b> be analyzed, learned, or tracked by algorithms.`);
    }, 500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(frontFace, 
                        [next]);
            
        addEventHandlerToButtons(optionDOM, optionEventName, waterOption0_1);
    }, 2000);
}

function waterOption0_1(){
    requestTimeout(function(){
        cubeContent.addChat(frontFace, `Data in water doesn’t last forever either. It is transformable but not duplicable. Storing it needs constant maintenance, while its deletion is irreversible.`);
    }, 500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(frontFace, 
                        ["Okay.", 
                        "How can water retain data?"
                        ]);
            
        addEventHandlerToButtons(optionDOM, optionEventName, waterOption1);
    }, 2500);
}

function waterOption1(){
    requestTimeout(function(){
        cubeContent.addChat(frontFace, `<b>Water</b> is inspired by the history and practice of water memory, the purported ability for water to remember the substance previously dissolved in it.`);
    }, 1500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(frontFace, 
                        [next]);
            
        addEventHandlerToButtons(optionDOM, optionEventName, waterOption2);
    }, 3000);
}

function waterOption2(){
    requestTimeout(function(){
        cubeContent.addChat(frontFace, `Water memory has long been an interest of Homeopathy.`);
    }, 500);

    requestTimeout(function(){
        cubeContent.addChat(frontFace, `In the process of homeopathic remedies, a substance is dissolved and then largely diluted in water until the solution is chemically no different from water. The solution is claimed to have memorized the substance.`);
    }, 2500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(frontFace, 
                        [next]);
            
        addEventHandlerToButtons(optionDOM, optionEventName, waterOption3);
    }, 4500);
}

function waterOption3(){
    requestTimeout(function(){
        cubeContent.addChat(frontFace, `In 1988, Jacques Benveniste published on <b>Nature</b> a set of experiments and reported that he proved the water memory effect.`);
    }, 500);

    requestTimeout(function(){
        cubeContent.addChat(frontFace, `Benveniste and his team diluted an antibody in water until there are only water molecules in the dilution. They found that human basophils reacted to the dilution as if encountering the original antibody.`);
    }, 3000);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(frontFace, 
                        [next]);
            
        addEventHandlerToButtons(optionDOM, optionEventName, waterOption4);
    }, 4500);
}

function waterOption4(){
    requestTimeout(function(){
        cubeContent.addChat(frontFace, `Later, Benveniste got support from Brian Josephson and published papers in 1997, 1999 and 2000 stating that the quality of a substance can also be transmitted electronically over phone wires and internet.`);
    }, 500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(frontFace, 
                        [`What about <b>Water</b> as a data structure?`, `Okay.`]);
            
        addEventHandlerToButtons(optionDOM, optionEventName, waterOption5);
    }, 2500);
}

function waterOption5(){
    requestTimeout(function(){
        cubeContent.addChat(frontFace, `<b>Water</b> is both the interfacing material and the memorizing mechanism.`);
    }, 1500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(frontFace, 
                        [next]);
            
        addEventHandlerToButtons(optionDOM, optionEventName, waterOption6);
    }, 3500);
}

function waterOption6(){
    requestTimeout(function(){
        cubeContent.addChat(frontFace, `Instead of going through networks of collection and analysis, your data goes through cycles of water transformation.`);
    }, 500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(frontFace, 
                        [next]);
            
        addEventHandlerToButtons(optionDOM, optionEventName, waterOption7);
    }, 2000);
}

function waterOption7(){
    requestTimeout(function(){
        cubeContent.addChat(frontFace, `With water as solid ice, your data is easy to store and control.`);
    }, 500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(frontFace, 
                        [next]);
            
        addEventHandlerToButtons(optionDOM, optionEventName, waterOption8);
    }, 2000);
}

function waterOption8(){
    requestTimeout(function(){
        cubeContent.addChat(frontFace, `When it melts into liquid, your data is easy to consume, share, leak, and blend.`);
    }, 500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(frontFace, 
                        [next]);
            
        addEventHandlerToButtons(optionDOM, optionEventName, waterOption9);
    }, 2000);
}

function waterOption9(){
    requestTimeout(function(){
        cubeContent.addChat(frontFace, `When water evaporates, your data dissipates. It merges into the air and becomes impossible to grab and contain, thus totally unrecognizable.`);
    }, 500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(frontFace, 
                        [`. . . . . . .`]);
            
        addEventHandlerToButtons(optionDOM, optionEventName, waterOption10);
    }, 2000);
}

function waterOption10(){
    requestTimeout(function(){
        cubeContent.addChat(frontFace, `We helped a few participants transfer their data to <b>Water</b>.`);
    }, 1500);

    requestTimeout(function(){
        cubeContent.addChat(frontFace, `They sent their data to us via thumb drives and we transferred their data to water through electromagnetic radiation.`);
    }, 3500)

    requestTimeout(function(){
        cubeContent.addChat(frontFace, `We froze the water that memorized the participants' data and delivered the ice blocks to them.`);
    }, 6500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(frontFace, [next]);
            
        addEventHandlerToButtons(optionDOM, optionEventName, waterOption11);
    }, 8000);
}

function waterOption11(){
    requestTimeout(function(){
        cubeContent.addChat(frontFace, `Learn more about the data transfer process here and even do it on your own.`);
    }, 500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addContinueButtons(frontFace, 
                        [`I'd like to continue to learn more about this process.`]);
          
        addEventHandlerToButtons(optionDOM, continueEventName, waterEnd);
    }, 2500);
}

//end of Water(front) and rotate to Clean(top)
function waterEnd(e){
    if(chatCube.curstate == 0){
        cubeContent.addTitle(topFace, "Clean");
        chatCube.rotate();
        changeGravity(0, 1);

        e.target.addEventListener(`rotateFace`, ()=>{
            rotateChatCubeHandler(0, 0, 1);
        });
        hasClickedLastContinue = false;

        cleanStart();
    }
}

/*************************************** Clean *************************************/
function cleanStart(){
    requestTimeout(function(){
        cubeContent.addChat(topFace, `Hi! Let me introduce you to the first step of our data transfer process.`);       
    }, 1500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(topFace, [
            `Hi!`,
            `Sure.`
        ]);

        addEventHandlerToButtons(optionDOM, optionEventName, cleanOption1);
    }, 3200);
}

function cleanOption1(){
    requestTimeout(function(){
        cubeContent.addChat(topFace, `Before we start transferring data to water, we clean our equipment, tools and materials.`);
    }, 1500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(topFace, [
            `What materials do you clean?`,
            `How do you clean them?`
        ]);

        addEventHandlerToButtons(optionDOM, optionEventName, cleanOption2);
    }, 3500);
}

function cleanOption2(){
    requestTimeout(function(){
        cubeContent.addChat(topFace, `We wash the water containers and the tube.`);
    }, 1500);

    requestTimeout(function(){
        // cubeContent.showVideo(topFace, `./videos/wash.mp4`);
        addImageCube("videocubeWash", topFace, [
            `./videos/wash sep1.mp4`,
            `./images/washimgS1.jpg`,
            `./images/washimgS2.jpg`,
            `./videos/wash sep2.mp4`,
            `./videos/wash sep4.mp4`,
            `./videos/wash sep3.mp4`
        ], true, true);
    }, 3500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(topFace, [next], false, true);

        addEventHandlerToButtons(optionDOM, optionEventName, cleanOption3);
    }, 5000);
}

function cleanOption3(){
    requestTimeout(function(){
        cubeContent.addChat(topFace, `Then we disinfect the operating desk, faraday cages, computer, screen, wires, water preparation containers, and measuring tools with 70% isopropyl alcohol wipes.`);
    }, 500);

    requestTimeout(function(){
        // cubeContent.showVideo(topFace, `./videos/disinfect.mp4`);
        addImageCube("videocubeDisinfect", topFace, [
            `./videos/disinfect sep1.mp4`,
            `./images/disinfectimgS1.jpg`,
            `./images/disinfectimgS2.jpg`,
            `./videos/disinfect sep2.mp4`,
            `./videos/disinfect sep4.mp4`,
            `./videos/disinfect sep3.mp4`
        ], true, true);
    }, 5000);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(topFace, [`I see.`, `That's good!`], false, true);

        addEventHandlerToButtons(optionDOM, optionEventName, cleanOption4);
    }, 6500);
}

function cleanOption4(){
    requestTimeout(function(){
        let optionDOM = optionCreator.addContinueButtons(topFace, ['Continue.']);

        addEventHandlerToButtons(optionDOM, continueEventName, cleanEnd);
    }, 1500);
}


function cleanEnd(e){
    if(chatCube.curstate == 1){
        cubeContent.addTitle(leftFace, "Pre-<br>pare");
        chatCube.rotate();
        changeGravity(0, -1);

        e.target.addEventListener(`rotateFace`, ()=>{
            rotateChatCubeHandler(1, 0, -1);
        });
        hasClickedLastContinue = false;

        prepareStart();
    }
}

/**************************** Prepare *************************/
function prepareStart(){
    requestTimeout(function(){
        cubeContent.addChat(leftFace, `After cleaning is done, we prepare water for data transfer.`);       
    }, 1500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(leftFace, [
            `Sounds good!`,
            `Does water need any specific preparation?`
        ]);

        addEventHandlerToButtons(optionDOM, optionEventName, prepareOption1);
    }, 3000);
}

function prepareOption1(){
    requestTimeout(function(){
        cubeContent.addChat(leftFace, `We adjust water conditions for specific data that will be transferred to the water.`);       
    }, 1500);

    requestTimeout(function(){
        cubeContent.addChat(leftFace, `There are four conditions important for data transfer: weight, hardness, pH value and turbidity.`);       
    }, 4000);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(leftFace, [
            `I'm confused...`,
            `What are these conditions about?`
        ]);

        addEventHandlerToButtons(optionDOM, optionEventName, prepareOption2);
    }, 6200);
}

function prepareOption2(){
    requestTimeout(function(){
        cubeContent.addChat(leftFace, `The weight of water corresponds to the number of bytes the data has and the scope of information the data contains.`);       
    }, 1500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(leftFace, [next]);

        addEventHandlerToButtons(optionDOM, optionEventName, prepareOption3);
    }, 4500);
}

function prepareOption3(){
    requestTimeout(function(){
        cubeContent.addChat(leftFace, `The hardness of water corresponds to how hard it is to open, see, read the data.`);       
    }, 500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(leftFace, [next]);

        addEventHandlerToButtons(optionDOM, optionEventName, prepareOption4);
    }, 3000);
}

function prepareOption4(){
    requestTimeout(function(){
        cubeContent.addChat(leftFace, `The pH value of water is related to how neutral or inclined the data is.`);       
    }, 500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(leftFace, [next]);

        addEventHandlerToButtons(optionDOM, optionEventName, prepareOption5);
    }, 2700);
}

function prepareOption5(){
    requestTimeout(function(){
        cubeContent.addChat(leftFace, `Finally, the turbidity of water is related to the level of encryption, security, privacy the data has.`);       
    }, 500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(leftFace, [
            `Okay...`,
            `How do you adjust the water conditions then?`
        ]);

        addEventHandlerToButtons(optionDOM, optionEventName, prepareOption6);
    }, 3200);
}

function prepareOption6(){
    requestTimeout(function(){
        cubeContent.addChat(leftFace, `We use 7 different types of water as materials for the final blend.`);       
    }, 1500);

    requestTimeout(function(){
        cubeContent.addChat(leftFace, `Alkaline water, carbonated water, mineral water...`);       
    }, 3600);

    requestTimeout(function(){
        addImageCube(`waterTypes1`, leftFace, [
            `./images/alkaline water.jpg`,
            `./images/alkaline label.jpg`,
            `./images/carbonated water.jpg`,
            `./images/carbonated label.jpg`,
            `./images/mineral water.jpg`,
            `./images/mineral label.jpg`
        ])
    }, 5700);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(leftFace, [next], false, true);

        addEventHandlerToButtons(optionDOM, optionEventName, prepareOption7);
    }, 7000);
}

function prepareOption7(){
    requestTimeout(function(){
        cubeContent.addChat(leftFace, `Distilled water, filtered water, boiled water...`);       
    }, 500);

    requestTimeout(function(){
        addImageCube(`waterTypes2`, leftFace, [
            `./images/distilled water.jpg`,
            `./images/distilled label.jpg`,
            `./images/filtered water.jpg`,
            `./images/filtered label.jpg`,
            `./images/boiled water.jpg`,
            `./images/boiled label.jpg`
        ])
    }, 2600);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(leftFace, [next], false, true);

        addEventHandlerToButtons(optionDOM, optionEventName, prepareOption8);
    }, 3950);
}

function prepareOption8(){
    requestTimeout(function(){
        cubeContent.addChat(leftFace, `tap water, a mixture of alkaline distilled water and a mixture of mineral carbonated water.`);       
    }, 500);

    requestTimeout(function(){
        addImageCube(`waterTypes3`, leftFace, [
            `./images/tap water.jpg`,
            `./images/tap water label.jpg`,
            `./images/alkaline distilled water.jpg`,
            `./images/alkaline distilled label.jpg`,
            `./images/mineral carbonated water.jpg`,
            `./images/mineral carbonated label.jpg`
        ])
    }, 3500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(leftFace, [next], false, true);

        addEventHandlerToButtons(optionDOM, optionEventName, prepareOption9);
    }, 5100);
}

function prepareOption9(){
    requestTimeout(function(){
        cubeContent.addChat(leftFace, `We carefully adjust the amount of each type of water to make the final blend.`);       
    }, 500);

    requestTimeout(function(){
        cubeContent.addChat(leftFace, `We also use a black food coloring to adjust the turbidity of the blend.`);
    }, 3300);

    requestTimeout(function(){
        addImageCube(`waterTypes4`, leftFace, [
            `./videos/prepare water fast.mp4`,
            `./images/measuring spoons.jpg`,
            `./images/food coloring.jpg`,
            `./images/measuring cup.jpg`,
            `./images/send container.jpg`,
            `./images/freezeimgS2.jpg`
        ])
    }, 6100);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(leftFace, [next], false, true);

        addEventHandlerToButtons(optionDOM, optionEventName, prepareOption10);
    }, 7450);
}


function prepareOption10(){
    requestTimeout(function(){
        cubeContent.addChat(leftFace, `*All materials are metallic or wrapped with aluminum foil to block unwanted electromagnetic radiations (EMR).`);       
    }, 500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(leftFace, [
            `Hmmm...`,
            `Okay.`
        ]);

        addEventHandlerToButtons(optionDOM, optionEventName, prepareOption11);
    }, 3500);
}

function prepareOption11(){
    requestTimeout(function(){
        cubeContent.addChat(leftFace, `We asked participants what kind of data they wanted to give us. Different kinds of data will influence the conditions of water.`);       
    }, 1500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(leftFace, [next]);

        addEventHandlerToButtons(optionDOM, optionEventName, prepareOption12);
    }, 4000);
}

function prepareOption12(){
    requestTimeout(function(){
        cubeContent.addChat(leftFace, `Participants answered four questions related to their data, and we prepared their water based on these answers.`);       
    }, 1500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(leftFace, [`I'd like to view records of the questions and answers`]);

        addEventHandlerToButtons(optionDOM, optionEventName, prepareOption13);
    }, 3500);
}

function prepareOption13(){
    requestTimeout(function(){
        cubeContent.addChat(leftFace, "Retrieving records...")
    }, 1500)

    requestTimeout(function(){
        cubeContent.addChat(leftFace, `First, for the weight of the water: how large is your file size? How much information does your data have? Adjust the slider to the <b>LEFT</b> according to how large your file size and/or the weight of your data is?`);       
    }, 2500);

    //add slider
    requestTimeout(function(){
        let wslider = cubeContent.addSlider(leftFace, 'weightSlider', 0, 100, 0);
        sliders.push(wslider);

        wslider.disabled = true;
        cubeContent.animateSlider(wslider, weightSliderArchiveValues);

    }, 6000);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(leftFace, [next]);

        addEventHandlerToButtons(optionDOM, optionEventName, prepareOption14);
    }, 8000);
}

function prepareOption14(){
    requestTimeout(function(){
        cubeContent.addChat(leftFace, `For the hardness of the water: does your file require a specific software to open? If so, how hard is it to find and download that software? How hard was it for you to create the data in the first place? How hard the content is for you to digest?`);       
    }, 1500);

    requestTimeout(function(){
        cubeContent.addChat(leftFace, `Adjust the slider to the <b>LEFT</b> according to how positive your answers are for the above questions.`);
    }, 6500)

    //add slider
    requestTimeout(function(){
        let hslider = cubeContent.addSlider(leftFace, 'hardnessSlider', 0, 100, 0);
        sliders.push(hslider);

        hslider.disabled = true;
        cubeContent.animateSlider(hslider, hardnessSliderArchiveValues);

    }, 8500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(leftFace, [next]);

        addEventHandlerToButtons(optionDOM, optionEventName, prepareOption15);
    }, 10500);
}

function prepareOption15(){
    requestTimeout(function(){
        cubeContent.addChat(leftFace, `For the pH value of water: is your data neutral? If not, to what extent does your data contain inclined opinions? How much do you agree or disagree with the opinions in your data?`);       
    }, 500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(leftFace, [next]);

        addEventHandlerToButtons(optionDOM, optionEventName, prepareOption16);
    }, 3000);
}

function prepareOption16(){
    requestTimeout(function(){
        cubeContent.addChat(leftFace, `If the data is neutral please place the slide handle at the center.`);       
    }, 500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(leftFace, [next]);

        addEventHandlerToButtons(optionDOM, optionEventName, prepareOption17);
    }, 2000);
}

function prepareOption17(){
    requestTimeout(function(){
        cubeContent.addChat(leftFace, `If your data is not neutral, adjust the slider to the <b>LEFT</b> according to how much you are <b>IN FAVOR</b> of the data, or to the <b>RIGHT</b> according to how much you are <b>AGAINST</b> the data.`);       
    }, 500);

    //add slider
    requestTimeout(function(){
        let pslider = cubeContent.addSlider(leftFace, 'phValueSlider', -100, 100, 0);
        sliders.push(pslider);

        pslider.disabled = true;
        cubeContent.animateSlider(pslider, phvalueSliderArchiveValues);

    }, 4000);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(leftFace, [next]);

        addEventHandlerToButtons(optionDOM, optionEventName, prepareOption18);
    }, 6000);
}

function prepareOption18(){
    requestTimeout(function(){
        cubeContent.addChat(leftFace, `For the turbidity of the water: is your data encrypted? How hard is it to decrypt the data? How private or personal is your data? How many people have you shared the data with?`);       
    }, 500);

    requestTimeout(function(){
        cubeContent.addChat(leftFace, `Adjust the slider to the <b>LEFT</b> according to how inaccessible or private your data is.`);
    }, 3000)

    //add slider
    requestTimeout(function(){
        let tslider = cubeContent.addSlider(leftFace, 'turbiditySlider', 0, 100, 0);
        sliders.push(tslider);

        tslider.disabled = true;
        cubeContent.animateSlider(tslider, turbiditySliderArchiveValues);

    }, 5000);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(leftFace, [
            `Finished!`,
            `Done.`,
            `Finally...`
        ]);

        addEventHandlerToButtons(optionDOM, optionEventName, prepareOption19);
    }, 7000);
}

function prepareOption19(){
    //get slider values and disable slide actions
    for(let i = 0; i < sliders.length; i++){
        sliderInputs[`${sliders[i].id}`] = sliders[i].value;
        sliders[i].disabled = true;
    }
    
    requestTimeout(function(){
        cubeContent.addChat(leftFace, `Retrieving records ended.`);       
    }, 1500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(leftFace, [next]);

        addEventHandlerToButtons(optionDOM, optionEventName, prepareOptionFormulae);
    }, 3000);
}

function prepareOptionFormulae(){
    requestTimeout(function(){
        cubeContent.addChat(leftFace, `According to these answers, we used a set of rules and formulae to decide the types and proportions of water in the final blend for data transfer.`)
    }, 1500);

    requestTimeout(function(){
        addImageCube(`waterFormulae`, leftFace, [
            `./images/rule&formulae title.jpg`,
            `./images/weight.jpg`,
            `./images/hardness.jpg`,
            `./images/phValue.jpg`,
            `./images/hardness function.jpg`,
            `./images/turbidity.jpg`
        ], false, false, true);
    }, 4300);

    requestTimeout(function(){
        let optionDOM = optionCreator.addContinueButtons(leftFace, ['Continue.'], false, true);

        addEventHandlerToButtons(optionDOM, continueEventName, prepareEnd);
    }, 6000);
}

function prepareEnd(e){
    if(chatCube.curstate == 2){
        cubeContent.addTitle(bottomFace, "Mate-<br>rials");
        chatCube.rotate();
        changeGravity(1, 0);

        e.target.addEventListener(`rotateFace`, ()=>{
            rotateChatCubeHandler(2, 1, 0);
        });
        hasClickedLastContinue = false;

        materialStart();
    }
}


/********************************* Material **********************************/

function materialStart(){
    requestTimeout(function(){
        cubeContent.addChat(bottomFace, `Let me introduce you to the full set of equipment and tools we use for the data transfer process.`);       
    }, 2500);

    requestTimeout(function(){
        // cubeContent.showVideo(bottomFace, `./videos/introduce.mp4`);
        addImageCube("videocubeIntro", bottomFace, [
            `./videos/introduce.mp4`,
            `./images/introimgS1.jpg`,
            `./images/introimgS2.jpg`,
            `./images/introimgL2.jpg`,
            `./images/introimgL3.jpg`,
            `./images/introimgL1.jpg`
        ], true);
    }, 5500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(bottomFace, [next], false, true);

        addEventHandlerToButtons(optionDOM, optionEventName, materialOption1);
    }, 7000);
}

function materialOption1(){
    requestTimeout(function(){
        cubeContent.addChat(bottomFace, `Next I will show you how we test and set up for the transfer.`);       
    }, 500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addContinueButtons(bottomFace, ['Continue.']);

        addEventHandlerToButtons(optionDOM, continueEventName, materialEnd);
    }, 2000);
}

function materialEnd(e){
    if(chatCube.curstate == 3){
        cubeContent.addTitle(rightFace, "Set<br>up", 1.5);
        chatCube.rotate();
        changeGravity(-1, 0);

        e.target.addEventListener(`rotateFace`, ()=>{
            rotateChatCubeHandler(3, -1, 0);
        });
        hasClickedLastContinue = false;

        setupStart();
    }
}


/********************************* Set up **********************************/

function setupStart(){
    requestTimeout(function(){
        cubeContent.addChat(rightFace, `To make sure the faraday cages are working properly, we first test their effectiveness.`);       
    }, 1500);

    requestTimeout(function(){
        // cubeContent.showVideo(rightFace, `./videos/test faraday cages.mp4`);
        addImageCube("videocubeTest", rightFace, [
            `./videos/test faraday cages.mp4`,
            `./images/testimgS1.jpg`,
            `./images/testimgS2.jpg`,
            `./images/testimgL2.jpg`,
            `./images/testimgL3.jpg`,
            `./images/testimgL1.jpg`
        ], true);
    }, 4000);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(rightFace, [next], false, true);

        addEventHandlerToButtons(optionDOM, optionEventName, setupOption1);
    }, 5500);
}

function setupOption1(){
    requestTimeout(function(){
        cubeContent.addChat(rightFace, `Now we set up the equipment.`);       
    }, 500);

    requestTimeout(function(){
        // cubeContent.showVideo(rightFace, `./videos/set up.mp4`);
        addImageCube("videocubeSetup", rightFace, [
            `./videos/set up.mp4`,
            `./images/setupimgS1.jpg`,
            `./images/setupimgS2.jpg`,
            `./images/setupimgL1.jpg`,
            `./images/setupimgL3.jpg`,
            `./images/setupimgL2.jpg`
        ], true);
    }, 2000);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(rightFace, [`So many steps!`, `What's next?`], false, true);

        addEventHandlerToButtons(optionDOM, optionEventName, setupOption2);
    }, 3500);
}

function setupOption2(){
    requestTimeout(function(){
        let optionDOM = optionCreator.addContinueButtons(rightFace, ['Continue to send water.']);

        addEventHandlerToButtons(optionDOM, continueEventName, setupEnd);    
    }, 1500);
}

function setupEnd(e){
    if(chatCube.curstate == 4){
        cubeContent.addTitle(backFace, "Send<br>water", 1.8);
        chatCube.rotate();
        changeGravity(0.5, 0.5);

        e.target.addEventListener(`rotateFace`, ()=>{
            rotateChatCubeHandler(4, 0.5, 0.5);
        });
        hasClickedLastContinue = false;

        sendStart();
    }
}


/********************************* Send Water **********************************/

function sendStart(){
    requestTimeout(function(){
        cubeContent.addChat(backFace, `Finally, we are ready to transfer the data to water.`);       
    }, 1500);

    requestTimeout(function(){
        cubeContent.addChat(backFace, `Sending water . . . . . . . .`);
    }, 3500);

    requestTimeout(function(){
        // cubeContent.showVideo(backFace, `./videos/send water.mp4`);
        addImageCube("videocubeSendwater", backFace, [
            `./videos/send water.mp4`,
            `./images/sendwaterimgS1.jpg`,
            `./videos/emf animation.mp4`,
            `./images/sendwaterimgL1.jpg`,
            `./images/sendwaterimgL2.jpg`,
            `./images/sendwaterimgL3.jpg`
        ], true);
    }, 4500);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(backFace, [`Is that the end?`],  false, true);

        addEventHandlerToButtons(optionDOM, optionEventName, sendOption1);
    }, 6000);
}

function sendOption1(){
    requestTimeout(function(){
        cubeContent.addChat(backFace, `We freeze the water right after the transfer.`);
    }, 1500);

    requestTimeout(function(){
        // cubeContent.showVideo(backFace, `./videos/freeze.mp4`);
        addImageCube("videocubeFreeze", backFace, [
            `./videos/freeze.mp4`,
            `./images/freezeimgS1.jpg`,
            `./images/freezeimgS2.jpg`,
            `./images/freezeimgL1.jpg`,
            `./images/freezeimgL3.jpg`,
            `./images/freezeimgL2.jpg`
        ], true);
    }, 3200);

    requestTimeout(function(){
        let optionDOM = optionCreator.addOptionButtons(backFace, [next], false, true);

        addEventHandlerToButtons(optionDOM, optionEventName, sendOption2Doc);
    }, 4700);
}

function sendOption2Doc(){
    requestTimeout(function(){
        cubeContent.addChat(backFace, "We picked up participants' data in thumb drives at locations they specified.");
    }, 500);

    requestTimeout(function(){
        cubeContent.addChat(backFace, "Afterwards we delivered the ice blocks to them in packages. Continue to see the documentation or click on the top left button.");
    }, 3000);

    requestTimeout(function(){
        /******************* Enable Switch to Archive cube ****************** */
        //add archive cube
        addArchiveCube("archive-cube");
        archiveFrontFace.children[0].style.setProperty("opacity", "1");

        /************** populate archive cube faces here *****************/
        addArchivePage1(archiveFrontFace, 0);
        addArchivePage2(archiveTopFace, 1);
        addArchivePage3(archiveLeftFace, 2);

        //add switch button
        let button = new SwitchButton("switch");
        let optionDOM = optionCreator.addContinueButtons(backFace, ['See documentation.']);
        optionDOM.addEventListener(continueEventName, ()=>{
            //switch to archive cube
            button.switchClick();
            //scroll all contents up in archive cube
            let faces = [archiveFrontFace, archiveTopFace, archiveLeftFace, archiveBottomFace, archiveRightFace, archiveBackFace];
            faces.forEach((face) => {
                let textDOM = face.firstElementChild;
                let title = textDOM.firstElementChild;
    
                scrollIntoView(title, {
                    time: 1
                });
            })

            hasClickedLastContinue = false;

            changeGravity(0, 0)
        });

        /******************************************************************* */

        //put go back to fornt face button
        let continueDOM = optionCreator.addContinueButtons(backFace, ['Go back']);
        addEventHandlerToButtons(continueDOM, continueEventName, sendEnd);
    }, 5300);
}

// function sendOption2(){
//     requestTimeout(function(){
//         cubeContent.addChat(backFace, `To conduct this whole process for you, we can start by figuring out a time and place to pick up your data.`);
//     }, 500);

//     requestTimeout(function(){
//         let optionDOM = optionCreator.addOptionButtons(backFace, [`I can prepare my data in a thumb drive.`, `I don’t have a thumb drive.`]);

//         addEventHandlerToButtons(optionDOM, optionEventName, sendOption3);
//     }, 2500);
// }

// function sendOption3(){
//     if (lastResponse.includes(`I don’t have a thumb drive.`)){
//         delivery.hasUSB = false;
//         requestTimeout(function(){
//             cubeContent.addChat(backFace, `We can deliver a thumb drive to you when we come to pick up your data.`);
//         }, 1500);

//         requestTimeout(function(){
//             cubeContent.addChat(backFace, `What’s the best time and date for the thumb drive pick up (within next few days, 10 am. to 8 pm.) ?`);
//         }, 4000);

//         requestTimeout(function(){
//             let input = cubeContent.addInput(backFace, `time`);
//             deliveryInputs.push(input);
//         }, 6000);

//         requestTimeout(function(){
//             let optionDOM = optionCreator.addOptionButtons(backFace, [next]);

//             addEventHandlerToButtons(optionDOM, optionEventName, sendOption4);
//         }, 7000);
//     }
//     else{
//         delivery.hasUSB = true;
//         requestTimeout(function(){
//             cubeContent.addChat(backFace, `What’s the best time and date for the thumb drive pick up (May 6 to May 9, 10 am. to 8 pm.) ?`);
//         }, 1500);

//         requestTimeout(function(){
//             let input = cubeContent.addInput(backFace, `time`);
//             deliveryInputs.push(input);
//         }, 3000);

//         requestTimeout(function(){
//             let optionDOM = optionCreator.addOptionButtons(backFace, [next]);

//             addEventHandlerToButtons(optionDOM, optionEventName, sendOption4);
//         }, 4000);
//     }
// }

// function sendOption4(){
//     requestTimeout(function(){
//         cubeContent.addChat(backFace, `What’s your address?`);
//     }, 500);

//     requestTimeout(function(){
//         let input = cubeContent.addInput(backFace, `address`);
//         deliveryInputs.push(input);
//     }, 2000);

//     requestTimeout(function(){
//         let optionDOM = optionCreator.addOptionButtons(backFace, [`I'll be home.`,`See you then.`]);

//         addEventHandlerToButtons(optionDOM, optionEventName, sendOption5);
//     }, 4500);
// }

// function sendOption5(){
//     deliveryInputs.forEach((input) => {
//         input.disabled = true;
//         delivery[`${input.id}`] = input.value;
//     });

//     requestTimeout(function(){
//         cubeContent.addChat(backFace, `From all your inputs here, we generated a text for you to send us via email: <a href="mailto:zhua05nuo@outlook.com">zhua05nuo@outlook.com</a>`);
//     }, 1500);

//     //generate email text
//     let emailContent = `Water Conditions:&#13;&#10;`;
//     for(const [key, val] of Object.entries(sliderInputs)){
//         emailContent += `- ${key.charAt(0).toUpperCase() + key.slice(1)}: ${val}% &#13;&#10;`;
//     }
//     emailContent += `&#13;&#10;Delivery Info:&#13;&#10;`;
//     for(const [key, val] of Object.entries(delivery)){
//         if(key == 'hasUSB'){
//             emailContent += val ? `- I have an USB drive.&#13;&#10;` : `- I need a USB drive delivered to me.&#13;&#10;`
//         }
//         else {
//             emailContent += `- ${key.charAt(0).toUpperCase() + key.slice(1)}: ${val}&#13;&#10;`;
//         }
//     }

//     emailContent = emailContent.slice(0, -10);

//     requestTimeout(function(){
//         toCopy = cubeContent.addTextArea(backFace, emailContent);
//     }, 5000);

//     requestTimeout(function(){
//         let optionDOM = optionCreator.addOptionButtons(backFace, [`Copy the text for me and I will send it myself.`, `Open my system default email platform and create the email for me.`]);

//         addEventHandlerToButtons(optionDOM, optionEventName, sendOption6);
//     }, 7000);
// }

// function sendOption6(){
//     if(lastResponse.includes(`Copy the text for me and I will send it myself.`)){
//         requestTimeout(function(){
//             toCopy.select();
//             document.execCommand("copy");

//             //============
//             let optionDOM = optionCreator.addOptionButtons(backFace, [`I've sent it to you.`]);
//             addEventHandlerToButtons(optionDOM, optionEventName, sendOption7);
//         }, 1500);
//     }
//     else{
//         requestTimeout(function(){
//             let emailContent = `Water Conditions:%0D%0A`;
//             for(const [key, val] of Object.entries(sliderInputs)){
//                 emailContent += `- ${key.charAt(0).toUpperCase() + key.slice(1)}: ${val}% %0D%0A`;
//             }
//             emailContent += `%0D%0ADelivery Info:%0D%0A`;
//             for(const [key, val] of Object.entries(delivery)){
//                 if(key == 'hasUSB'){
//                     emailContent += val ? `- I have an USB drive.%0D%0A` : `- I need a USB drive delivered to me.%0D%0A`
//                 }
//                 else emailContent += `- ${key.charAt(0).toUpperCase() + key.slice(1)}: ${val}%0D%0A`;
//             }

//             let mailToText = emailContent.replace(/ /g, `%20`);
//             window.location.href = `mailto:zhua05nuo@outlook.com?subject=Water&body=${mailToText}`;

//             //============
//             let optionDOM = optionCreator.addOptionButtons(backFace, [`I've sent it to you.`]);
//             addEventHandlerToButtons(optionDOM, optionEventName, sendOption7);
//         }, 1500);
//     }
// }

// function sendOption7(){
//     requestTimeout(function(){
//         cubeContent.addChat(backFace, `Contact me with this email if you have any questions!`);
//     }, 1500);

//     requestTimeout(function(){
//         let optionDOM = optionCreator.addContinueButtons(backFace, ['Leave.']);
//         addEventHandlerToButtons(optionDOM, continueEventName, sendEnd);
//     }, 3000);
// }

function sendEnd(e){
    if(chatCube.curstate == 5){
        let faces = [frontFace, topFace, leftFace, bottomFace, rightFace, backFace];
        faces.forEach((face) => {
            let textDOM = face.firstElementChild;
            let title = textDOM.firstElementChild;

            scrollIntoView(title, {
                time: 1000
            });
        })

        chatCube.rotate();
        changeGravity(-0.5, -0.5);

        e.target.addEventListener(`rotateFace`, ()=>{
            rotateChatCubeHandler(5, -0.5, 0.5);

            let faces = [frontFace, topFace, leftFace, bottomFace, rightFace, backFace];
            faces.forEach((face) => {
                let textDOM = face.firstElementChild;
                let title = textDOM.firstElementChild;

                scrollIntoView(title, {
                    time: 1000
                });
            })
        });
        hasClickedLastContinue = false;
    }
}