/**
* Show model
* @module models/Show
*/

/**
* Show model - create and export the database model for shows
* including all assosiations and classmethods assiciated with this model.
* @memberof  module:models/Post
* @param  {Object} sequelize description
* @param  {Object} DataTypes description
*/
export default function (sequelize, DataTypes) {
    const Show = sequelize.define('show', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        podcastRssFeedUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        logoImageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        lead: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        explicitContent: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        archived: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        language: {
            type: DataTypes.STRING(5),
            allowNull: false,
            defaultValue: 'no'
        },
        digasId: { // For use with LDAP
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        classMethods: {
            associate(models) {
                Show.hasMany(models.Post, {
                    onDelete: 'cascade'
                });
                Show.hasMany(models.Episode, {
                    onDelete: 'cascade'
                });
            }
        }
    }
    );
    return Show;
}
