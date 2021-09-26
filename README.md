# Picture API

I wanted to build a website(or any other client with User Interface) and web service that will have 
- Users `login`/`register`
- Uploading and showing images. 
- Require `Username(email)` and `Password` parameters for the login 
- Detail for images: `Title` and `Description`. 
- The website should show all the images that users `uploaded` and `sort by date of upload` Ascending(`asc`) and Descending(`desc`). And that’s it. 
- The website should display them somehow allowing us to `change the sorting`. 
- Also the important part is that Api should not allow posting images to `api` without `authentication`. 


## Project setup

1. Install `nodejs` if you don't have it installed ( check it in the `terminal`, type `$ node -v` or `$ npm -v`)
2. Clone the project from the terminal (type `$ git clone https://github.com/VianneyR4/Picture_api.git`) or you can download a ZIP file
3. Then open the main directory of the project then type in the `terminal` the below cmd

```
npm install
```

## Database setup

1. Go in phpmyadmin (make sure that your server is on. you can use 'MAMP', 'XAMPP', ...)
2. Create a Database with any name
3. Import the file `ujatcare_test_db.sql` ( path: `./db/ujatcare_test_db.sql`) in the Databese you created
4. Open the file `config.js` ( path: `./config/config.json`) and put informations of the Databese you created

    ```
    "username": "root", # // your db username by default is 'root' ...
    "password": "root", # // your db password by default is ' '(empty) and for MAMP is 'root' ...
    "database": "ujatcare_test_db", # // name of the db you created ...
    "host": "127.0.0.1", # // leave it like this if you're in local ...
    "dialect": "mysql", # // leave this too, is the type of db used ...
    "port": "8889" # // put the port of you db server (this is by default for MAMP) ...
    ```

    Note: for more precision give the same config for `developement`, `test`, and `production`.

## Compiles and hot-reloads for development server

1. Go back again in the `terminal` and type the below cmd to run the `API Server`

```
npm start
```
2. Then open an `API tester application` (for exemple `Postman`) and test.
    
    Note: the base url for testing `Endpoints` is `http://localhost:3000/api/v1/` for exemple to test the Login `Endpoint` is `http://localhost:3000/api/v1/login`
3. At the end, you can Open your browser and type the url `http://localhost:3000/api-docs/` for the `API Documentation`

Note: The `authantification` User `Token` validity is for `1h`, it mean after 1h you have to connect sourself again beceause you cannot pass any request if the Token is no more valid (it's like you're note connected)...  (just for `security`).

## Contact the Developer

Contact the `Developer` for more details or if there is any issues...

- E-mail adress: `vianneyrwicha2017@gmail.com`
- Skype: `Vianney Rwicha` or `vianneyrwicha2017@gmail.com`
