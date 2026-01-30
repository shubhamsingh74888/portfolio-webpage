FROM node:18-alpine

WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Your backend runs on 5000
EXPOSE 5000

# Using node directly is better for production/containers
CMD ["node", "server.js"]
