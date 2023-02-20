export class APIException extends Error {
    code: number;
    message: string;
    data: any;
    error: any;

    constructor(code: number, message: string, data?: any, error?: any) {
        super();
        this.code = code;
        this.message = message;
        this.data = data;
        this.error = error;
    }
}