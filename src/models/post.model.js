/**
* Post model
* @module models/Post
*/

/**
* Post model - create and export the database model for posts
* including all assosiations and classmethods assiciated with this model.
* @memberof  module:models/Post
* @param  {Object} sequelize description
* @param  {Object} DataTypes description
*/
export default function (sequelize, DataTypes) {
    const Post = sequelize.define('post', {
        lead: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: ''
        },
        coverPhoto: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        authorId: { // For use with LDAP
            type: DataTypes.INTEGER,
            allowNull: true
        },
        pinned: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        classMethods: {
            associate(models) {
                Post.belongsTo(models.Category, {
                    foreignKey: {
                        name: 'categoryId',
                        allowNull: true
                    }
                });
                Post.belongsTo(models.Show, {
                    foreignKey: {
                        name: 'showId',
                        allowNull: true
                    }
                });
            }
        }
    }
    );
    return Post;
}
