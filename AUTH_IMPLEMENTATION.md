# Authentication Implementation

## Overview
Fully functional login and register system with JWT tokens and localStorage integration.

## Features
✅ User Registration with validation
✅ User Login with JWT tokens
✅ Token storage in localStorage
✅ Protected routes (Profile page)
✅ User profile display
✅ Logout functionality
✅ Password visibility toggle
✅ Responsive design with Tailwind CSS
✅ Error handling
✅ Loading states

## Files Created/Modified

### New Pages
1. **[app/login/page.tsx](app/login/page.tsx)** - Login page with email and password
2. **[app/register/page.tsx](app/register/page.tsx)** - Registration page with validation
3. **[app/profile/page.tsx](app/profile/page.tsx)** - Protected profile page (requires authentication)

### New Utilities
1. **[app/utils/api.ts](app/utils/api.ts)** - API utilities with automatic token injection
2. **[app/hooks/useAuth.ts](app/hooks/useAuth.ts)** - Custom hook for auth state management

### Modified Files
1. **[app/components/Header.tsx](app/components/Header.tsx)** - Updated with user dropdown menu and logout

### Configuration
1. **[.env.local](.env.local)** - Environment variables
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

## How It Works

### Registration Flow
1. User fills name, email, password in `/register`
2. Frontend sends POST to `{API_URL}/users/register`
3. Backend validates and creates user with hashed password
4. Backend returns token and user data
5. Frontend stores token and user in localStorage
6. User is redirected to home page

### Login Flow
1. User fills email and password in `/login`
2. Frontend sends POST to `{API_URL}/users/login`
3. Backend validates credentials with bcrypt
4. Backend returns JWT token and user data
5. Frontend stores token and user in localStorage
6. User is redirected to home page

### Protected Routes
- `/profile` - Shows user data fetched from `/api/users/me`
- Token is automatically included in all API requests via `fetchWithAuth()`
- If token is invalid/expired, user is redirected to login

### Token Usage
- Token is stored in localStorage under `token` key
- Token is sent in Authorization header: `Bearer {token}`
- Token expires in 30 days (backend setting)

## Backend Endpoints Used

### POST `/api/users/register`
**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token_here"
}
```

### POST `/api/users/login`
**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token_here",
  "message": "Giriş Uğurludur!"
}
```

### GET `/api/users/me`
**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "message": "İstifadəçi məlumatları uğurla alındı"
}
```

## Components

### useAuth Hook
```typescript
const { user, token, loading, logout, isAuthenticated } = useAuth();
```

### API Utilities
```typescript
import { fetchWithAuth, apiCall } from '@/app/utils/api';

// Fetch with automatic token injection
const response = await fetchWithAuth(url);

// Or use apiCall shorthand
const response = await apiCall('/users/me');
```

## Security Notes
- Passwords are hashed with bcrypt on backend
- Tokens expire after 30 days
- Tokens are stored in localStorage (not httpOnly)
- Add refresh token mechanism for production
- Use HTTPS in production
- Consider storing tokens in memory + httpOnly cookies for better security

## Testing

### Test Registration
1. Go to `/register`
2. Fill in name, email, password
3. Click register
4. Should redirect to home and show user in header

### Test Login
1. Clear localStorage if needed
2. Go to `/login`
3. Enter registered email and password
4. Click login
5. Should redirect to home and show user in header

### Test Protected Route
1. Login first
2. Click on profile in header dropdown
3. Should show user data from `/api/users/me`
4. Click logout to clear session

## Customization

### Change API URL
Edit `.env.local`:
```
NEXT_PUBLIC_API_URL=http://your-api-domain.com/api
```

### Change Token Expiry
Edit backend `userController.js`:
```javascript
return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '90d', // Change this
});
```

### Add More User Fields
Update backend User model and controller, then update frontend `User` interface in `useAuth.ts`

## Troubleshooting

**"Can't import react-icons"**
- Run: `npm install react-icons` in front directory

**"API 404"**
- Make sure backend is running on correct port
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify backend routes are registered in `app.js`

**"Token not working"**
- Check browser localStorage
- Verify token format in network tab
- Check backend JWT_SECRET matches

**"CORS errors"**
- Ensure backend has CORS enabled
- Check `app.js` has `cors()` middleware
