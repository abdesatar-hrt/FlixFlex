FlixFlex Movie App Overview:

"Built with Node.js and MongoDB, our Movie App offers users a seamless experience to explore, favorite, and watch trailers for movies and TV series. Leveraging an MVC architecture, the app integrates TMDb API for dynamic content, and Git ensures collaborative development, fostering modularity and maintainability."

In more detail:

1.Architecture:
Employed an MVC (Model-View-Controller) structure for a modular and organized codebase, separating concerns and enhancing scalability.

2.Collaborative Development:
Utilized Git for version control, enabling collaborative development and streamlined team coordination, ensuring efficient workflow and code management.

3.Data Integration:
Integrated TMDb API to dynamically fetch movie and TV series data, leveraging Node.js for the backend and MongoDB for a flexible and scalable database, ensuring a responsive and feature-rich user experience.

Why NodeJS and MongoDB ?

1.Node.js:
Node.js was chosen because it's great at handling many things at once without slowing down, making our app responsive and able to handle lots of users at the same time. This is especially important for real-time updates and when many people are using the app simultaneously, and also i hsould it because i am familiar with it

2.MongoDB:
We went with MongoDB because it's like a super flexible and scalable way to store information. Think of it like organizing data in a way that's easy to change and grow as our app evolves. MongoDB's ability to handle different types of data and grow with the app fits well with the dynamic nature of movies and changing user preferences.

TMDB API ?
The Movie Database API providing access to a vast collection of movie and TV show information, enriching the app with dynamic and up-to-date content.

App Modules:

1.Express:

Explanation: Express is like the boss of our web app, helping us build and manage the parts that let users interact with it.

2.Axios:

Explanation: Axios is our messenger; it talks to other websites (like TMDb) and brings back cool information for our app.

3.Mongoose:

Explanation: Mongoose is like a helper for talking to our database (MongoDB). It helps us organize and get information from there.

4.JWT (JSON Web Tokens):

Explanation: JWT is like a secret code that proves to our app that you are who you say you are, making sure only the right people can do certain things.

5.Dotenv:

Explanation: Dotenv is like a manager for secrets. It keeps our special codes and passwords safe and sound, so nobody can see them.

6.Git:

Explanation: Git is like a magic book that keeps track of all the changes we make to our app. It helps us work together without messing things up.



Some Endpoints Explanation:

Create Account:

Endpoint: POST api/user/register
Explanation: Sign up for the app by creating a username and password. 

Login User:

Endpoint: POST api/user/login
Explanation: Login and create a token for the user.

Get All medias:

Endpoint: GET https://api.themoviedb.org/3/discover/${mediaType}
Explanation: In order to get all the Movies and/or TV series we provide a mdeiaType variable in the request params, we also
add a middleware of user should be logged in with his token to be able to request what he wants in the app.

Get Top 5 rated Medias:

Endpoint: GET https://api.themoviedb.org/3/${mediaType}/top_rated
Explanation: In Order to discover the top 5 rated movies or TV series we used this endpoint, and as mentioned above the variable mediaType
is provided to choose between movies or series. the results of this endpoint are the top rated movies or TV series so we slice it to the top 5   

Get Movies in Batches of 10:

Endpoint: GET https://api.themoviedb.org/3/discover/${mediaType}
Explanation: In order to get the pages of movies and TV series in batches of 10 we slice the results into a batch size = 10

Toggle Favorites:

Endpoint: PUT api/medias/tv/100/add-to-favorites
Explanation: Quickly switch a movie or TV show between being your favorite and not. Add it if it's not, or remove it if it already is.

Get All Favorites:

Endpoint: GET api/medias/list-of-favorites
Explanation: See all the movies and series you've marked as favorites. It's like a collection of all your top picks!

Search Movies and Series:

Endpoint: GET https://api.themoviedb.org/3/search/multi
Explanation: Look for specific movies or TV series by typing in what you want. Find results matching your search.


Get Movie or Series Details:

Endpoint: GET https://api.themoviedb.org/3/${mediaType}/${mediaId}
Explanation: here we are looking for the details of a movie or TV show.

Watch a Trailer:

Endpoint: GET https://api.themoviedb.org/3/${mediaType}/${mediaId}/videos
Explanation: Here we are looking for a trailer of a movie or TV serie, we search for the video type that match a trailer
and the result a Trailer youtube key that we can use in iframe to redirect the user to that trailer.
