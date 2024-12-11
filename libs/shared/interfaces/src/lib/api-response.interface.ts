export interface ApiResponseInterface<T>{
    results?: T[] | T;
    message: string;
    token?: string
}