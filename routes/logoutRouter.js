import { Router } from "express";

const logoutRouter = Router();

logoutRouter.get("/", (req, res) => {
  req.logout(() => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json("Error logging out");
      } else {

        res.clearCookie("connect.sid");

        res.status(200).json("User has been logged out");
      }
    });
    // res.json('Goodbye!');
    // res.send('Goodbye!');
  })
});

export default logoutRouter;