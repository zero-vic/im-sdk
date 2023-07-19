import { imClient, sleep, IListener } from '../core/ImClient';
import Visitor from '../common/Visitor';
import HttpApi from '../core/HttpApi';
import ApiUrl from '../api/ApiUrl';
import log from '../log/Logger';

export class KEFU {
    url!: string;
    server_url!: string;
    appId: number = 10000;
    userSign: string = "sg";
    webSiteId!:string;




    constructor() {

    }
    // 添加消息div
    addMsgDiv(msg: string) {
        let showMsgBox = document.getElementById("showMsgDiv");
        let subDiv = document.createElement("div");
        subDiv.innerHTML = "<div><i>" + msg + "</i><br></div>";
        if(showMsgBox!=null){
            showMsgBox.appendChild(subDiv);
        }
        
    }
    // 发送文本消息
    sendTxtMsg(msg: string, toId: string) {
        imClient.sendP2PMessage(imClient.createP2PTextMessage(toId, msg));
        console.log("发送消息: toid: " + toId + " msg : " + msg);
        this.addMsgDiv(msg);
    }
    // 接收消息处理
    onMessage(msg:any){
        let data = JSON.parse(msg.data.messageBody);
        console.log(data);
        console.log( data.content);
        this.addMsgDiv(data.content);
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
            if(showMsgBox!=null){
                showMsgBox.appendChild(subDiv);
            }
            
        }
        sendBtn.onclick = function () {
            let msg = (sendMsgBox as HTMLTextAreaElement).value;
            console.log(msg)
            // showMsg(msg);
            kefu.sendTxtMsg(msg,"lld");
        }
        window.onbeforeunload = function(){
            // 关闭窗口时调用，服务器结束登录
            imClient.logout();
        }
    }
    // 初始化
    async init() {
        // let visitor = new Visitor();
        // visitor.getVisitorId(this.url);

        // let visitorId = visitor.visitorId;
        // let visitorName = visitor.visitorName;
        let api = new HttpApi(this.url);
        let resp = await api.callGet(ApiUrl.GET_VISITOR_ID);
        if(resp.isFailed()){
            log.info("获取访客id失败");
        }
        // this.visitorId = resp.data.visitorId;
        // this.visitorName = resp.data.visitorName;
        let visitor  = new Visitor(resp.data.visitorId, resp.data.visitorName);
        localStorage.setItem("visitorId",resp.data.visitorId);
        localStorage.setItem("visitorName",resp.data.visitorName);

        console.log(visitor);

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
                e = JSON.parse(e);
                this.onMessage(e)

            },
            onLogin: (uid) => {
                console.log("用户" + uid + "登陆sdk成功");
            }


        };
        imClient.init("http://127.0.0.1:8000/v1", this.appId, visitor.visitorId, this.userSign,this.webSiteId, ListenerMap, function (sdk) {
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



