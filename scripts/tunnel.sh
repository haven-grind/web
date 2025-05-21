#!/bin/bash

# Exit on error
set -e

# Check if ngrok auth token is set
if [ -z "$NGROK_AUTH_TOKEN" ]; then
  echo "⚠️  NGROK_AUTH_TOKEN is not set."
  echo "Please run: ngrok config add-authtoken YOUR_TOKEN"
  echo "If you don't have a token, sign up at https://ngrok.com and get one for free."
  echo ""
  echo "Continuing without authentication (limited to 1 session and other restrictions)..."
fi

# Start Laravel server in the background
echo "🚀 Starting Laravel development server..."
php artisan serve --host=0.0.0.0 &
SERVER_PID=$!

# Give the server a moment to start
sleep 2

echo "🌐 Starting ngrok tunnel..."
ngrok http 8000

# Cleanup when script is terminated
function cleanup {
  echo "🛑 Stopping Laravel server..."
  kill $SERVER_PID
  echo "✅ Done!"
}

# Register the cleanup function to be called on exit
trap cleanup EXIT

# Keep the script running
wait $SERVER_PID 