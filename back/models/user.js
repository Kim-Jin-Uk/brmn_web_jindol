module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users',{
        email:{
            type: DataTypes.STRING(320),
            allowNull:false,
            unique: true
        },
        password:{
            type: DataTypes.STRING(1024),
            allowNull:true
        },
        age:{
            type: DataTypes.STRING(8),
            allowNull:true
        },
        gender:{
            type: DataTypes.STRING(8),
            allowNull:true
        },
        agreement:{
            type: DataTypes.STRING(32),
            allowNull:true
        },
        provider:{
            type: DataTypes.STRING(32),
            allowNull:true
        }
    },{
        charset:"utf8",
        collate:"utf8_general_ci"
    });

    User.associate = (db) => {
        db.User.hasMany(db.Project)
        db.User.hasOne(db.Profile)
        db.User.belongsToMany(db.User,{through:"follow", as: "Followers", foreignKey: "FollowingId"})
        db.User.belongsToMany(db.User,{through:"follow", as: "Followings", foreignKey: "FollowerId"})
    }

    return User
}
