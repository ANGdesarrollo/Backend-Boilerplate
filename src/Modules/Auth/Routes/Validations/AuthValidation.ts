export const signUpSchema = {
    body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
            username: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 8 }
        }
    }
};
