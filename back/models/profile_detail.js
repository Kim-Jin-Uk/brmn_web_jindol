module.exports = (sequelize, DataTypes) => {
    const ProfileDetail = sequelize.define('profiledetails',{
        title:{
            type: DataTypes.STRING(50),
            allowNull:false,
        },
        start_date:{
            type: DataTypes.STRING(32),
            allowNull:true,
        },
        end_date:{
            type: DataTypes.STRING(32),
            allowNull:true,
        },
        sub_title:{
            type: DataTypes.STRING(50),
            allowNull:true,
        },
        contents:{
            type: DataTypes.STRING(100),
            allowNull:true,
        },
        detail_type:{
            type: DataTypes.STRING(32),
            allowNull:false,
        },
        visible_type:{
            type: DataTypes.STRING(32),
            allowNull:true,
        }
    },{
        charset:"utf8",
        collate:"utf8_general_ci"
    });

    ProfileDetail.associate = (db) => {
        db.ProfileDetail.belongsTo(db.Profile)
    }

    return ProfileDetail
}
