# Course Query Example
Uses Node.JS, Express.JS, and Joi to handle CRUD operations for course queries.
1. See courses (get)
2. Update a course (push)
3. Add a course (put)
4. Remove a course (delete)

Some things to note:
- Does not use a database; is hardcoded.
- Uses environment variable to make a dynamic port (port can be assigned from terminal - refer to index.js line 111).
- Nodemon is used to help streamline the process. 
- Joi is version 17.1.1 and is used to help validate client requests (see index.js for implementation within handlers).
- Postman is a Google Chrome extentions that is used to send example requests and test error codes.
- Don't forget to install NPM in local repository.

