type HttpStatusCode= 200 |201 ;

const statusCodeMap:Record<HttpStatusCode,string> = {
    200: 'OK',
    201: 'Created',
}



export class ApiResponce{
    public statusCode
    public data
    public code
    public message
    constructor(
        statusCode: HttpStatusCode,
        data : any,
        message?: string,

    ){
        this.statusCode = statusCode
        this.code = statusCodeMap[statusCode]
        this.data= data
        this.message= message
    }
}