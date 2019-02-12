## User_Authentication
Application that provides the user to Register/Login with the help of referral code, using Nodejs. JWT authentication 
is used to manage the user authentication.

### Usecases supported:
- A user can register as a parent user, and can generate a referral code. 
- A user can register as a child user only by using the parent's referral code.
- Authentication is handled using JWT. 
- A parent user can list all his child users and edit their profile. 

### Requirements
- Nodejs
- Express js
- Postgresql
- Postman
- Knex
- Bookshelf

### Installation and Setup 
- Clone the repository to your local
- Run `npm install --save` to get all the node packages.
- Set up the database by running the migration script in the db folder, `knex migrate:latest`.
- Port is 8001
- Access the endpoints on localhost as `https://localhost:8001/`

### Run the code locally
- `node app.js`

### Set of Endpoints implemented
- To register as a parent user: `/register/parentUser` 
  Give the user details in the body.
- To register as a child user: `/register/childUser`
- To Login `/login`
- To list all child users by a parent user: `/parentUser/:referral_code`
- To edit/update the child user details: `/parentUser/update/childuser/:userId`
                                          
  

