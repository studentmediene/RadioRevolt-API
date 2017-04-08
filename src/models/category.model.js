/**
* Category model
* @module models/Category
*/

/**
* Category model - create and export the database model for posts
* including all assosiations and classmethods assiciated with this model.
* @memberof  module:models/Category
* @param  {Object} sequelize description
* @param  {Object} DataTypes description
*/
export default function (sequelize, DataTypes) {
    const Category = sequelize.define('category', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        }
    }, {
        name: {
            singular: 'category',
            plural: 'categories'
        },
        classMethods: {
            associate(models) {
                Category.belongsToMany(models.Post, {
                    through: 'postCategoryRelations',
                    as: 'categories',
                    foreignKey: {
                        name: 'categoryId',
                        allowNull: false
                    },
                    otherKey: 'postId'
                });
            }
        }
    }
    );
    return Category;
}
