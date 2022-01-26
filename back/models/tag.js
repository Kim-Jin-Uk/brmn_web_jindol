module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define('tags',{
        tag_name:{
            type: DataTypes.STRING(150),
            allowNull:false,
        },
        tag_type:{
            type: DataTypes.STRING(16),
            allowNull:false,
        },
        visible_type:{
            type: DataTypes.STRING(32),
            allowNull:true,
        }
    },{
        charset:"utf8mb4",
        collate:"utf8mb4_general_ci"
    });

    Tag.associate = (db) => {
        db.Tag.belongsToMany(db.Project,{ through: 'projecthashtag' })
    }

    return Tag
}
