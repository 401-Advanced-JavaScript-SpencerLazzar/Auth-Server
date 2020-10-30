


router.get('/oauth', async (req, res, next) => {
  let code = req.query.code;
  let tokenURL = 'https://github.com/login/oauth/access_token';
  let remoteUserURL = 'https://api.github.com/user';
  try {
    const access_token = await exchangeCodeForToken(code);
    const userData = await getRemoteUserData(access_token);
    const token = await createAPIUser(userData);

    res.send(token);
  } catch (e) {
    console.log(e);

    res.status(400).send("Something went wrong");
  }
});
