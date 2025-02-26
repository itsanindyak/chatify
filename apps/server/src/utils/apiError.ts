type ErrorStatusCode= 400 | 401 | 403 | 404 | 500 | 503;

const ErrorstatusCodeMap:Record<ErrorStatusCode,string> = {
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
        statusCode: ErrorStatusCode,
        data? : string

    ){
        super(message)
        this.statusCode = statusCode
        this.code = ErrorstatusCodeMap[statusCode]
        this.data= data

    }
}