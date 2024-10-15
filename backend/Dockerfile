FROM node:22-alpine

WORKDIR /backend

# Setup dependencies (cached efficiently)
COPY package*.json .
RUN npm install --only=production

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY . .

# Set ownership and switch to non-root user
RUN chown -R appuser:appgroup /backend
USER appuser

EXPOSE 4000
HEALTHCHECK CMD curl --fail http://localhost:4000/api/health || exit 1

CMD ["node", "server.js"]
