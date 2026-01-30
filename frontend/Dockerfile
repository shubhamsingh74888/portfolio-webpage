FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Vite default port
EXPOSE 5173

# IMPORTANT: The "--host" flag is required to access Vite from outside the container
CMD ["npm", "run", "dev", "--", "--host"]
