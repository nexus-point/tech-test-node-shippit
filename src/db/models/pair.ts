import { Model, type Optional, DataTypes } from 'sequelize'
import { sequelize } from '.'
import { Ape } from './ape'

interface PairAttributes {
  id: number
  ape_id: number
  farther_id: number
  mother_id: number
  partner_id?: number
  in_law?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface PairInput
  extends Optional<
    PairAttributes,
    'id' | 'ape_id' | 'farther_id' | 'mother_id' | 'partner_id' | 'in_law'
  > {}
export interface PairOuput extends Required<PairAttributes> {}

export class Pair
  extends Model<PairAttributes, PairInput>
  implements PairAttributes
{
  public id!: number
  public ape_id!: number
  public farther_id!: number
  public mother_id!: number
  public partner_id?: number
  public in_law?: boolean
  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Pair.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    ape_id: {
      type: DataTypes.INTEGER,
      references: { model: Ape, key: 'id' },
      allowNull: false,
      defaultValue: 1,
    },
    farther_id: {
      type: DataTypes.INTEGER,
      references: { model: Ape, key: 'id' },
      allowNull: false,
      defaultValue: 1,
    },
    mother_id: {
      type: DataTypes.INTEGER,
      references: { model: Ape, key: 'id' },
      allowNull: false,
      defaultValue: 2,
    },
    partner_id: {
      type: DataTypes.INTEGER,
      references: { model: Ape, key: 'id' },
      allowNull: true,
    },
    in_law: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
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
    modelName: 'Pair',
  }
)
