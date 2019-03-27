# TODO List

***

# Languages and Frameworks

- JavaScript / NodeJS / Express : Implement in JS framework first.

- Java / Srping / SpringMVC : Refactor the website by Java Spring.

- MongoDB / Mongoose 

***

# API Specification

---

## Model Layerout

### Task Table

| id | title | createAt | finished | category id |
|:--:|:-----:|:--------:|:--------:|:-----------:|
| 0  | read book | 2019-3-12 | false | 0 |
| 1  | make notes | 2019-3-22| false | 1 |
| 2  | buy ticket | 2019-3-21 | false | 0 |

### Category Table

| id | category |
|:--:|:--------:|
| 0  | Noraml |
| 1  | Emergency |

---

## Routing and Behaviors

| Route Name |  URL        |  HTTP Verb | Description |
|:----------:|:-----------:|:----------:|:-----------:|
| Index      | /notes      |  GET       | Display a list of all TASKs |
| New        | /notes/new  |  GET       | (No need - Put it in the same page) |
| Create     | /notes      | POST       | Create a new TASK when the form is submitted |
| Edit       | /notes/:id/edit | GET  | Click Edit to Select specific TASK and direct to the edit page |
| Update     | /notes/:id/ | PUT  | Update the information for the selected TASK |
| Delete     | /notes/:id  | DELETE | Delete the selected TASK |
| Toggle       | /notes/:id  | PATCH  | Toggle the status of selected TASK between finished: true/fasle  |
| Get Details (if needed) | /notes/:id/detail | GET | Display the detail of selected TASK |

---

### Type a TASK in the insert bar

- No specific Routing

### Display all TASKs

#### Home Page
- HTTP: GET
- Path: ./

User requests a page. The server sends HTTP GET request. Retrieve all data from the TASK table from DB and return JSON formatted data to the client.

```
|| Client: /notes ||  ->  || Server ||  ->  || DB ||

            GET all Request: /notes

|| Client: /notes ||  <-  || Server ||  <-  || DB ||

            Render: index page with `tasks` info
```

### Insert a TASK into the Table

#### Create a new TASK when the form is submitted
- HTTP: POST
- Path: ./

User submits the form. Server grabs attributes from the form and uses them to insert a TASK into DB.

```
|| Client: /notes ||  ->  || Server ||  ->  || DB ||

            POST Request: /notes with `req.body`

|| Client: /notes ||  <-  || Server || 

            Redirect: /notes
```


### Edit a stored TASK

#### Click Edit to Select specific TASK and direct to the edit page
- HTTP: GET
- Path: ./edit/:id

User selected the TASK. Server retrieves the existing information from selected TASK from the DB, redirector to the edit page and display information in the form.

`(I am going to handle this updaing behavior in the same page)`

```
|| Client: /notes ||  ->  || Server ||  ->  || DB ||

            GET one Request: /notes/:id/edit 

|| Client: /notes/:id/edit ||  <-  || Server ||  <-  || DB ||

            render: edit page with `task` info 
            (did not use redirect since we have been at /edit page)
```

#### Update the information for the selected TASK
- HTTP: PUT 
- Path: ./edit/:id

User submits the form. Server grabs attributes from the form and uses them to update a TASK in DB by its id.

```
|| Client: /notes/:id/edit ||  ->  || Server ||  ->  || DB ||

            PUT one Request: /notes/:id with `req.body` and `req.params`

|| Client: /notes ||  <-  || Server ||  <-  || DB ||

            Redirect: index page
```

**Method PUT is not allowed by Access-Control-Allow-Methods in preflight response.**

```
Refused to load the font '<URL>' because it violates the following Content Security Policy directive: "default-src 'self'". Note that 'font-src' was not explicitly set, so 'default-src' is used as a fallback.
```

Solved by using `method-override` npm library.


### Delete a stored TASK

#### Delete the selected TASK
- HTTP: delete
- Path: ./:id

User selected the TASK. Server grabs id of that TASK and deletes that TASK from the DB.


```
|| Client: /notes ||  ->  || Server ||  ->  || DB ||

            DELETE one Request: /notes/:id

|| Client: /notes ||  <-  || Server ||     || DB ||

            Redirect: index page
```


### Toggle the status of a TASK (finished: true/false)

#### Toggle the status of a TASK 
- HTTP: PATCH
- Path: ./:id

User selected the finished box for a specific TASK. Server grabs id of that TASK and toggle the value of "finished" for that TASK from the DB.

**How to toggle in the same Page?**

***

## User Story

In this product, we only have one kind of user.

![TODO Design](./images/todo.png)

### Basic Functionality

**As a user** I can:

#### Type a TASK in the insert bar
- [ ] This bar should constrict user type in at most 50 characters.
- [ ] The length of this bar cannot be changed.

#### Insert a TASK into the Table
- [ ] When the user clicks "Add," it should check if the user leaves the bar blank.
- [ ] Created time of the TASK should be recorded.
- [ ] After the user clicks "Add," the current TASK will be stored into DB or Local Storage.
- [ ] Contents might not lose even user close the browser.

#### Edit a stored TASK
- [ ] The user can change the content of the TASK selected by the user.
- [ ] The user will directly edit the TASK in the TASK bar.
- [ ] The user can store the content after edited, and it still checks if the input is valid.

#### Delete a stored TASK
- [ ] The user can delete a selected TASK from the List.
- [ ] When the user clicks deletes, it should double check with the user.

#### MARK a TASK as finished
- [ ] The user can select the status of the TASK to either FINISHED/UNFINISHED.
- [ ] The user can toggle between these two staus.
- [ ] When the TASK is marked as "FINISHED," there should have a line display on the TASK.

***

### Advance Functionality

**As a user** I can:

#### Edit the Deadline, Tag Color, and Detail of a TASK
- [ ] After the user clicks the TASK, there should pop up a window for editing the TASK.
- [ ] The user can browse the details by clicking the TASK.
- [ ] The user can see the different display for the TASK. 

#### Sort the TASK by its Created time, Color and Deadline
- [ ] The user can decide whether the TASK is going to be sorted by Deadline, Color or the Default Order. (Created time)
- [ ] There should have an option for the user to select.

#### Get the record of all behaviors
- [ ] It should record when the user `create a TASK`,  `edit a TASK`,  `delete a TASK`.

#### Click and Drop the TASK to change its order
- [ ] The user can change the default order by clicking and dropping the TASK.

#### Create another user account to record different Task
- [ ]  The user should log in to display his TASK list.
- [ ]  The user can switch between different accounts.