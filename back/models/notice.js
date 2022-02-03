module.exports = (sequelize, DataTypes) => {
    const Notice = sequelize.define('notices',{
        type:{
            type: DataTypes.STRING(25),
            allowNull:true,
        },
        title:{
            type: DataTypes.STRING(34),
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

    Notice.associate = (db) => {

    }

    return Notice
}
