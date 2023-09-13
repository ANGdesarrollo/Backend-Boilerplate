# Use the official Node.js image as a base
FROM node:18

# Create a working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN pnpm install

# Copy the rest of your application code to the container
COPY . .

# Expose the port your Fastify app is running on
EXPOSE 3000

# Start your Node.js application
CMD ["npm", "start"]
