export interface MovieTypeCreate {
    moviesName: String,
    aliases: String,
    trailer: String,
    picture: String,
    described: String,
    groupCode: String,
    launchDate: Date,
    rating: Number,
}
export interface MovieType extends MovieTypeCreate {
    id: String,
    createdAt: Date
}
