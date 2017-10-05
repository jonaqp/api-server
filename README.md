# API-Server
>>> an opinionated, declarative, component approach to builing api's
* * *

## Overview

> The goal of this project is to create a solid baseline 
> api server based on node, express, and mongo
>  with json web token authentication.
* // TODO: Add GraphQL
* * *

## Architecture

>> Components are composed of:
>> * a route controller
>> * a router (exported, declared in global app)
>> * services (exported, component methods)
>> * schema (exported, declared in the global schema)
>> * utils (methods used internally by the component)
>> * tests

>> To declare a component:
>> 1. import the route into app,js, add with root route
>>    * `const componentRoutes = require('./component/routes');`
>>    * `server.use('/root', componentRoutes);`
>> 2. import the schema slices into mongo/Schema.js,
>>    add it to the global model
>>    * `const componentSchema = require('./component/schema');`
>>    * `globalModel = {`
>>    * `Component: [ componentSchema ]`
>>    * `};`

> ### Structure
    |-config.js                 // App wide configuration                                       
    |-app.js                    // Ties everything together
    |-server
      |-index.js                // Init's express, adds middleware, exports { server, router }
      |-utils.js                // exports common server utilities
      |-middleware
        |-bodyParser.js         // applies bodyParser                                                // TODO: add to config file
        |-cors.js               // applies cors                                                      // TODO: add to config file
      |-test                                                                                         // TODO: add tests
    |-mongo
      |-index.js                // Inits mongoose, runs model build, connects db, exports { model }
      |-Schema.js               // Global Schema -- Import component Schema here --
      |-buildModel.js           // builds global model from Global Schema
      |-tests                                                                                        // TODO: add tests
    |-common
      |-validation.js           // input validation
      |-tests                                                                                        // TODO: add tests
    |-auth
      |-controllers.js          // route controllers for authentication component
      |-routes.js               // exports authentication routes 
      |-services.js             // exports authentication services { authorizeRoute, decodeToken }
      |-userSchema.js           // exports authentication user schema slice
      |-utils
        |-jwt.js                // jwt utility functions { encrypt, decrypt }
        |-bcrypt.js             // bcrypt utility functions { hashPassword, comparePassword }
      |-tests                                                                                        // TODO: add tests
    |-user
      |-controllers.js          // route controllers for user component
      |-routes.js               // exports user routes
      |-userSchema.js           // exports user schema slice
      |-tests                                                                                        // TODO: add tests
## Components
> ### Server (Express)
* Middleware
  * body-parser
  * cors


> ### Mongo (Mongoose)
* [Master Schema] [masterSchema] ref link ?e
  * Declaratively build your entire app database schema 
    in a single location
  * All models compiled at startup and exported from 
    single location
  * Exports single global model object containing all schema
    and database utilities


> ### Auth (bcrypt & jwt)
* Routes ~ /auth/
    * POST /register: 
      * accepts { username, password }
      * creates new User
      * returns auth token
    * POST /login:
      * accepts { username, password }
      * checks existance of user and matches password hash
      * returns auth token
    * POST /logout:
      * accepts 'Authorization' request header
      * decodes token, finds user, removes token from user.activeTokens, 
        saves user
      * returns success message
* Services
  * authorizeRoute: route authorization middleware
* Schema
  * User: { username, password, activeTokens }


> #### Mongo Schema Declaration Example

#### posts/postSchema.js

* * *

    const { SchemaTypes } = require('../mongo').utils;

    const PostSchema = {
      title: {
        type: String,
        required: true
      },
      body: {
        type: String
      }
      comments: [{
        type: SchemaTypes.ObjectId,
        ref: 'Comment'
      }]
    };

    // BEWARE: Hooks have posibility of getting overwritten by subsequent component schema
    const PostHooks = (Schema) => {
      Schema.pre('save', async function preSave(done) {
        try {
          const post = this;
          if (post.isModified('title')) {
            post.title = post.title.toUppercase();
          }
          done();
        } catch (error) {
          done(error);
        }
      })
    };

    // BEWARE: Methods have posibility of getting overwritten by subsequent component schema
    const UserMethods = (Schema) => {
      Schema.methods.checkPassword = async function checkpassword(password) {
        try {
          const match = await comparePassword(password, this.password);
          return match;
        } catch (error) {
          throw new Error(error);
        }
      }
    };

    module.exports = {
      Schema: PostSchema,
      Hooks: PostHooks,
      Methods: PostMethods
    };

* * *

  #### mongo/Schema.js

* * *

    /**
    * Mongo schema declaration file
    * 
    * Used to allow multiple components to add to GlobalSchema build object
    * 
    * !!!!! THIS DOES NOT CHECK FOR DUPLICATE VALUES IN IMPORTED SCHEMA, LAST IN LINE WINS !!!!!
    */

    const postSchema = require('../post/postSchema');

    const GlobalSchema = {
      Post: [
       postSchema
      ]
    };

    module.exports = GlobalSchema;

* * *

