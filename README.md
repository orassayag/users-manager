Important note:
===============
This project was built by 5-6 hours work, since I need to jungle between 3 home works and keep interviewed, so not all of the requirement were implemented, but I implemented other components that I think it's important to have in any project that I build.

User Manager Project
====================

Instructions (How to make the magic happen):
============================================
-It's recommended that you will have the latest node version and next.js package installed globally on your pc.
-Open the client and the server in your IDE.
-On the server project, on the terminal, load the packages by: 'npm i'.
-On the client project, on the terminal, load the packages by: 'npm i'.
-On the server project, on the terminal, run the project by: 'npm run dev'.
-On the client project, on the terminal, run the project by: 'npm run dev'.
-Let the show begin!

Advantages of this project:
===========================
-Single page application with single page with all functionality (But I could do this with routing If I must).
-Client was built by Next.js with the latest version (No SSR needed for this project, but it's good to be updated).
-Client - Used custom hooks.
-Usage of both Mui Styled and SCSS Modules.
-Most of the fields are editable.
-Client is Responsive.
-No needed for Redux in this way of implementation, but If must with routing navigation - I would use Redux toolkit (store, slices, reducers, all the magic of this :)) - I have a project that I implemented rudux - https://github.com/orassayag/world-covid-19-data-nextjs
-Added out of this scope of this task:
-Pager.
-Sort by any column of the users table.
-Random user will be generated from the server automatically by button click ("ADD RANDOM USER").
-Well documented server and client (Seperated to folders, document for most of the functions).
-Well documented API - See swagger by going to http://localhost:8081/api-docs/
-Joi validation on server.
-Yup validation on client.
-Using Material UI (More advanced than Bootstrap).
-Logging by Winston for each request.
-Error handling.
-Infrastructure for private and public routes (If authentication is needed).
-Use as few as possible 3 party packages.

What would I do If I had more time?
===================================
-Server:
-Write the project in TypeScript, since it was much faster for me to write in pure JavaScript.
-Use Redis or log files persistence to keep the users data. I simulated schema and where needed to keep the data.
-Integration tests by Chai / Mocha / Supertest.
-If needed the CRUD for the users to be updated from the server after for each request - Can be done also.
-Fix ESLint bugs.

-Client:
-Missing filter by country.
-Missing validation of errors on the client in case of error from the server on the CRUD operations.
-Fix a few minor bugs.
-Seperate more the useUsersHandlers.hook.
-More documents inside each function.
-Client Tests for each component.
-Use CDN to load the images, it's not efficient right now.
-Of course, deploy the project on Vercel / AWS.
-Fix ESLint bugs.