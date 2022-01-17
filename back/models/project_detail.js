module.exports = (sequelize, DataTypes) => {
    const ProjectDetail = sequelize.define('ProjectDetail',{
        contents:{
            type: DataTypes.TEXT,
            allowNull:false,
        },
        detail_type:{
            type: DataTypes.STRING(32),
            allowNull:false,
        },
    },{
        charset:"utf8mb4",
        collate:"utf8mb4_general_ci"
    });

    ProjectDetail.associate = (db) => {
        db.ProjectDetail.belongsTo(db.Project)
    }

    return ProjectDetail
}
