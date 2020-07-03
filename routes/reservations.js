/*
    all 7 routes must be defined using the appropriate HTTP method (GET, POST)
    the routes must point to the appropriate controller action
    all 7 routes must be authenticated using the provided authentication function
*/

const { index, show, new: _new, edit, create, update, delete: _delete } = require('../controllers/ReservationsController');

function auth (req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('danger', 'You need to login first.');
    return res.redirect('/login');
  }
  next();
}

module.exports = router => {
    router.get('/reservations', index);
    router.get('/reservations/new', _new);
    router.post('/reservations', create);
    router.post('/reservations/update', update);
    router.post('/reservations/delete', _delete);
    router.get('/reservations/:id/edit', edit);
    router.get('/reservations/:id', show);
};