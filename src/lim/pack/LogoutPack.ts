export class LogoutPack {
    appId:number;
    userId?:string;
    clientType?:string;
    constructor(appId:number,userId:string,clientType:string){
        this.appId = appId;
        this.userId = userId;
        this.clientType = clientType;
    }
}