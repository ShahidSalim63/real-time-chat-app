import jwt from 'jsonwebtoken'
import env from 'dotenv'

env.config()

export const generateToken = (userId, res) => { //No callbacks are used, hence, async not required
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.cookie('jwt', token, { 
        maxAge: 7 * 24 * 60 * 60 * 1000, //maxAge is only used at the time of setting,
                                         //  not clearing the cookie
        httpOnly: true, 
        sameSite: 'None', // ✅ allows cross-site cookie sending 
        secure: true, // ✅ required for SameSite=Non
        path: '/'
    })
}
/*sameSite: 'strict'
This setting prevents the browser from sending the cookie on any request that originates from a different site — and GitHub Codespaces tunneling counts as cross-site, even with Vite proxy.

🍪 What Does res.cookie(...) Do?
It sets a cookie in the user's browser when they log in — specifically, it stores the JWT token as a cookie named 'jwt'.

So instead of sending the token in the response body or storing it in localStorage, you're telling the browser:

“Here’s your token. Keep it in a cookie and send it back with every request.”
✅ Benefits:
Automatic sending: Browser sends the cookie with every request to your server

Secure storage: With httpOnly, JavaScript on the frontend cannot access the cookie (protects against XSS)

Session-like behavior: Feels like traditional login sessions, but still stateless

Cross-tab persistence: Works across tabs without extra logic
✅ What Each Option Does:
maxAge: How long the cookie lives (7 days here)

httpOnly: Prevents frontend JS from reading the cookie (XSS Protection)

sameSite: Restricts cross-origin requests (helps prevent CSRF)

secure: Ensures cookie is only sent over HTTPS (critical in production)

🧪 How It Works in Practice
User logs in

Server generates JWT and sets it as a cookie

Browser stores the cookie

On future requests, browser automatically includes the cookie

Server reads the cookie and verifies the token

✅ TL;DR
res.cookie(...) stores the JWT securely in the browser

It enables automatic, secure authentication for future requests

It’s a clean way to manage login state without localStorage or manual headers*/