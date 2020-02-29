# Bozza

## What is Bozza?
Bozza is a web application for taking **convertible notes**.

## What are convertible notes?
A *note* is just a piece of text. But, if you add to it an extra bit of information, it can become something bigger. A note with a due date, for example, can be handled as a *task* in a todo list. And a note with a recipient can be sent as a *message* in a communication platform. Bozza is all of that: a note-taking app, a todo list, a communication platform. Notes can have so many shapes in Bozza!

## Bozza’s architecture
The Bozza application is split in two parts:
* A **[RESTful API](https://github.com/aisva/bozza/tree/master/backend)**, entirely built with serverless technologies (AWS Lambda, AWS API Gateway, AWS DynamoDB and AWS S3) and developed with the [Serverless Framework](https://serverless.com).
* A **[frontend application](https://github.com/aisva/bozza/tree/master/frontend)**, that provides a GUI to access the RESTful API and has been built with [React](https://reactjs.org/), [React Hooks](https://reactjs.org/docs/hooks-intro.html) and [Redux](https://redux.js.org/).

## Accessing Bozza’s RESTful API
Bozza’s RESTful API is hosted by [AWS](https://aws.amazon.com/). The *complete list of API methods* can be found in the following Postman collection: [Bozza.postman_collection.json](https://github.com/aisva/bozza/blob/master/backend/Bozza.postman_collection.json).

Alternatively, you can access the API via Bozza’s *frontend application* (see below). 

## Running Bozza’s frontend application
You can run Bozza’s frontend application by executing the following commands:

```
cd frontend
npm start
```

The application will be accessible on: `http://localhost:3000`.

## First steps with Bozza

1. Once Bozza’s frontend application is running, the login screen will show up. Press the *Sign up* button on the left. Then enter your *credentials* and press the *Sign up* button on the right. You will be redirected to Bozza’s desk.

   ![bozza_1](https://github.com/aisva/bozza/raw/master/readme-images/bozza_1.png)

2. Press the *Plus* button to add your first note.

   ![bozza_2](https://github.com/aisva/bozza/raw/master/readme-images/bozza_2.png)

3. A *dialog* will show up. Enter the text of your note.

   ![bozza_3](https://github.com/aisva/bozza/raw/master/readme-images/bozza_3.png)

4. Eventually, you can also add a *due date* to your note. This way, your note will be converted into a pending note or task. (*Note:* Messages will be available in the next version of the application.)

   ![bozza_4](https://github.com/aisva/bozza/raw/master/readme-images/bozza_4.png)

5. Click on a note on the list to open it. You can *edit* it, *remove* it or *share* it as a textual file via Bozza’s file server.

   ![bozza_5](https://github.com/aisva/bozza/raw/master/readme-images/bozza_5.png)

6. As your list of notes grows, you can filter it by entering some text in the *Search* field or see only your pending notes (tasks) by selecting the corresponding option in the *menu*.

   ![bozza_6](https://github.com/aisva/bozza/raw/master/readme-images/bozza_6.png)

## Bozza’s responsive design
Bozza’s frontend application has been designed to *run on every existing device* (phone, tablet or desktop), regardless of its screen density, screen size or aspect ratio.

![bozza_responsive](https://github.com/aisva/bozza/raw/master/readme-images/bozza_responsive.png)