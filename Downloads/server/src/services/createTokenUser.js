const createTokenUser = (user) => {
  return { name: user.firstName, userId: user._id, role: user.role };
  };
  
  module.exports = createTokenUser;
  