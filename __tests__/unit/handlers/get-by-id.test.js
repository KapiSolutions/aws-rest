// Import dynamodb from aws-sdk
const dynamodb = require('aws-sdk/clients/dynamodb');

// Import all functions from get-by-id.js
const lambda = require('../../../src/handlers/get-by-id.js');

//All tests for getByIdHandler
describe('Test getByIdHandler', () => {
    let getSpy;

    beforeAll(() => {
        // Mock DynamoDB get method
        getSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'get');
    });

    // Clean up mocks
    afterAll(() => {
        getSpy.mockRestore();
    });

    // This test invokes getByIdHandler and compares the result
    it('should get item by id', async () => {
        const item = { id: 'id1' };

        // Return the specified value whenever the spied get function is called
        getSpy.mockReturnValue({
            promise: () => Promise.resolve({ Item: item }),
        });

        const event = {
            httpMethod: 'GET',
            pathParameters: {
                user_id: 'id1',
            },
        };

        // Invoke getByIdHandler
        const result = await lambda.getByIdHandler(event);

        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify(item),
        };

        // Compare the result with the expected result
        expect(result).toEqual(result);
    });
});
