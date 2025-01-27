import {CanvasUtil} from "./util/canvasUtil";
import { QuestionHandler } from "./util/questionHandler";
import {SpeechToTextUtil} from "./util/speechToTextUtil";
import {TextToSpeechUtil} from "./util/textToSpeechUtil";
import './style.css';
import {SettingsHandler} from "./util/settingsHandler";
import {ChatUtil} from "./util/chatUtil";
import {MenuManager} from "./util/menuManager";

let can : CanvasUtil;
let theforgroundchat : HTMLElement;
let chatUtils : ChatUtil;
let language : string;

document.addEventListener("DOMContentLoaded", async () => {
    can = CanvasUtil.getInstance();
    //chatUtils = new ChatUtil(theforgroundchat);
    theforgroundchat = document.getElementById("containerchatcontainer");
    can.getCanvas().width = window.innerWidth;
    can.getCanvas().height = window.innerHeight;
    
    let settings : Setting = (await SettingsHandler.getInstance().getSettings())[0]
    if (settings != undefined) {
        MenuManager.getInstance().setSettings(settings);

        let base64string = "data:image/jpg;base64," + settings.backgroundImage;
        can.setBackgroundImg(base64string);
        //SETTINGS WE MIGHT NEED LATER:
        //FaceUtil.getInstance().speakingLanguage = settings[0].language;
        //console.log(settings[0].backgroundImage);
        //FaceUtil.getInstance().setCustomBackground(base64string);
        //FaceUtil.getInstance().talkingSpeed = Number(settings[0].talkingSpeed);
        //QuestionHandler.getInstance().AIInUse = settings[0].aiInUse
        //await startSpeechRecognition(settings[0].language);
        //console.log(settings[0])

        language = settings.language;
    }
    setTimeout(() => {can.drawACoolBackground(); can.drawText(); can.drawMenuIcon();}, 150);

    MenuManager.getInstance();
});

document.onclick = async () => {
    if(!MenuManager.getInstance().isLoading()){
        MenuManager.getInstance().setLoading(true);
        if(can.stateOfApp == "home"){
            if(can.MouseOnClickMeButton()){
                drawtheforgroundchat();
            }else if(can.MouseOnMenuIcon()){
                can.drawMenu();
            }
            MenuManager.getInstance().setLoading(false);
            return;
        }
        if(can.stateOfApp == "menu"){
            if(can.MouseOnMenuIcon()){
                MenuManager.getInstance().unloadMenu();
                can.drawHome();
            }

            MenuManager.getInstance().setLoading(false);
            return;
        }
        if(can.stateOfApp == "chat"){
            if(can.MouseOnMenuIcon()){
                location.reload();
            }
            MenuManager.getInstance().setLoading(false);
            return;
        }
    }
}

function drawtheforgroundchat(){
    can.drawACoolBackground();
    chatUtils = new ChatUtil(theforgroundchat);
    chatUtils.buildChat();
    can.drawIconInMenu();

        TextToSpeechUtil.getMp3Data(MenuManager.getInstance().getSettings().greetingMessage)
        .then(async (data) => {
            can.drawACoolBackground();
            can.drawIconInMenu();
            can.renderBars(data);
            chatUtils.addMessage(MenuManager.getInstance().getSettings().greetingMessage);
        })
        .catch((e) => {
            console.error(e);
        });

}

export function audioFinished(){
    chatUtils.doneSpeaking();
    work();
}

function work() {
    const stt = new SpeechToTextUtil();
    stt.start().then(async (result) => {
        chatUtils.addMessage(result);
        let res = await QuestionHandler.getInstance().getAnswerFromAi(result);
        chatUtils.addMessage(res);

        //delete before release
        console.log(res);
        console.log(language);
        // /delete before release

        //check the length of the response and if its to long, split it into multiple parts
        if (res.length > 1000) {
            let split = res.match(/.{1,1000}/g);
            for (let i = 0; i < split.length; i++) {
                TextToSpeechUtil.getMp3Data(split[i], language).then((data) => {
                    can.renderBars(data);
                });
            }
        } else {
            TextToSpeechUtil.getMp3Data(res, language).then((data) => {
                can.renderBars(data);
            });
        }

        /*TextToSpeechUtil.getMp3Data(res).then((data) => {
            can.renderBars(data);
        });*/
    });
}