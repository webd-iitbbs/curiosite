async function getUserId(email) {
  const user = await User.findOne({
    email: email,
  });
  return user._id;
}
