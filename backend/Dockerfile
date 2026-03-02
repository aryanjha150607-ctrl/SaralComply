# Use official Node.js Alpine image for a smaller footprint
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files and prisma schema
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies (including devDependencies for tsc)
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Copy all source files
COPY . .

# Build the TypeScript code
RUN npm run build

# Only keep the production dependencies
RUN npm prune --production

# Expose the application port
EXPOSE 3001

# Command to run the application
CMD [ "npm", "start" ]
