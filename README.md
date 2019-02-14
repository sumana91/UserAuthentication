## UserAuthentication
Application that provides the user to Register and Login with the help of the referral code, using Nodejs. JWT authentication 
is used to manage the user authentication.

### Usecases supported:
- A user can register as a parent user, and will generate a referral code. 
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
  - **Method : POST**
- To register as a child user: `/register/childUser`  
  - **Method : POST**
- To Login `/login` . 
  - **Method : POST**
- To list all child users by a parent user: `/parentUser/:referral_code` 
  - **Method : GET**
- To edit/update the child user details: `/parentUser/update/childuser/:userId` 
  - **Method : PUT**
 
 ### Reference image of db setup
 <img width="600" alt="db_setup" src="https://user-images.githubusercontent.com/21328393/52704504-b6d50080-2fa6-11e9-8122-4d40497ca95d.png">
 
 ### Results
The output of all the endpoints can be viewed in the **images** folder
