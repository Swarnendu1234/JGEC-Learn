# ✅ Authentication Testing Checklist

## Prerequisites
- [ ] Backend server running on http://localhost:3000/
- [ ] Frontend server running on http://localhost:5173/
- [ ] MongoDB connection working

---

## Test 1: Root URL Redirect
**Expected**: Root URL should redirect to login page

- [ ] Open browser to http://localhost:5173/
- [ ] Should automatically redirect to http://localhost:5173/login
- [ ] Login page should be visible

✅ **PASS** if you see the login page
❌ **FAIL** if you see anything else

---

## Test 2: Protected Route Without Login
**Expected**: Accessing protected routes should redirect to login

- [ ] Open browser to http://localhost:5173/your-courses (without logging in)
- [ ] Should automatically redirect to http://localhost:5173/login
- [ ] After redirect, you should see the login page

✅ **PASS** if redirected to login
❌ **FAIL** if you can see the courses page

---

## Test 3: Backend Serves No HTML
**Expected**: Backend should only serve APIs, not HTML pages

- [ ] Open browser to http://localhost:3000/
- [ ] Should see JSON error: `{"error": "Endpoint not found", "path": "/"}`
- [ ] Should NOT see any HTML auth page

✅ **PASS** if you see JSON error
❌ **FAIL** if you see HTML page

---

## Test 4: Signup Flow
**Expected**: User can create account and verify email

- [ ] Go to http://localhost:5173/signup
- [ ] Fill in all fields:
  - Name: Test User
  - Email: your-email@example.com
  - Username: testuser
  - Password: Test123!
  - Confirm Password: Test123!
- [ ] Click "Create Account"
- [ ] Should redirect to OTP verification page
- [ ] Check your email for 6-digit OTP
- [ ] Enter OTP in the 6 input boxes
- [ ] Click "Verify OTP"
- [ ] Should redirect to http://localhost:5173/your-courses
- [ ] Should see the courses page with your courses

✅ **PASS** if you reach the courses page
❌ **FAIL** if stuck on signup/OTP page

---

## Test 5: Login Flow
**Expected**: Existing user can login

- [ ] Logout (click profile avatar → Logout)
- [ ] Should redirect to http://localhost:5173/login
- [ ] Enter email/username: testuser (or your email)
- [ ] Enter password: Test123!
- [ ] Click "Sign In"
- [ ] Should redirect to http://localhost:5173/your-courses
- [ ] Should see the courses page

✅ **PASS** if you reach the courses page
❌ **FAIL** if login fails

---

## Test 6: Protected Route After Login
**Expected**: Logged-in users can access protected routes

- [ ] While logged in, navigate to http://localhost:5173/your-courses
- [ ] Should see the courses page (NOT redirected to login)
- [ ] Should see "Your Courses" as the page title
- [ ] Should see your user name in the header (top right)

✅ **PASS** if you can access the page
❌ **FAIL** if redirected to login

---

## Test 7: Logout Flow
**Expected**: User can logout and is redirected to login

- [ ] Click on profile avatar (top right)
- [ ] Click "Logout" button
- [ ] Should see success toast message
- [ ] Should redirect to http://localhost:5173/login
- [ ] Try accessing http://localhost:5173/your-courses
- [ ] Should redirect back to login (because you're logged out)

✅ **PASS** if redirected to login after logout
❌ **FAIL** if still logged in

---

## Test 8: Token Persistence
**Expected**: User stays logged in after page refresh

- [ ] Login to the application
- [ ] Navigate to http://localhost:5173/your-courses
- [ ] Refresh the page (F5 or Ctrl+R)
- [ ] Should still be logged in
- [ ] Should still see the courses page
- [ ] Should NOT be redirected to login

✅ **PASS** if you stay logged in
❌ **FAIL** if logged out after refresh

---

## Test 9: API Authentication
**Expected**: API calls include JWT token

- [ ] Login to the application
- [ ] Open browser DevTools (F12)
- [ ] Go to Network tab
- [ ] Refresh the page
- [ ] Find the request to `/api/courses`
- [ ] Check Request Headers
- [ ] Should see: `Authorization: Bearer <token>`

✅ **PASS** if Authorization header is present
❌ **FAIL** if no Authorization header

---

## Test 10: Invalid Token Handling
**Expected**: Invalid tokens are rejected

- [ ] Login to the application
- [ ] Open browser DevTools (F12)
- [ ] Go to Application → Local Storage → http://localhost:5173
- [ ] Find the `token` key
- [ ] Change the token value to "invalid_token"
- [ ] Refresh the page
- [ ] Should be logged out
- [ ] Should redirect to login page

✅ **PASS** if logged out and redirected
❌ **FAIL** if still logged in with invalid token

---

## Test 11: Direct URL Access After Login
**Expected**: After login, user is redirected to intended page

- [ ] Logout from the application
- [ ] Try to access http://localhost:5173/your-courses
- [ ] Should redirect to login
- [ ] Login with valid credentials
- [ ] After successful login, should redirect BACK to /your-courses
- [ ] Should NOT redirect to any other page

✅ **PASS** if redirected to /your-courses after login
❌ **FAIL** if redirected elsewhere

---

## Test 12: OTP Expiration
**Expected**: OTP expires after 10 minutes

- [ ] Start signup process
- [ ] Get OTP in email
- [ ] Wait 10+ minutes (or change system time)
- [ ] Try to verify OTP
- [ ] Should show error: "OTP has expired"
- [ ] Click "Resend Code"
- [ ] Should get new OTP
- [ ] Verify with new OTP
- [ ] Should work

✅ **PASS** if expired OTP is rejected
❌ **FAIL** if expired OTP is accepted

---

## Test 13: User Info Display
**Expected**: User info is displayed correctly

- [ ] Login to the application
- [ ] Check top-right corner
- [ ] Should see your profile avatar
- [ ] Click on avatar
- [ ] Should see dropdown with your name
- [ ] Check sidebar (left)
- [ ] Should see your name at the bottom

✅ **PASS** if user info is displayed
❌ **FAIL** if showing default/wrong user

---

## Test 14: Multiple Tabs
**Expected**: Logout in one tab logs out all tabs

- [ ] Login to the application
- [ ] Open http://localhost:5173/your-courses in Tab 1
- [ ] Open http://localhost:5173/your-courses in Tab 2
- [ ] Both tabs should show courses page
- [ ] Logout in Tab 1
- [ ] Refresh Tab 2
- [ ] Tab 2 should redirect to login

✅ **PASS** if both tabs logged out
❌ **FAIL** if Tab 2 still logged in

---

## Test 15: Backend API Only
**Expected**: Backend serves only JSON, no HTML

- [ ] Try these URLs in browser:
  - http://localhost:3000/ → Should return JSON error
  - http://localhost:3000/api/health → Should return JSON health status
  - http://localhost:3000/api/courses → Should return 401 (no token)
- [ ] None should return HTML pages
- [ ] All should return JSON responses

✅ **PASS** if all return JSON
❌ **FAIL** if any return HTML

---

## 🎯 Final Score

Count your ✅ PASS results:

- **15/15**: Perfect! Everything works! 🎉
- **12-14**: Great! Minor issues to fix
- **9-11**: Good! Some issues need attention
- **< 9**: Needs debugging

---

## 🐛 Common Issues & Solutions

### Issue: "Network error" on login
**Solution**: Make sure backend is running on port 3000

### Issue: Can't access /your-courses
**Solution**: You need to login first

### Issue: OTP not received
**Solution**: Check spam folder or use "Resend Code"

### Issue: Token expired
**Solution**: Login again

### Issue: Backend shows HTML page
**Solution**: Clear browser cache and restart backend

### Issue: Stuck on loading screen
**Solution**: Check browser console for errors

---

## 📝 Notes

- All tests should pass for a fully working authentication system
- If any test fails, check the console for error messages
- Make sure both frontend and backend are running
- MongoDB connection must be active

---

## ✅ Verification Complete!

If all tests pass, your authentication system is working perfectly! 🚀

**Key Points Verified:**
- ✅ Auth pages run on frontend only (port 5173)
- ✅ Backend serves APIs only (port 3000)
- ✅ Your Courses is fully protected
- ✅ Login/Signup flow works seamlessly
- ✅ Token authentication is secure
- ✅ User experience is smooth

Congratulations! Your learning platform is secure and ready to use! 🎉
