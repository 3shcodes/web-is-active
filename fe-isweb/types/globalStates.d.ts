export interface User {
    userId: string,
    userName: string,
    email: string,
    image: string,
    token: string,
    refToken: string,
} 

export interface Site {
    siteId: string,
    siteName: string,
    isFav: boolean,
    url: string,
    lastStat: string,
    lastTime: Date,
    issue: string | null,
}