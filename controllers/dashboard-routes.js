const router = require('express').Router();
const {Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        // include: [{ model: Post }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('all-posts-admin', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/new', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    res.render('new-post');
  });

  module.exports = router;