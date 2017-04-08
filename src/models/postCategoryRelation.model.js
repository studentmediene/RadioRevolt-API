export default function (sequelize, DataTypes) {
    const PostCategoryRelation = sequelize.define('postCategoryRelation', {
        postId: {
            type: DataTypes.INTEGER,
            unique: 'compositeIndex'
        },
        categoryId: {
            type: DataTypes.INTEGER,
            unique: 'compositeIndex'
        }
    });
    return PostCategoryRelation;
}
