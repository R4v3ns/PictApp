const { DataTypes, Model } = require('sequelize')
const db = require('../config/database')

class Follower extends Model {
    static id
    static userId
    static followerId
    static deleted    

}

Follower.init({
    deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize: db,
    modelName: 'Follower',
    tableName: 'follower',
    timestamps: true
});

Follower.associate = (models) => {
    Follower.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Follower.belongsTo(models.User, { foreignKey: 'followerId', as: 'follower' });
}

Follower.prototype.toJSON = function () {
    const { ...follower } = this.get()
    return follower
}

module.exports = Follower
