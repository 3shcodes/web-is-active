export interface User {
    userId: string,
    userName: string,
    email: string,
    image: string,
    password?:string,
    token: string,
    refToken: string,
} 

export interface Site {
    siteId: string,
    siteName: string,
    isFav: boolean,
    url: string,
    lastStat: number,
    lastTime: string,
    issue: string | null,
}

export interface Response {
    err?:any,
    data?:any,
    msg?:string
    ok:boolean
}

export interface CompProps { 
    user : User,
}
