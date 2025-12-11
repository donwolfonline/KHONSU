#!/bin/bash

# Base URL
BASE_URL="http://localhost:3000"

# 1. Register
echo "Registering..."
REGISTER_RES=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"email":"apitest@example.com","password":"password123","username":"apitestuser","name":"API Test User"}')
echo "Register Response: $REGISTER_RES"

# 2. Login
echo "Logging in..."
LOGIN_RES=$(curl -s -i -X POST "$BASE_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"apitest@example.com","password":"password123"}')

# Extract token from cookie
TOKEN=$(echo "$LOGIN_RES" | grep -o 'token=[^;]*' | cut -d= -f2)
echo "Token: $TOKEN"

if [ -z "$TOKEN" ]; then
  echo "Failed to get token"
  exit 1
fi

# 3. Get Profile (Initial)
echo "Getting Profile (Initial)..."
GET_RES=$(curl -s -X GET "$BASE_URL/api/profile" \
  -H "Cookie: token=$TOKEN")
echo "Get Profile Response: $GET_RES"

# 4. Update Username
echo "Updating Username..."
UPDATE_RES=$(curl -s -X PUT "$BASE_URL/api/profile" \
  -H "Content-Type: application/json" \
  -H "Cookie: token=$TOKEN" \
  -d '{"username":"apitestuser_updated"}')
echo "Update Response: $UPDATE_RES"

# 5. Get Profile (After Update)
echo "Getting Profile (After Update)..."
GET_RES_FINAL=$(curl -s -X GET "$BASE_URL/api/profile" \
  -H "Cookie: token=$TOKEN")
echo "Get Profile Final Response: $GET_RES_FINAL"
