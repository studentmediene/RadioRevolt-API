module.exports = {
    up(migration, DataTypes) {
        return migration.addColumn('episodes', 'digasId', {
            type: DataTypes.INTEGER,
            allowNull: true
        });
    },

    down(migration) {
        return migration.removeColumn('episodes', 'digasId');
    }

};
