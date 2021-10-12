module.exports = app => {
    const {STRING, INTEGER} = app.Sequelize;
    const User = app.model.define('user', {
        id: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: STRING,
            allowNull: false //不允许为null
        },
        uid: {
            type: INTEGER
        },
    },{
        createdAt: 'createTime', // 指定名字
        updatedAt: false,
    })
    return User;
}