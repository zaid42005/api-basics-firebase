
// WATCH THIS AS A REFRESHER: https://www.youtube.com/watch?v=-MTSQjw5DrM

//middleware is shared code that runs before every endpoint callback, express has a commonly built in middle ware ill leave the old version in comments


//const app = require('express')(); //first part is to import express and then the additonal () are because its a function 
const express = require('express');
const app = express();
const PORT = 8080; //port number that we'll be using 

app.use(express.json()) // use middleware to apply what we want, nmow every request that goes through will be parsed into json so it can be avaible in our post callback

app.listen( //fire up server
    PORT, //port that the server will listen on
    () => console.log(`its alive on http://localhost:${PORT}`) //callback that will print this message to the console when the API is ready
)
// to run the api do node . in the terminal, this will run the index.js file 
// for variables in strings use `` not ''

// after running for first time we see a Cannot GET error which is because we don't have any endpoints set for the API but express is responding with an error message
// we get a 404 page not found meaning our server is working but no page is found (remember the status code identifiers, 200 ok, 400 client problem, 500 server problem)


/* DEBUGGING IS POSSIBLE IN MANY WAYS INCLUDING 
1) using curl http://localhost:${PORT} in command line 
2) VS CODE EXTENSION: REST CLIENT by Huachao Mao
3) Rest Client like Insomnia or Postman, currently we'll use Insomnia poassword is Pressure, create a new collection and then copy paste url
    the request will be in yellow and the response in green

*/


//GET ENDPOINT, essentially what the server should do when theres a get http request
app.get('/tshirt', // this will do GET http://localhost:8080/tshirt, first param is the route to the endpoint, second param is a callback function to handle the request
 (req,res)=>{// req(uest) (incoming data since this is server side) and res(ponse) (data that we are sending to the client side) are objects handles by the function
    res.status(200).send({
        tshirt: 'bols',
        size: 'large',
    }) //response sent to client 200 means ok, .send sends the data package as an object which will be sent in the json format
 });

 //POST ENDPOINT, essentially what the server should do when theres a post http request
 app.post('/tshirt/:id', //first param sets the dynamic url where id can be anything used to identify a unique shirt 
 (req,res)=> { // second param is the standard callback function 
    const { id } = req.params; //you can use the params functions in the req object to get the id in the url
    const { logo } = req.body; // we need to get this stuff from the body, essentially the req object deals with letting us access the body, header, params of the request
    if (!logo){ //checking if theres a logo in the request (body) look at the variable initialization and ull get it
        res.status(418).send({message: 'We need a logo bruh!'}) // if not then send a 418 which tells the client their request is bad but the server is fine
    }
    res.send({ // if we do have a logo and id then we just send the data back as a response
        tshirt: `hi with your ${logo} and ID of ${id}`
    })
    // once we get the info we can save it to the databse but thats beyond the scope of this video 
 });

 //now making the post request we send a json file with an id in the url,
// we see that we get a 500 error meaning it's a server problem, the server doesn't have a way to parse json yet so we need middleware, not everyone uses express to build a json api therefor it is not default


// try sending a post request with a logo and you'll see the normal expected result, but if you send a req without a logo (empty string) then it'll prompt you for one and throw a 418