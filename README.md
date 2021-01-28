# User Module Magic

This is an implementation of magic link authentication. Not intended for use on production, but for educational purposes only.

## User Stories

-   [ ] A user can sign up by providing an email address
    -   [ ] A User is created
    -   [ ] The sign in flow is triggered
-   [ ] A user can sign in by providing an email address
    -   [ ] A SignInToken is created for the user
    -   [ ] A SignInToken can be exchanged for a SessionId
    -   [ ] When a SignInToken is created an email is sent to the user containing a magic link based on the token
    -   [ ] When the magic link is clicked the SignInToken is automatically exhanged for the SessionId which is stored in a cookie
-   [ ] A user can sign out
    -   [ ] A SessionId can be invalidated
-   [ ] A user can query it's user information when it's signed in
    -   [ ] A user's information can be queried with a SessionId
