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

export const forgotPasswordSchema = {
    body: {
        type: 'object',
        required: ['username'],
        properties: {
            username: { type: 'string', format: 'email' }
        }
    }
};

export const resetPasswordSchema = {
    body: {
        type: 'object',
        required: ['password', 'jwt'],
        properties: {
            password: { type: 'string', minLength: 8 },
            jwt: { type: 'string' }
        }
    }
};
