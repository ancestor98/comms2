export class BaseEvent<T> {
    constructor(private readonly data: T){}
    toString(){
        return JSON.stringify({
            data:this.data,

        });
    }
    toJSON():T{
        return this.data
    }
}