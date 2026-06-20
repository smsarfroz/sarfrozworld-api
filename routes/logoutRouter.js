import { Router } from "express";

const logoutRouter = Router();

logoutRouter.post("/", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json("Error during Passport logout");
    }

    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json("Error logging out");
      }

      res.clearCookie("connect.sid");

      res.status(200).json("User has been logged out");
      
    });
  })
});

export default logoutRouter;