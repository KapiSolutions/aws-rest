// Import dynamodb from aws-sdk
const dynamodb = require('aws-sdk/clients/dynamodb');

// Import all functions from put-item.js
const lambda = require('../../../src/handlers/put-item.js');
const { v4: uuidv4 } = require('uuid');

// This includes all tests for putItemHandler
describe('Test putItemHandler', () => {
    let putSpy;

    // One-time setup and teardown, see more in https://jestjs.io/docs/en/setup-teardown
    beforeAll(() => {
        // Mock DynamoDB put method
        // https://jestjs.io/docs/en/jest-object.html#jestspyonobject-methodname
        putSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'put');
    });

    // Clean up mocks
    afterAll(() => {
        putSpy.mockRestore();
    });

    // This test invokes putItemHandler and compares the result
    it('should add id to the table', async () => {
        // Return the specified value whenever the spied put function is called
        putSpy.mockReturnValue({
            promise: () => Promise.resolve('data'),
        });

        var user_id = uuidv4();
        const event = {
            httpMethod: 'POST',
            body: "user_id: " + user_id,
        };

        // Invoke putItemHandler()
        const result = await lambda.putItemHandler(event);
        const expectedResult = {
            statusCode: 200,
            body: event.body,
        };

        // Compare the result with the expected result
        expect(result).toEqual(expectedResult);
    });
});
