
This is the repo for Adform front-end application for technical assessment.

  

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

  

## Running the unit test case

  

Run with below command, test cases will be executed using jest and enzymes.

  

```

yarn test

```

  ## View the code coverage using below commands.

```

yarn coverage

```

  

## To generate minified files(deployables) for production.

  

Files need to deploy on to the web served will be generated and saved in ``app/dist`` folder.

  

To create the web content for production

  

```

yarn build

```

  

Your production ready contents will be now availbale in ```app/dist``` folder

  
  

## To add data

  

#### Open browser console and call ``AddCampaigns() ``method to add you data.

  

### Sample data:

``[
{"id":1,"name":"Photojam","startDate":"7/25/2018","endDate":"7/27/2019", "Budget":858131},
{"id":2,"name":"Realbridge","startDate":"03/05/2019","endDate":"12/12/2019 ","Budget":505602}
]``