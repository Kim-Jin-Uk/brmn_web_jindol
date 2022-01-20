module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('projects',{
        title:{
            type: DataTypes.STRING(64),
            allowNull:false,
        },
        thumb_img:{
            type: DataTypes.TEXT,
            allowNull:false,
        },
        copyright:{
            type: DataTypes.STRING(64),
            allowNull:true,
        },
        view_count:{
            type: DataTypes.INTEGER,
            allowNull:true,
        },
    },{
        charset:"utf8mb4",
        collate:"utf8mb4_general_ci"
    });

    Project.associate = (db) => {
        db.Project.belongsTo(db.User)
        db.Project.hasMany(db.ProjectDetail)
        db.Project.hasMany(db.Tag)
    }

    return Project
}
