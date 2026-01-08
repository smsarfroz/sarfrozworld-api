import express from "express";
import session from "express-session";
import passport from "passport";
import homeRouter from "./routes/homeRouter.js";
import logoutRouter from "./routes/logoutRouter.js";
import cors from 'cors';

import './auth.js';
import postRouter from "./routes/postRouter.js";
import commentRouter from "./routes/commentRouter.js";
import usersRouter from "./routes/usersRouter.js";
const app = express();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google<a/>');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile' ]})
);

app.get('/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/home',
    failureRedirect: '/auth/google/failure'
  })
);

app.use('/home', isLoggedIn, homeRouter);
app.use('/users', usersRouter);
app.use('/logout', logoutRouter);
app.use('/post', postRouter);
app.use('/posts/:postid/comments', commentRouter)

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate...');
});

app.get("/", (req, res) => res.send("Hello, world!"));

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`My first Express app - listening on port ${PORT}!`);
});
