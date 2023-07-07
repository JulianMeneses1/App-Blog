# Blog Application
***
## 1. :notebook_with_decorative_cover: General Info
This project is a dynamic website that allows you to view articles, filter them by category or search by the title. Also you can create, delete and edit an article. 
I created this project as a way to practice what I am learning, using Node.js for the back and Angular for the front. 

Status: ACTIVE :heavy_check_mark:

## 2. :gear: Technologies
***
### Back
Here are the technologies and dependencies used in the back of this project:
#### Technologies
* [Node.js](https://nodejs.org/es): Version 18.16.0
* [Express](https://expressjs.com/): Version 3.1.0
* [MongoDB](https://www.mongodb.com/): Version 6.0.6
#### Libraries
* Cors: Version 2.8.5
* Mongoose: Version 7.3.1
* Mongoose-paginate-vs: Version 1.7.1
* Multer: Version 1.4.5
* Validator: Version 13.9.0
### Front
Here are the technologies and libraries used in the front of this project:
#### Technologies
* [Angular](https://angular.io/): Version 16.0.0
* [NodeJS](https://nodejs.org/es): Version 18.16.0
* [npm](https://www.npmjs.com/): Version 9.5.1
* [TypeScript](https://www.typescriptlang.org/): Version: 5.0.2
#### Libraries
* ngrx/effects: Version 16.0.1
* ngrx/store: Version 16.0.1
* FontAwesome: Version 0.13.0
* Bootstrap: Version 5.3.0
* ngx-infinite-scroll: Version 16.0.0
* sweetalert2: Version 11.7.12
## 3. :hammer_and_wrench: Installation
***
### Back
In order to run this project you need to have Node.js and MongoDB installed in your system, for that go to the respective pages, [MongoDB](https://www.mongodb.com/try/download/community) and [Node.js](https://nodejs.org/es), download the installer and follow the instructions. After that you have to open this proyect in your IDE and configure the connection to your database as well as other parameters. Use this example as a guide: 
```
# database connection
const connection = async () => {
    try {
        await mongoose.connect("mongodb+srv://username:password@app-blog.ynp5pxg.mongodb.net/app_blog?retryWrites=true&w=majority");
    } catch (error) {
        throw error;
    }
}

connection();

# creating the node serve
const app = express();
const port = 3900;
```
Great, now you have to install the the libraries used in this proyect with the next command:
```
  npm install
 ```
Good, the configuration is set up, now you can run the server. :warning: Remember to have the database already created in MongoDB, otherwise you will not be able to run the server. To create the database you can use MongoDB Compass or another administrator.

### Front

First of all you need to install NodeJS, for that go the official page of NodeJS (https://nodejs.org/es) and follow the instructions to install this technologie in your system, which includes npm. 
Then, using npm, you have to install the libraries used in this proyect with the next command:
```
  npm install
 ```
In case that some librarie doesn't get installed, don't worry here I leave you the respective command to install every one:

:warning: Remember that all the data is loaded from the Back End server, so you need to start the Back End server first to be able to see the data and successfully run the app.

## 4. :wave: Collaboration
***
Feel free to make any suggestion that you think can help improve the quality of the project! :grinning:




