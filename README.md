### API Documentation

We will start our project by first documenting all of the routes and data models for our API. Following best practices we will use _verbs_ to specify the type of operation being done and _nouns_ when naming endpoints.

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


##### Task routes

| HTTP verb | URL                  | Request body | Action                     |
| --------- | -------------------- | ------------ | -------------------------- |
| POST      | `/api/tasks`         | JSON         | Adds a new task            |

<hr>

#### Models

##### Project Model

```js
{
  title: String,
  description: String,
  tasks: [ { type: Schema.Types.ObjectId, ref: 'Task' } ]
}
```

##### Task Model

```js
{
  title: String,
  description: String,
  project: { type: Schema.Types.ObjectId, ref: 'Project' }
}
```
