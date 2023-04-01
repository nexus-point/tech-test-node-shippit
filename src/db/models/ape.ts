import { Model, type Optional, DataTypes } from 'sequelize'
import { sequelize } from '.'

export enum Sex {
  M = 'M',
  F = 'F',
}

interface ApeAttributes {
  id: number
  name: string
  sex: Sex
  createdAt?: Date
  updatedAt?: Date
}

export interface ApeInput
  extends Optional<ApeAttributes, 'id' | 'name' | 'sex'> {}
export interface ApeOuput extends Required<ApeAttributes> {}

export class Ape
  extends Model<ApeAttributes, ApeInput>
  implements ApeAttributes
{
  public id!: number
  public name!: string
  public sex!: Sex
  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Ape.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    sex: {
      type: DataTypes.ENUM('M', 'F'),
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()'),
    },
  },
  {
    sequelize,
    modelName: 'Ape',
  }
)
