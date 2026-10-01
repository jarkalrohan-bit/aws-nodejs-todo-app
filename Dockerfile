# Use Node.js 18 with Alpine Linux
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy dependency files first for better layer caching
COPY package*.json ./

# Install dependencies exactly from package-lock.json
RUN npm ci --omit=dev

# Copy application source code
COPY . .

# Application port
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
