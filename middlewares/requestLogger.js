module.exports = function (req, res, next) {
  console.log('Method:', req.method);
  console.log('Path:  ', req.path);
  console.log('Body:  ', req.body);
  if (Object.keys(req.query).length > 0) {
    console.log('Query ', req.query);
  }
  if (Object.keys(req.params).length > 0) {
    console.log('Query ', req.params);
  }
  console.log('---');
  next();
};
