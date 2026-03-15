import express from "express";
import session from "express-session";
import passport from "passport";
import homeRouter from "./routes/homeRouter.js";
import logoutRouter from "./routes/logoutRouter.js";
import dotenv from 'dotenv'
import cors from 'cors';

// import './auth.js';
import postRouter from "./routes/postRouter.js";
import commentRouter from "./routes/commentRouter.js";
import usersRouter from "./routes/usersRouter.js";
import signupRouter from "./routes/signupRouter.js";
import loginRouter from "./routes/loginRouter.js";
import uploadFileRouter from "./routes/uploadFileRouter.js";
const app = express();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  exposedHeaders: ['set-cookie']
}));

app.use(express.json()); 
app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: true,
  cookie: {
    secure: false,
    sameSite: 'Lax',
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true, 
    // domain: 'localhost'
  }
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google<a/>');
});

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['email', 'profile' ]})
// );

// app.get('/google/callback',
//   passport.authenticate( 'google', {
//     successRedirect: '/home',
//     failureRedirect: '/auth/google/failure'
//   })
// );

app.use('/home', homeRouter);
app.use('/users', usersRouter); 
app.use('/logout', logoutRouter);
app.use('/post', postRouter);
app.use('/posts/:postId/comments', commentRouter)
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/uploadfile', uploadFileRouter);

// app.get('/auth/google/failure', (req, res) => {
//   res.send('Failed to authenticate...');
// });

// const PORT = 3000;
// app.listen(PORT, (error) => {
//   if (error) {
//     throw error;
//   }
//   console.log(`My first Express app - listening on port ${PORT}!`);
// });

const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Express app - listening on port ${PORT}!`);
});;
server.keepAliveTimeout = 30000; 
server.headersTimeout = 31000; 
