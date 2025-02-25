type HttpStatusCode= 400 | 401 | 403 | 404 | 500 | 503;

const statusCodeMap:Record<HttpStatusCode,string> = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",   
    404: "Not Found",
    500: "Internal Server Error",
    503: "Service Unavailable"
}



class ApiError extends Error{
    public statusCode
    public data
    public code
    constructor(
        message: string,
        statusCode: HttpStatusCode,
        data? : string

    ){
        super(message)
        this.statusCode = statusCode
        this.code = statusCodeMap[statusCode]
        this.data= data

    }
}