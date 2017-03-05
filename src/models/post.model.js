/**
* Post model
* @module models/Post
*/

import slugify from 'slugify';

/**
* Post model - create and export the database model for posts
* including all assosiations and classmethods assiciated with this model.
* @memberof  module:models/Post
* @param  {Object} sequelize description
* @param  {Object} DataTypes description
*/
export default function (sequelize, DataTypes) {
    const Post = sequelize.define('post', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lead: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        slug: {
            type: DataTypes.STRING,
            // Allow null because then Sequelize can set it to null,
            // then receive the object and create slug based on
            // id and title.
            allowNull: true,
            unique: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: ''
        },
        coverPhotoUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
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
        hooks: {
            afterCreate: post => {
                const slug = slugify(`${post.get('title')} ${post.get('id')}`);
                post.set('slug', slug);
                post.save();
            }
        },
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
