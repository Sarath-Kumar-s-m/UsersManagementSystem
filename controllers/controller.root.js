const rootControllers = async (req, res) => {
      req.session.store = req.session.id;
      return res.redirect(301, "/login");
};

module.exports = rootControllers;
