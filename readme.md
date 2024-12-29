# Jobly Backend

This is the Express backend for Jobly, version 2.

To run this:

    node server.js
    
To run the tests:

    jest -i


To use the login method you will need to create your own .env file. Format it like this:
- DB_USERNAME=
- DB_PASSWORD=
- PORT=
- DATABASE_URL=
- SECRET_KEY=

_______________________________________________________________________________________
- Unit 39.1 Express Jobly
- Part 1:
    - This is backend code for a company that contains an API with many different users.

- Part 2:
    - Adding filtering to companies:
        - added name, minEmployees, maxEmployees

- Part 3:
    - Added authorization:
        - Retrieving a list of companies are open to all users
        - CRUD operations are only possibly with users who have is_admin access
        - Creating Users are only possible by admins
        - Getting list of users are admin only
        - Getting a list of specific user and handling their account are admin only access

- Part 4:
    - Adding Job Model, Routes, and Tests
        - added filtering for title, minSalary, hasEquity
        - Show Jobs for a Company
            - GET /companies/:handle

- Part 5: 
    - Job Applications:
        - POST /users/:username/jobs/:id - Allows users to apply to a job

____________________________________________________________________________
- This is a backend project that requires a program such as Insomnia or ThunderClient in order to submit GET and POST request.