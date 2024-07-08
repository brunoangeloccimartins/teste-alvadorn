import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from "../config/database";

// Define the attributes interface
interface SportAttributes {
  id: number;
  name: string;
  description: string;
  country: string;
  players: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the creation attributes interface
interface SportCreationAttributes extends Optional<SportAttributes, 'id'> {}

// Define the model class
class Sport extends Model<SportAttributes, SportCreationAttributes> implements SportAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public country!: string;
  public players!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the model
Sport.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    players: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Sport',
  }
);

export default Sport;
