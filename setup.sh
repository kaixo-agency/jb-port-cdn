#!/bin/bash

echo "🚀 Setting up your local development environment..."

# Ensure we're in the right directory
cd "$(dirname "$0")"

# Kill any existing process using port 5500
PID=$(lsof -ti :5500)
if [ ! -z "$PID" ]; then
    echo "🛑 Stopping existing process on port 5500..."
    kill -9 $PID
fi

# Pull the latest changes from GitHub
echo "📥 Pulling latest changes from GitHub..."
git pull origin main

# Install dependencies if needed
echo "📦 Checking dependencies..."
npm install

# Start live-server on 5500
echo "🌍 Starting live-server on http://127.0.0.1:5500..."
npx live-server --port=5500 --host=127.0.0.1 &

# Start WebSocket reload server
echo "🔄 Starting WebSocket reload server..."
node src/reload-server.js &

# Open Webflow staging
WEBFLOW_URL="https://juanbenedit-cf.webflow.io"
echo "🌐 Opening Webflow staging..."
open "$WEBFLOW_URL" || xdg-open "$WEBFLOW_URL"

# Display Webflow paths
echo "✅ All set! Use the following Webflow paths:"
echo "   Development: http://127.0.0.1:5500/assets/styles.css"
echo "   Production: https://port-cdn.yourdomain.workers.dev/assets/styles.css"

echo "🔥 Happy coding!"
