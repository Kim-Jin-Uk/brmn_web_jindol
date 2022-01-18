module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('Profile',{
        nickname:{
            type: DataTypes.STRING(34),
            allowNull:true,
        },
        job:{
            type: DataTypes.STRING(25),
            allowNull:true,
        },
        location:{
            type: DataTypes.STRING(64),
            allowNull:true,
        },
        profile_img:{
            type: DataTypes.TEXT,
            allowNull:true,
        },
        introduce:{
            type: DataTypes.STRING(500),
            allowNull:true,
        },
        field:{
            type: DataTypes.STRING(500),
            allowNull:true,
        },
        instagram_link:{
            type: DataTypes.TEXT,
            allowNull:true,
        },
        youtube_link:{
            type: DataTypes.TEXT,
            allowNull:true,
        },
        soundcloud_link:{
            type: DataTypes.TEXT,
            allowNull:true,
        },
        facebook_link:{
            type: DataTypes.TEXT,
            allowNull:true,
        },
        twitter_link:{
            type: DataTypes.TEXT,
            allowNull:true,
        },
    },{
        charset:"utf8",
        collate:"utf8_general_ci"
    });

    Profile.associate = (db) => {
        db.Profile.hasMany(db.ProfileDetail)
        db.Profile.belongsTo(db.User)
    }

    return Profile
}
