




module.export = function (capability) {
  return function (req, res, next) {

    try {
      if (req.user.capability.includes(capability)) {
        next();
      } else {
        next('Access Denied');
      }
    } catch (e) {
      console.error(e);
      next('Invalid token');
    }
  }
}

