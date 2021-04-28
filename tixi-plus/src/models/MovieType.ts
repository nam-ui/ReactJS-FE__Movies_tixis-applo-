export interface MovieTypeCreate {
    moviesName?: string,
    aliases?: string,
    trailer?: string,
    picture?: string,
    described?: string,
    groupCode?: string,
    launchDate?: Date,
    rating: Number  ,
}
export interface MovieType extends MovieTypeCreate {
    id: string,
    createdAt: Date
}
