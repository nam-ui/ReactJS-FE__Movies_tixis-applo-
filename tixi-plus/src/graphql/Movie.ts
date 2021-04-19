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
        id
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

export const movieQuery = gql`
  query moviesQuery(    
        $_id: ID!  ,
    ) {
    movie(_id: $_id){
        id
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
export const UPDATE_MOVIE = gql`
  mutation updateMovie(    
    $_id: ID!, $moviesName: String, $aliases: String, $trailer: String, $picture: String, $described: String, $groupCode: String, $launchDate: String, $rating:  Int, 
    ) {
    updateMovie(
        _id: $_id,
        moviesName: $moviesName  ,
        aliases: $aliases  ,
        trailer: $trailer  ,
        picture: $picture  ,
        described: $described  ,
        groupCode: $groupCode  ,
        launchDate: $launchDate  ,
        rating:  $rating  ,
        ){
        id
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
export const REMOVE_MOVIE = gql`
  mutation deleteMovie(    
        $_id: ID!,
    ) {
    deleteMovie(_id: $_id){
        id
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

export const LOGIN = gql`
    mutation login($username: String! , $password: String!){
      login(username: $username, password: $password) {
        user {
          id
          username
          password
          createdAt
          role
        }
      }
    }
`

