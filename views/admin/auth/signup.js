const layout = require("../layout");

const getError = (errors, prop) => {
  //prop === email - password - passwordConfirmation
  try {
    return errors.mapped()[prop].msg;
  } catch (e) {
    return "";
  }
};

module.exports = ({ userId, errors }) => {
  return layout({
    content: `
    <div>
      Your id is : ${userId}
        <form method="POST">
          <input name="email" placeholder="email" />
          ${getError(errors, "email")}
          <input name="password" placeholder="pasword" />
          ${getError(errors, "password")}
          <input name="passwordConfirmation" placeholder="confirm password" />
          ${getError(errors, "passwordConfirmation")}
          <button>Sign up</button>
        </form>
        </div>`
  });
};
