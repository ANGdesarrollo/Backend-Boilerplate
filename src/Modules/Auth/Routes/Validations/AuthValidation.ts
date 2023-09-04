export const signUpSchema = {
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            username: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 8 }
        }
    }
};
