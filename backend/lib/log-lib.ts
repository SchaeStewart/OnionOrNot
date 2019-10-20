export const logError = (msg:string = '') => (error: any|PromiseLike<never>) => {
    console.error(msg, error);
}