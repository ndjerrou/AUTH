const express = require("express");
const { check, validationResult } = require("express-validator");
const usersRepo = require("../../repositories/users");
const signupTemplate = require("../../views/admin/auth/signup");
const signinTemplate = require("../../views/admin/auth/signin");

const {
  requireEmail,
  requirePassword,
  requirePasswordConfirmation
} = require("./validators");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(signupTemplate({ req }));
});

router.post(
  "/signup",
  [requireEmail, requirePassword, requirePasswordConfirmation],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.send(signupTemplate({ req, errors }));
    }
    const { email, password, passwordConfirmation } = req.body;

    const user = await usersRepo.create({ email, password });
    req.session.userId = user.id;

    res.send("Account created");
  }
);

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("End of session");
});

router.get("/signin", (req, res) => {
  res.send(signinTemplate());
});

router.post("/signin", async (req, res) => {
  const user = await usersRepo.getOneBy({ email: req.body.email });
  if (!user) {
    return res.send("No user found for this email");
  }

  const validPassword = await usersRepo.comparePasswords(
    user.password,
    req.body.password
  );
  if (!validPassword) {
    return res.send("The password given is not the correct one");
  }
  req.session.userId = user.id;

  res.send("Okay, connected");
});

router.post("/signup", async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  const existingUser = await usersRepo.getOneBy({ email });
  if (existingUser) {
    return res.send("Email in use");
  }
  if (password !== passwordConfirmation) {
    res.send("Passwords must match");
  }

  const user = await usersRepo.create({ email, password });

  //store the id of that user inside the users cookie
  req.session.userId = user.id;

  res.send("Account created");
});

router.get("/signout", (req, res) => {
  req.session = null;
  res.send("End of session");
});

router.get("/signin", (req, res) => {
  res.send(
    ` <div>
        <form method="POST">
          <input name="email" placeholder="email" />
          <input name="password" placeholder="pasword" />
          <button>Sign in</button>
        </form>
        </div>
        `
  );
});

router.post("/signin", async (req, res) => {
  const user = await usersRepo.getOneBy({ email: req.body.email });
  if (!user) {
    return res.send("No user found for this email");
  }

  const validPassword = await usersRepo.comparePasswords(
    user.password,
    req.body.password
  );
  if (!validPassword) {
    return res.send("The password given is not the correct one");
  }
  req.session.userId = user.id;

  res.send("Okay, connected");
});

module.exports = router;
