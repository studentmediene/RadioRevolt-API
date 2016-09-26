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
        rssFeed: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        logoImage: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        lead: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
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
