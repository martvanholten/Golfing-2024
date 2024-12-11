import { ApiResponseInterface } from "./api-response.interface";

export class ApiResponse<T> implements ApiResponseInterface<T>{
    results?: T[] | T;
    message!: string;
    token?: string

    constructor(message: string, results?: T, token?: string){
        this.message = message,
        this.results = results,
        this.token = token
    }
}