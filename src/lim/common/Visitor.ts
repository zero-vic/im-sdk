import HttpApi from '../core/HttpApi';
import ApiUrl from '../api/ApiUrl';
import log from '../log/Logger'

export default class Visitor{
    visitorId:string='';
    visitorName:string='';
    constructor(){

    }
    public async getVisitorId(url:string){
        let api = new HttpApi(url);
        let resp = await api.call(ApiUrl.GET_VISITOR_ID,{},{});
        if(resp.isFailed()){
            log.info("获取访客id失败");
        }
        this.visitorId = resp.data.visitorId;
        this.visitorName = resp.data.visitorName;
        localStorage.setItem("visitorId",resp.data.visitorId);
        localStorage.setItem("visitorName",resp.data.visitorName);
    }
}