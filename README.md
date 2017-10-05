# API-Server

## Components
### Server (Express)
* Middleware
  * body-parser
  * cors


### Mongo (Mongoose)
* Master Schema (/mongo/Schema.js)
  * Declaratively build your entire app database schema 
    in a single location
  * All models compiled at startup and exported from 
    single location


### Auth (bcrypt & jwt)
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


#### Mongo Schema Declaration Example

#### posts/postSchema.js

* * *

    const Types = require('../mongo').Types;

    const PostSchema = {
      title: {
        type: String,
        required: true
      },
      body: {
        type: String
      }
      comments: [{
        type: Types.ObjectId,
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



