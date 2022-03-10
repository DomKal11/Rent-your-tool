### API Documentation

API is deployed on HEROKU - <a href="https://rentyourtools.herokuapp.com/api"><strong>LINK</strong></a>

### User Stories

Personas:<br />
<b>Dominik:</b> Dominik owns a large number of tools. His tools often only lie in the garage and are used more on weekends. Dominik wants to borrow tools from time to time and earn something extra.<br />
Dominik is an authenticated <b>contributor</b>.
<b>Daniel:</b> Daniel wants to borrow tools, he doesn't have much. He wants to see the tools that are offered in his area.<br />
Daniel is an authenticated <b>contributor</b>. He have to be authenticated to be able to borrow the tools.<br />
<b>Tom: </b> In the attic of his grandparents' house, he found a collection of old card games that he would like to share with others. He is not a frequent player, but he would like to share the finding.
Tom is also a contributor. He will need to register to add games.<br />
<b>Jennifer:</b> Jennifer is not registered. Therefore, it can only see previews of available tools on the map.<br />
Jennifer is a <b>viewer</b>, can only see the map and tools overviews.<br />

Stories:<br />
As a viewer, I can only see the main page and tools map with tools overviews.<br />
As a contributor, I can create and rent my own tools.<br />
As a contributor, I can borrow others tools.<br />
As a contributor, I can comment and rate each advertised tool.<br />


### Technologies used

* [ReactJS](https://reactjs.org/)
* [Node.js](https://nodejs.org/)
* [npm](https://www.npmjs.com/")
* [HTML 5](http://www.html5.com/)
* [CSS](https://www.w3schools.com/w3css/defaulT.asp)


#### Routes

##### Tool routes

| HTTP verb | URL                        | Request body | Action                                 |
| --------- | -------------------------- | ------------ | -------------------------------------- |
| GET       | `/api/tools`               | (empty)      | Returns all the tools                  |
| POST      | `/api/tools`               | JSON         | Adds a new tool                        |
| GET       | `/api/tool/:toolId`        | (empty)      | Returns the specified tool             |
| PATCH     | `/api/tool/:toolId/:status`| JSON         | Changing status (available/rented      |
| PATCH     | `/api/:toolId/:userId/rent`| JSON         | Changing "rentedby" to user who rented |
| PATCH     | `/api/:toolId/edit`        | JSON         | Changing tool parameters (edit)        |
| DELETE    | `/api/:toolId/delete`      | (empty)      | Deleting tool by id                    |


##### User routes

| HTTP verb | URL                      | Request body | Action                     |
| --------- | ------------------------ | ------------ | -------------------------- |
| GET       | `/api/user/:iserId`      | (empty)      | Returns user data          |
| PATCH     | `/api/user/:iserId/edit` | JSON         | Updating user profile      |


##### Comment routes

| HTTP verb | URL                                      | Request body | Action                     |
| --------- | ---------------------------------------- | ------------ | -------------------------- |
| POST      | `/api/comment/:id`                       | JSON         | Posting comment            |
| DELETE    | `/api/comment/:toolId/:commentId/delete` | (empty)      | Deleting comment           |

<hr>

#### Models

##### Tool Model

```js
{
    name: String,
    price: Number,
    imageUrl: String,
    details: String,
    status: {type: String, default: "available"},
    from: Date,
    to: Date,
    city: String,
    location: [{ type: Number}],
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    rentedby: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comment: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  }
```

##### User Model

```js
{
    email: {
      type: String,
      unique: true 
    },
    password: String,
    name: String,
    phone: String
  }
```

##### Comment Model

```js
{
    author: { type: Schema.Types.ObjectId, ref: "User" },
    rate: Number,
    text: String,
    tool: { type: Schema.Types.ObjectId, ref: "Tool" },
  }
```

<!--Project Link-->
### Link to project
<a href="https://rentyourtools.netlify.app/">Rent your tools</a>


<!--Future Work-->

### Future Work
* Implementation of the list - not only the map
* Messenger - users will be able to message each other


<!--RESOURCES-->
### Resources
* <a href="https://www.npmjs.com/">npm</a>
* <a href="https://stackoverflow.com/">Stack Overflow</a>


<!--TEAM MEMBERS-->
### Team members
* Dominik Kaloc

<!-- ACKNOWLEDGMENTS -->
### Acknowledgments

* [Ironhack](https://www.ironhack.com/en)

<p align="right">(<a href="#top">back to top</a>)</p>

