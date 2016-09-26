/**
* Episode model
* @module models/Episode
*/

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
        lead: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        podcastUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        soundUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        }
    }, {
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
