# NoSQL Social Network API

## Description

Using mongoose, this simple API allows users to share their thoughts, make reactions, as well as friend other users.

![Github license](http://img.shields.io/badge/License-MIT-yellow.svg)

[The User Routes are demonstrated here.](https://drive.google.com/file/d/1Tagj6hT7cnEhnswq09YD7IDFnyRhjf0Q/view)
[The Thought Routes are demonstrated here.](https://drive.google.com/file/d/1Tagj6hT7cnEhnswq09YD7IDFnyRhjf0Q/view)

## Contents

1. [About](#about)
   1. [User Story](#user%20story)
   2. [Acceptance Criteria](#acceptance%20criteria)
   3. [Visuals](#visuals)
   4. [Technologies](#technologies)
2. [Installation](#installation)
3. [License](#license)
4. [Usage](#usage)
5. [Contributing](#contributing)
6. [Testing](#testing)
7. [Authors and Acknowledgements](#authors%20and%20acknowledgements)

## About

This application is a demonstration of a very simple social network API that uses express.js for routing, a MongoDB database and the Mongoose ODM to perform basic CRUD operations.

## User Story

```
AS A social media startup

I WANT an API for my social network that uses a NoSQL database

SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```
GIVEN a social network API

WHEN I enter the command to invoke the application

THEN my server is started and the Mongoose models are synced to the MongoDB database

WHEN I open API GET routes in Insomnia for users and thoughts

THEN the data for each of these routes is displayed in a formatted JSON

WHEN I test API POST, PUT, and DELETE routes in Insomnia

THEN I am able to successfully create, update, and delete users and thoughts in my database

WHEN I test API POST and DELETE routes in Insomnia

THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Visuals:

![Thought Routes Screenshot](assets\thought-routes.png)

![User Routes Screenshot](assets\user-routes.png)

## Technologies

- [Express.js](https://www.npmjs.com/package/express)

- [Mongoose](https://www.npmjs.com/package/mongoose)

## Installation

Please run the following dependencies to install the application:

`npm i`

## License

This reposititory is licensed under the MIT license.

For more information about this license or any others, please visit: [https://choosealicense.com/](https://choosealicense.com/).

## Usage

After installing dependencies, use `npm start` to begin the server and then use a application like Insomnia or Postman to view the routes.

## Contributing

This repostiory is currently not accepting contributions.

## Testing

There are currently no tests installed in this application.

## Authors and Acknowledgements

Built by: Erin Voelker

## Contact Information

- GitHub: [ekellv](https://github.com/ekellv)
- Email: [erinkvoelker@gmail.com](mailto:erinkvoelker@gmail.com)
