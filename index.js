const Joi = require('@hapi/joi'); //this is a class; class naming convention: capital first letter of each word
const express = require('express');
const app = express(); //represents our application
//has a lot of usefull methods like get, post, put, delete

app.use(express.json()); //need this so express can json

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
]

app.get('/', (req, res) => { //this is how you defines a route
    res.send('Hello World!!!');
}); //get takes two arguments: path and callback function

app.get('/api/courses', (req, res) => { //in real world would want to pull something from database
    res.send(courses);
}); //can move everything that relates to courses to a seperate file called courses.js
//express gives application a structure

//adding more parameters to specify a course
app.get('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id)) //find the course that matches the id
    //need to parseInt bc it is a string
    if (!course) { //if no course is found, should return a 404 error, as is the convention
        res.status(404).send('The course with the given ID was not found.');
        return;
    }
    res.send(course);
});

//to create a new course we want to post to the server
//not working with database, need to manually assign id
app.post('/api/courses', (req, res) => {

    //using Joi to validate requests and return proper error messages to the client
    //using postman from chrome to send example requests to http://localhost:5000/api/courses
    const { error } = validateCourse(req.body); //equivalent to getting result.error
    if (error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course); //return the course object to the client at the end
});

//updating a course
app.put('/api/courses/:id', (req, res) => {
    // look up the course with the given id
    // if not, return 404
    let course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) { 
        res.status(404).send('The course with the given ID was not found.');
        return;
    }

    // otherwise, need to validate the course
    // else, 400 - Bad Request
    const { error } = validateCourse(req.body); //equivalent to getting result.error
    if (error){
        res.status(400).send(error.details[0].message);
        return;
    }

    // Update course
    course.name = req.body.name;
    // return updated course to the client
    res.send(course);
});

//deleting a course
app.delete('/api/courses/:id', (req, res) => {
    //look up the course
    //doesnt exist? return 404
    let course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) { 
        res.status(404).send('The course with the given ID was not found.');
        return;
    }

    //otherwise delete it
    const index = courses.indexOf(course);
    //use splice to remove 1 object at this index
    courses.splice(index, 1);

    //return the course that was deleted
    res.send(course);
});

//all of the validation logic in one place, using Joi
function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

//need port to be dynamic
//environment variable -> PORT
const port = process.env.PORT || 3000; //use env var if available, otherwise defaut to port 3000
app.listen(port, () => console.log(`Listening on port ${port}...`)); //listening for http request on localhost:3000
//use backtick ` to use template string
//in terminal, the command 'export PORT=5000' (set on windows) sets the port to 5000