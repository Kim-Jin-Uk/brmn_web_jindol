module.exports = (sequelize, DataTypes) => {
    const Report = sequelize.define('reports',{
        type:{
            type: DataTypes.STRING(25),
            allowNull:true,
        },
        name:{
            type: DataTypes.STRING(34),
            allowNull:true,
        },
        phone_num:{
            type: DataTypes.STRING(64),
            allowNull:true,
        },
        email:{
            type: DataTypes.TEXT,
            allowNull:true,
        },
        contents:{
            type: DataTypes.STRING(500),
            allowNull:true,
        },
    },{
        charset:"utf8",
        collate:"utf8_general_ci"
    });

    Report.associate = (db) => {

    }

    return Report
}
