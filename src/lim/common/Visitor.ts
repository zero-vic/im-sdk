import HttpApi from '../core/HttpApi';
import ApiUrl from '../api/ApiUrl';
import log from '../log/Logger'

export default class Visitor{
    visitorId:string;
    visitorName:string;
    constructor(visitorId:string,visitorName:string){
        this.visitorId =visitorId;
        this.visitorName = visitorName;
    }
}