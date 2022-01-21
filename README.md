# AWS rest test app
Assumptions:
  - REST API in AWS API Gateway.
  - 2 HTTP methods in the API: GET & POST.
  - DynamoDB Table "users" with a parition key (hash key) "user_id".
  - Lambda function integrated with the API POST method. User is able to specify his first name and age in the JSON body of HTTP POST request. Lambda provides body and insert it into DynamoDB table as a new item. Value for user_id column is generated as a random GUID and returned to the caller in the response.
  - Lambda function integrated with the API GET method. GET method takes a user_id as path parameter. Lambda lookup the DynamoDB table using query method and either return user or 404 status code if it doesn't exist.

The project includes the following files and folders:

- src - Code for the application's Lambda function.
- events - Invocation events.
- \_\_tests__ - Unit tests for the application code.
- template.yml - A SAM template that defines the application's AWS resources.
- buildspec.yml -  A build specification file that tells AWS CodeBuild how to create a deployment package for the function.

Lambda application includes two AWS CloudFormation stacks. The first stack creates the pipeline that builds and deploys the application.

The pipeline creates a second stack that contains the application's resources, including Lambda functions, an API Gateway API, and Amazon DynamoDB tables. These resources are defined in the `template.yml` file in this project.

## Try the application out

The sample application creates a RESTful API that takes HTTP requests and invokes Lambda functions. The API has POST and GET methods on the root path to create and list items. It has a GET method that takes an ID path parameter to retrieve items. Each method maps to one of the application's two Lambda functions.

**To use this test API**

1. To try this app first choose a tool which provides http requests eg. curl
1. Open cmd or powershell
1. At the command line, use cURL to send POST requests to the application endpoint. (Body eg.: {\"name\": \"bill\",\"age\": \"16\"} ).

        $ curl.exe -X POST -H "Accept: application/json" -H  "Content-Type: application/json" https://i654ctcpw4.execute-api.us-east-1.amazonaws.com/Prod/ -d '{\"name\": \"bill\",\"age\": \"16\"}'
        $ user_id: 4ef9410e-04e8-441b-b948-3bdbb0b0b9e9
        

1. Send a GET request with the item {user_id} to get a specyfic user info.

        $ curl https://i654ctcpw4.execute-api.us-east-1.amazonaws.com/Prod/{USER_ID}
        $ {"user_id":"b4d2e33e-4692-4a13-b6a7-e45a51a4f9d8","name":"bill","age":"16"}



