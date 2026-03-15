import { Router } from "express";

const logoutRouter = Router();

logoutRouter.get("/", (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res.json('Goodbye!');
    // res.send('Goodbye!');
  })
});

export default logoutRouter;