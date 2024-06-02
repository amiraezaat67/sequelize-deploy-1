import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "bc8ked1khszxvqryinyz",
  "u2ylh6ywvgilgofq",
  "A2JB7ykQLy3gicEDvc0D",
  {
    host: "bc8ked1khszxvqryinyz-mysql.services.clever-cloud.com",
    dialect: "mysql",
  }
);

export const db_connection = async () => {
  try {
    await sequelize.sync({ alter: true, logging: false });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
