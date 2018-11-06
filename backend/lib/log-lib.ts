export const logError = (msg:string = ''): Function => (error: any|PromiseLike<never>) => {
    console.error(msg, error);
}