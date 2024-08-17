function auth(roles) {
  return (req, res, next) => {
      const { role } = req.user;

      if (roles.includes(role)) {
          next();
      } else {
          res.status(403).json({ error: 'no access' });
      }
  };
}

module.exports = auth;
