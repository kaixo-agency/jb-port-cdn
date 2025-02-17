#!/bin/bash

echo "🚀 Setting up your local development environment..."

# Ensure we're in the right directory
cd "$(dirname "$0")"

# Pull the latest changes from GitHub
echo "📥 Pulling latest changes from GitHub..."
git pull origin main

# Install dependencies if needed
echo "📦 Checking dependencies..."
npm install

# Start live-server for local development
echo "🌍 Starting live-server..."
npx live-server assets --port=5500 &

# Start WebSocket reload server
echo "🔄 Starting WebSocket reload server..."
node src/reload-server.js &

# Open Webflow staging in the default browser
WEBFLOW_URL="https://juanbenedit-cf.webflow.io/"
echo "🌐 Opening Webflow staging..."
open "$WEBFLOW_URL" || xdg-open "$WEBFLOW_URL"

# Display Webflow path instructions
echo "✅ All set! Use the following Webflow paths:"
echo "   Development: http://localhost:5500/assets/styles.css"
echo "   Production: https://port-cdn.yourdomain.workers.dev/assets/styles.css"

echo "🔥 Happy coding!"
