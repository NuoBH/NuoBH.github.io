function addArchiveContinueButton(face, allow, gx, gy){
    let optionDOM = optionCreator.addContinueButtons(face, ["Continue"]);

    let tmp = function(){
        if(archiveCube.curstate == allow){
            archiveCube.rotate();
            engine.gravity.x = gx;
            engine.gravity.y = gy;
            hasClickedLastContinue = false;
        }
    }

    optionDOM.addEventListener("rotateFace", tmp);
}

function addArchiveBackButton(face, allow, gx, gy){
    let optionDOM = optionCreator.addContinueButtons(face, ["Back"]);

    let tmp = function(){
        if(archiveCube.curstate == allow){
            archiveCube.rotate();
            archiveCube.rotate();
            archiveCube.rotate();
            archiveCube.rotate();
            engine.gravity.x = gx;
            engine.gravity.y = gy;
            hasClickedLastContinue = false;
        }
    }

    optionDOM.addEventListener("rotateFace", tmp);
}

function addArchivePage1(face, allow){
    cubeContent.addTitle(face, "05/<br>11/<br>21");
    cubeContent.addChat(face, "We picked up the data on May 06 2021.");
    cubeContent.addChat(face, "We delivered the ice on May 11 2021.");
    addImageCube("archiveImgFront1", face, [
        "./documentation/11e.jpg",
        "./documentation/11d.jpg",
        "./documentation/11c.jpg",
        "./documentation/11paper.jpg",
        "./documentation/11h.jpg",
        "./documentation/11f.jpg",
    ]);
    cubeContent.addResponse(face, "I made one attempt of licking the ice.");
    addImageCube("archiveImgFront2", face, [
        "./documentation/11b.jpg",
        "./documentation/11a.mp4",
        "./documentation/11g.jpg",
        "./documentation/11j.jpg",
        "./documentation/11k.jpg",
        "./documentation/11i.jpg",
    ], false, false, false, true);
    cubeContent.addResponse(face, "The ice was melted with a hole in it.");

    addArchiveContinueButton(face, allow, 0, 1);
}

function addArchivePage2(face, allow){
    cubeContent.addTitle(face, "05/<br>16/<br>21");
    cubeContent.addChat(face, "We picked up the data on May 11 2021.");
    cubeContent.addChat(face, "We delivered the ice on May 16 2021.");
    addImageCube("archiveImgTop1", face, [
        "./documentation/16a.jpg",
        "./documentation/16paper.jpg",
        "./documentation/16c.jpg",
        "./documentation/16b.jpg",
        "./documentation/suggestion paper.jpg",
        "./documentation/16d.jpg",
    ]);
    cubeContent.addResponse(face, "I waited for the ice to get smaller.");
    cubeContent.addResponse(face, "And then put it in a cup.");
    cubeContent.addResponse(face, "I took a sip and let it melt on my table");

    addArchiveContinueButton(face, allow, 0, -1);
}

function addArchivePage3(face, allow){
    cubeContent.addTitle(face, "05/<br>18/<br>21");
    cubeContent.addChat(face, "We picked up the data on May 14 2021.");
    cubeContent.addChat(face, "We delivered the ice on May 18 2021.");
    addImageCube("archiveImgLeft1", face, [
        "./documentation/18e.jpg",
        "./documentation/18paper.jpg",
        "./images/freezeimgS1.jpg",
        "./documentation/18d.jpg",
        "./images/freezeimgS2.jpg",
        "./images/freezeimgS1.jpg",
    ]);

    cubeContent.addResponse(face, "I printed a risograph of my original data.");
    cubeContent.addResponse(face, "And placed the ice data on the print.");

    addImageCube("archiveImgLeft2", face, [
        "./documentation/18a.jpg",
        "./documentation/18g.jpg",
        "./documentation/18b.jpg",
        "./documentation/18f.jpg",
        "./documentation/18h.jpg",
        "./documentation/18c.jpg",
    ]);

    cubeContent.addResponse(face, "The ice vaporizes into the air...");
    cubeContent.addResponse(face, "and melts into the paper.");
    cubeContent.addResponse(face, "It merges with the ink.");

    addArchiveBackButton(face, allow, 1, 0);
}


