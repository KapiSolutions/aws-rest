// Create clients and set shared const values outside of the handler

// Create a DocumentClient that represents the query to add an item
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

// Get the DynamoDB table name from environment variables
const tableName = process.env.USERS_TABLE;

// Include uuid lib to generate random user_id uuid
const { v4: uuidv4 } = require('uuid');

// HTTP post method to add one item to a DynamoDB table.
exports.putItemHandler = async (event) => {
    const { body, httpMethod, path } = event;
    if (httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${httpMethod} method.`);
    }

    console.log('received:', JSON.stringify(event));

    // Get name and age from the body of the request
    const { name, age } = JSON.parse(body);
    // Generate uuid for the new user_id
    var user_id = uuidv4();

    // Create a new user 
    const params = {
        TableName: tableName,
        Item: { user_id, name, age },
    };
    
    await docClient.put(params).promise();

    //Construct the response
    const response = {
        statusCode: 200,
        body,
        //body: "user_id: " + user_id,
    };

    console.log(`response from: ${path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};
