import { imClient, sleep, IListener } from '../core/ImClient'
import Visitor from '../common/Visitor';

export class KEFU {
    url: string = "";
    server_url: string = "";
    appId: number = 1000;
    userSign: string = "sg";




    constructor() {
    
    }
    // 生成html页面
    ui() {
        let showMsgDiv = document.createElement("div");
        showMsgDiv.setAttribute("id", "showMsgDiv");
        let sendDiv = document.createElement("div");
        let sendTxt = document.createElement("textarea");
        sendTxt.setAttribute("rows", "10");
        sendTxt.setAttribute("cols", "30");
        sendTxt.setAttribute("id", "sendMsgBox");
        sendTxt.textContent = "txt";
        let sendBtn = document.createElement("button");
        sendDiv.appendChild(sendTxt);
        sendDiv.appendChild(sendBtn);
        sendBtn.textContent = "sendMsgBtn";
        document.body.appendChild(showMsgDiv);
        document.body.appendChild(sendDiv);

        let sendMsgBox = document.getElementById("sendMsgBox");
        function showMsg(msg: string) {
            let showMsgBox = document.getElementById("showMsgDiv");
            let subDiv = document.createElement("div");
            subDiv.innerHTML = "<div><i>" + msg + "</i><br></div>";
            showMsgBox.appendChild(subDiv);
        }
        sendBtn.onclick = function () {
            let msg = (sendMsgBox as HTMLTextAreaElement).value;
            console.log(msg)
            showMsg(msg);
        }
    }
    // 初始化

    init() {
        let visitor = new Visitor();
        visitor.getVisitorId(this.url);
        
        let visitorId = visitor.visitorId;
        let visitorName = visitor.visitorName;
        
    
        console.log("userId:" + visitorId);
        console.log("userName" + visitorName);

        var ListenerMap = {
            onSocketConnectEvent: (option, status, data) => {
                console.log("已建立连接1:" + JSON.stringify(status));
            },
            onSocketErrorEvent: (error) => {
                console.log("连接出现错误:" + error);
            },
            onSocketReConnectEvent: () => {
                console.log("正在重连:");
            },
            onSocketCloseEvent: () => {
                console.log("连接关闭:");
            }, onSocketReConnectSuccessEvent: () => {
                console.log("重连成功");
            },
            onTestMessage: (e) => {
                console.log("onTestMessage ：" + e);
            },
            onP2PMessage: (e) => {
                console.log("onP2PMessage11 ：" + e);
                console.log(this);
                e = JSON.parse(e);
                // this.$emit('P2PMessage', e.data);
                // this.on('P2PMessage',this.onMessage);    
                // this.onMessage(e);

            },
            onLogin: (uid) => {
                console.log("用户" + uid + "登陆sdk成功");
            }


        };
        imClient.init("http://127.0.0.1:8000/v1", this.appId, visitorId, this.userSign, ListenerMap, function (sdk) {
            if (sdk) {
                console.log('sdk 成功连接的回调, 可以使用 sdk 请求数据了.');

            }
            else {
                console.log('sdk 初始化失败.');
            }
        });
    }

}

export const kefu = new KEFU();



