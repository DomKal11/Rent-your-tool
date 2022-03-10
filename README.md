### API Documentation

API is deployed on HEROKU - <a href="https://rentyourtools.herokuapp.com/api"><strong>LINK</strong></a>

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
