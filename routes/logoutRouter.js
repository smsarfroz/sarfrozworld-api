import { Router } from "express";

const logoutRouter = Router();

logoutRouter.get("/", (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res.send('Goodbye!');
  })
});

export default logoutRouter;