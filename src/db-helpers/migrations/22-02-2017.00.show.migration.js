module.exports = {
    up(migration, DataTypes) {
        return migration.addColumn('shows', 'slug', {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        });
    },

    down(migration) {
        return migration.removeColumn('shows', 'slug');
    }

};
