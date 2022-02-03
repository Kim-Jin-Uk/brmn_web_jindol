module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define('logs',{
        UserId:{
            type: DataTypes.STRING(34),
            allowNull:true,
        },
        ip:{
            type: DataTypes.STRING(128),
            allowNull:true,
        },
        type:{
            type: DataTypes.STRING(25),
            allowNull:true,
        },
        contents:{
            type: DataTypes.TEXT,
            allowNull:true,
        },
    },{
        charset:"utf8",
        collate:"utf8_general_ci"
    });

    Log.associate = (db) => {

    }

    return Log
}
