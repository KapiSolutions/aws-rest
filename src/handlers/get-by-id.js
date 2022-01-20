// Create clients and set shared const values outside of the handler

// Create a DocumentClient that represents the query to get an item
const dynamodb = require('aws-sdk/clients/dynamodb');

const docClient = new dynamodb.DocumentClient();

// Get the DynamoDB table name from environment variables
const tableName = process.env.USERS_TABLE;
var response = {};
/**
 * A simple example includes a HTTP get method to get one item by user_id from a DynamoDB table.
 */
exports.getByIdHandler = async (event) => {
    const { httpMethod, path, pathParameters } = event;
    if (httpMethod !== 'GET') {
        throw new Error(`getMethod only accept GET method, you tried: ${httpMethod}`);
    }
    // All log statements are written to CloudWatch by default. For more information, see
    // https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-logging.html
    console.log('received:', JSON.stringify(event));

    // Get id from pathParameters from APIGateway because of `/{user_id}` at template.yml
    const { user_id } = pathParameters;

    // Get the item from the table
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property
   
    // const params = {
    //     TableName: tableName,
    //     Key: { user_id },
    // };
    // const { Item } = await docClient.get(params).promise();

    //      response = {
    //         statusCode: 200,
    //         body: JSON.stringify(Item),
    //     };

//////////////////////////////////////
    var params = {
        TableName : tableName,
        KeyConditionExpression: "#yr = :yyyy",
        ExpressionAttributeNames:{
            "#yr": "user_id"
        },
        ExpressionAttributeValues: {
            ":yyyy": user_id
        }
    };
    

    // var params = {
    //     TableName : tableName,
    //     KeyConditionExpression: "user_id = :id", 
    //     ExpressionAttributeValues: {
    //      ":id": {
    //        S: user_id
    //       }
    //     }
    //    };

    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            response = {
                statusCode: 404,
                body: JSON.stringify(data),
            };
        } else {
            console.log("Query succeeded.");
            // data.Items.forEach(function(item) {
            //     console.log(" -", item.year + ": " + item.title);
            // });
            response = {
                statusCode: 200,
                body: JSON.stringify(data),
            };
        }
    });


    

    console.log(`response from: ${path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
};
