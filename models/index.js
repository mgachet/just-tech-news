const
    Post = require('./Post'),
    User = require('./User');

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { Post, User };
