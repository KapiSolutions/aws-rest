// Create clients and set shared const values outside of the handler

// Create a DocumentClient that represents the query to get an item
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

// Get the DynamoDB table name from environment variables
const tableName = process.env.USERS_TABLE;
var response = {};

//HTTP get method to get one item by user_id from a DynamoDB table.
exports.getByIdHandler = async (event) => {
    const { httpMethod, path, pathParameters } = event;
    if (httpMethod !== 'GET') {
        throw new Error(`getMethod only accept GET method, you tried: ${httpMethod}`);
    }

    console.log('received:', JSON.stringify(event));

    // Get id from pathParameters from APIGateway because of `/{user_id}` at template.yml
    const { user_id } = pathParameters;

    try {
        var params = {
            TableName: tableName,
            KeyConditionExpression: 'user_id = :v1',
            ExpressionAttributeValues: {
                ':v1': user_id
            }          
        };

        var result = await docClient.query(params).promise()
        console.log(JSON.stringify(result))

        if(result.Count == 0){
            response = {
                statusCode: 404,
                body: "User doesnt exist." ,
            }; 
        }else{
            response = {
                statusCode: 404,
                body: JSON.stringify(result.Items) ,
            };
        }

        
    } catch (error) {
        console.error(error);
        response = {
            statusCode: 404,
            body: error,
        }; 
    }

    console.log(`response from: ${path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};
