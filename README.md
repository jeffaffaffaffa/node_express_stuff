# Course Query Example
Uses Node.JS, Express.JS, and Joi to handle backend CRUD operations for a course querying service:
1. (C)reate: add a course with PUT.
2. (R)ead: see courses with GET.
3. (U)pdate: update a course with PUSH.
4. (D)elete: remove a course with DELETE.

Some things to note:
- Does not use a database; is hardcoded.
- Uses environment variable to make a dynamic port (port can be assigned from terminal - refer to index.js line 111).
- Nodemon is used to help streamline the process. 
- Joi (@hapi/joi) is version 17.1.1 and is used to help validate client requests (see index.js for implementation within handlers).
- Postman is a Google Chrome extention that is used to send example requests and test error codes.
- Don't forget to install NPM in local repository.
- .gitignore is handy to reduce repo clutter.
- Original idea by Programming with Mosh.

