import { gql } from "@apollo/client"

export const ADD_MOVIE = gql`
    mutation createMovie(    
        $moviesName: String  ,
        $aliases: String  ,
        $trailer: String  ,
        $picture: String  ,
        $described: String  ,
        $groupCode: String  ,
        $launchDate: String  ,
        $rating:  Int  ,
    ) 
    {
        createMovie( 
        moviesName: $moviesName  ,
        aliases: $aliases  ,
        trailer: $trailer  ,
        picture: $picture  ,
        described: $described  ,
        groupCode: $groupCode  ,
        launchDate: $launchDate  ,
        rating:  $rating  , ) { 
            moviesName
            aliases
            trailer
            picture
            described
            groupCode
            launchDate
            rating
            createdAt
        }
    }
`
export const moviesQuery = gql`
  query moviesQuery{
    movies{
        moviesName
        aliases
        aliases
        trailer
        picture
        described
        launchDate
        groupCode
        createdAt
    }
}
`



