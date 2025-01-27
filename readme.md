/**
 * Before running the project, ensure to edit the proxy settings in the Vite configuration file.
 * 
 * Steps:
 * 1. Run the Laravel backend from the `crmform` directory.
 * 2. Run the React app from the `crmUi` directory.
 */
3. Create a new database for the Laravel application.
4. Run the following commands to set up Passport:
    ```sh
    php artisan migrate
    php artisan passport:install
    ```
5. Create a Passport client to generate tokens:
        ```sh
        php artisan passport:client --personal
        ```
6. Navigate to the `crmUi` directory and install the dependencies:
            ```sh
            cd crmUi
            npm install
            ```
```sh
npm start
```

7. Start the React application:

In case of any help, contact saravjeetsingh.malik@gmail.com    
            