This is the repo for Adform front-end application.

Enter the following commands to start to get started working quickly.

```
git clone 
cd <project>
yarn install
```
(Note: you should not need to use `sudo` at any point in these instructions.)

## Running the app on dev server.

To run the application locally, and have it open in your default browser:

```
yarn start:dev
```

## Running the mock API on dev server.

Run mock API server with below command.

```
yarn start:mock
```


## To generate minified file for production.

Files need to deploy on to the web served will be generated and saved in /dist folder.

To create the web content for production

```
yarn build:only
```

Your production ready contents will be now availbale in ```app/dist``` folder
