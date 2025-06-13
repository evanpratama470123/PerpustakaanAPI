import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { error } from "console";

dotenv.config();

const dbname = process.env.DBNAME || "default_db";
const dbuser = process.env.DBUSER || "default_user";
const dbpassword = process.env.DBPASSWORD || "default_password";
const database = new Sequelize(dbname, dbuser, dbpassword, {
   port: 3309,
   dialect: "mysql"
})

database.authenticate()
.then(() => console.log("Database connected successfully."))
.catch((error: any) => console.error(`Error creating database: ${error.message}`))

export default database;