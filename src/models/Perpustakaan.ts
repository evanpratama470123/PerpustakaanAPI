import { Model, DataTypes } from "sequelize";
import database from "../database/database";
import { error } from "console";

class Perpustakaan extends Model {
    public id!:number;
    public userId?:string; // email dari google
    public title!:string;
    public completed!:boolean;
    public description!:string;
    public imageUrl!:string;
}

Perpustakaan.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize: database,
        tableName: "perpustakaan"
    }
).sync()
.then(() => console.log("Perpustakaan model synced successfully."))
.catch((error: any) =>console.error(`Error syncing Perpustakaan model: ${error.message}`));

export default Perpustakaan;