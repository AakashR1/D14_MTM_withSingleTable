module.exports = (sequelize, Sequelize) => {
	const Friends = sequelize.define('Friends', {
		id: {
			allowNull: false,
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		user_id:{
			type: Sequelize.INTEGER,
			allowNull: false,
            references:{
                model: "Names",
                key: "id"
            },
		},
		friend_id:{
			type: Sequelize.INTEGER,
			allowNull: false,
            references:{
                model: "Names",
                key: "id"
            },
		}
	},{paranoid: true}
	);
	return Friends;
}