module.exports = (sequelize, Sequelize) => {
	const Names = sequelize.define('Names', {
		id: {
			allowNull: false,
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name:{
			type: Sequelize.STRING,
			allowNull: true,
		}
	},{paranoid: true}
	);
	return Names;
}