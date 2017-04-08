module.exports = {
    up(migration, DataTypes) {
        return migration.changeColumn('posts', 'lead', {
            type: DataTypes.STRING(2048),
            allowNull: false,
            defaultValue: ''
        });
    },

    down(migration, DataTypes) {
        return migration.changeColumn('post', 'lead', {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: ''
        });
    }

};
