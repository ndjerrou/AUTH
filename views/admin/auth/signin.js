const layout = require("../layout");

module.exports = () => {
  return layout({
    content: `
      <div>
        <form method="POST">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="pasword" />
            <button>Sign in</button>
        </form>
      </div>
      `
  });
};
