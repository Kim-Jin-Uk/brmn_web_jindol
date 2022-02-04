module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define('logs',{
        UserId:{
            type: DataTypes.STRING(256),
            allowNull:true,
        },
        ip:{
            type: DataTypes.STRING(256),
            allowNull:true,
        },
        type:{
            type: DataTypes.STRING(256),
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
