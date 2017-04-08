/**
* Episode model
* @module models/Episode
*/

import slugify from 'slugify';

/**
* Episode model - create and export the database model for posts
* including all assosiations and classmethods assiciated with this model.
* @memberof  module:models/Post
* @param  {Object} sequelize description
* @param  {Object} DataTypes description
*/
export default function (sequelize, DataTypes) {
    const Episode = sequelize.define('episode', {
        title: {
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
        lead: {
            type: DataTypes.STRING(2048),
            allowNull: false,
            defaultValue: ''
        },
        podcastUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        soundUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        }
    }, {
        name: {
            singular: 'episode',
            plural: 'episodes'
        },
        hooks: {
            afterCreate: episode => {
                const slug = slugify(`${episode.get('title')} ${episode.get('id')}`);
                episode.set('slug', slug);
                episode.save();
            }
        },
        classMethods: {
            associate(models) {
                Episode.belongsTo(models.Show, {
                    foreignKey: {
                        name: 'showId',
                        allowNull: true
                    }
                });
            }
        }
    }
    );
    return Episode;
}
