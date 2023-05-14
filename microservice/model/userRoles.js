
export default (sequelize, Sequelize) => {

    const UserRoles = sequelize.define('userRoles', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        role: Sequelize.STRING
      });

    return UserRoles

}
