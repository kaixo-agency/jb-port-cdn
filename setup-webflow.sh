#!/bin/bash

# Webflow CLI Setup Script
# This script automates the entire Webflow development environment setup

set -e  # Exit on any error

echo "🚀 Starting Webflow CLI Setup..."
echo "=================================="

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if Node.js is installed
if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js first:"
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check if npm is installed
if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm found: $(npm --version)"

# Install Webflow CLI globally
echo "📦 Installing Webflow CLI globally..."
npm install -g @webflow/webflow-cli

# Verify installation
if ! command_exists webflow; then
    echo "❌ Webflow CLI installation failed"
    exit 1
fi

echo "✅ Webflow CLI installed: $(webflow --version)"

# Get project name from user or use default
read -p "Enter your project name (default: my-webflow-project): " PROJECT_NAME
PROJECT_NAME=${PROJECT_NAME:-my-webflow-project}

# Create project directory
echo "📁 Creating project directory: $PROJECT_NAME"
mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"

echo "📍 Current directory: $(pwd)"

# Initialize Webflow project
echo "🔧 Initializing Webflow project..."
echo "   You'll need to authenticate with Webflow in your browser..."

# Run webflow init
webflow init

# Check if config file was created
if [ -f "webflow.config.json" ]; then
    echo "✅ webflow.config.json created successfully!"
    echo "📄 Config file contents:"
    cat webflow.config.json
else
    echo "⚠️  webflow.config.json not found. Let's troubleshoot..."
    echo "📂 Files in current directory:"
    ls -la
    
    echo ""
    echo "🔍 Checking authentication status..."
    webflow auth status
    
    echo ""
    echo "💡 If authentication failed, run: webflow auth login"
    echo "💡 Then run: webflow init"
fi

echo ""
echo "🎉 Setup complete!"
echo "=================================="
echo "📁 Project location: $(pwd)"
echo "🔧 Next steps:"
echo "   1. Make sure you're authenticated: webflow auth status"
echo "   2. If not authenticated: webflow auth login"
echo "   3. Start developing: webflow develop"
echo "   4. Build for production: webflow build"

# Show available commands
echo ""
echo "📚 Available Webflow commands:"
webflow --help