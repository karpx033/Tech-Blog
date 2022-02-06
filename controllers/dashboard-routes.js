const router = require('express').Router();
const {Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
      });
  
      const owner = userData.get({ plain: true });

      const postData = await Post.findAll({
      where: {userId: owner.id},
      include: [User],
    });


    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    console.log(owner);
  
      res.render('all-posts-admin', {
        posts,
        owner,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/new', (req, res) => {
    res.render('new-post', {
      logged_in: req.session.logged_in,
    });
  });

  router.get('/:id', async (req, res) => {
    try {
      const postData = await Post.findOne({
        where: {id: req.params.id},
        include: [User],
    });
  
      const post = postData.get({ plain: true });
      console.log(post);
      res.render('edit-post', {
        post,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  module.exports = router;