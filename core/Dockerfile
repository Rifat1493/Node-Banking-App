# Use Node.js LTS (Long Term Support) as base image
FROM node:20-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Prisma schema and generate Prisma client
COPY src ./src/

# Generate Prisma client with explicit schema path
RUN npx prisma generate --schema=./src/prisma/schema.prisma

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]