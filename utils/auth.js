// Middleware to check if user is logged in using req.session
const withAuth = (req, res, next) => {
  // If user is not logged in, redirect to login page
  // else continue to next middleware
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
