import { Op } from 'sequelize'
import { Ape, Sex } from '../db/models/ape'
import { Pair } from '../db/models/pair'

export enum Commands {
  ADD_CHILD = 'ADD_CHILD',
  GET_RELATIONSHIP = 'GET_RELATIONSHIP',
}

export enum BloodlineRelationships {
  PATERNAL = 'Paternal',
  MATERNAL = 'Maternal',
  IN_LAW = 'In-Law',
}

export enum BaseRelationships {
  UNCLE = 'Uncle',
  AUNT = 'Aunt',
  BROTHER = 'Brother',
  SISTER = 'Sister',
  SON = 'Son',
  DAUGHTER = 'Daughter',
  SIBLINGS = 'Siblings',
}

export const childAdditionFailed = 'CHILD_ADDITION_FAILED'

export const childAdded = 'CHILD_ADDED'

export const personNotFound = 'PERSON_NOT_FOUND'

const addChild = async (options: string[]): Promise<string> => {
  let sex: Sex
  let ape: Ape
  let mother!: Ape | null
  let motherPair!: Pair | null
  try {
    mother = await Ape.findOne({ where: { name: options[0] } })
  } catch (e) {
    console.error(e)
  }
  if (mother === null) return childAdditionFailed
  try {
    sex = Sex[options[2] as Sex]
  } catch (e) {
    console.error(e)
    return childAdditionFailed
  }
  try {
    ape = await Ape.create({
      name: options[1],
      sex,
    })
  } catch (e) {
    console.error(e)
    return childAdditionFailed
  }
  try {
    motherPair = await Pair.findOne({ where: { ape_id: mother.id } })
  } catch (e) {
    console.error(e)
  }
  if (motherPair === null) return childAdditionFailed
  try {
    await Pair.create({
      ape_id: ape.id,
      farther_id: motherPair.partner_id,
      mother_id: mother.id,
    })
  } catch (e) {
    console.error(e)
    return childAdditionFailed
  }
  return childAdded
}

const getBloodline = async (
  ape: Ape,
  inlaw: boolean | null,
  sex: Sex[] | Sex,
  paternalOrMaternal: Sex
): Promise<string[]> => {
  const pair: Pair | null = await Pair.findOne({ where: { ape_id: ape.id } })
  if (pair === null) return [personNotFound]
  const pairId: number | null =
    paternalOrMaternal === Sex.M
      ? pair.farther_id
      : paternalOrMaternal === Sex.F
      ? pair.mother_id
      : null
  if (pairId === null) return [personNotFound]
  const parentPair: Pair | null = await Pair.findOne({
    where: { ape_id: pairId },
  })
  if (parentPair === null) return [personNotFound]
  const pairs: Pair[] | null = await Pair.findAll({
    where: {
      farther_id: parentPair.farther_id,
      in_law: inlaw === null ? [true, false] : inlaw,
    },
  })
  if (pairs === null) return [personNotFound]
  const ids: number[] | null = pairs.map((p) => p.ape_id)
  const apes: Ape[] | null = await Ape.findAll({
    where: {
      [Op.and]: [
        {
          id: { [Op.in]: ids },
          sex,
        },
        {
          id: { [Op.not]: pairId },
        },
      ],
    },
  })
  const names: string[] | null = apes.map((a) => a.name)
  return names
}

const getBase = async (
  ape: Ape,
  inlaw: boolean | null,
  sex: Sex[] | Sex
): Promise<string[]> => {
  const pair: Pair | null = await Pair.findOne({ where: { ape_id: ape.id } })
  if (pair === null) return [personNotFound]
  const pairs: Pair[] | null = await Pair.findAll({
    where: {
      mother_id: pair.mother_id,
      ape_id: { [Op.not]: ape.id },
      in_law: inlaw === null ? [true, false] : inlaw,
    },
  })
  if (pairs === null) return [personNotFound]
  const ids: number[] | null = pairs.map((p) => p.ape_id)
  const apes: Ape[] | null = await Ape.findAll({
    where: {
      [Op.and]: [
        {
          id: { [Op.in]: ids },
          sex,
        },
        {
          id: { [Op.not]: pair.ape_id },
        },
      ],
    },
  })
  const names: string[] | null = apes.map((a) => a.name)
  return names
}

const getChildren = async (
  ape: Ape,
  inlaw: boolean | null,
  sex: Sex[] | Sex
): Promise<string[]> => {
  const pairs: Pair[] | null = await Pair.findAll({
    where: {
      mother_id: ape.id,
      in_law: inlaw === null ? [true, false] : inlaw,
    },
  })
  if (pairs === null) return [personNotFound]
  const ids: number[] | null = pairs.map((p) => p.ape_id)
  const apes: Ape[] | null = await Ape.findAll({
    where: { id: ids, sex },
  })
  const names: string[] | null = apes.map((a) => a.name)
  return names
}

const getRelationship = async (options: string[]): Promise<string[]> => {
  const name = options[0]
  const inlaw: boolean = options[1].toLowerCase().includes('in-law')
  const fullRelationship = options[1]
  const relationshipParts = fullRelationship.split('-', 2)
  let ape!: Ape | null
  const sex: Sex | Sex[] =
    relationshipParts[1] === BaseRelationships.UNCLE
      ? Sex.M
      : relationshipParts[1] === BaseRelationships.AUNT
      ? Sex.F
      : [Sex.M, Sex.F]
  try {
    ape = await Ape.findOne({ where: { name } })
  } catch (e) {
    console.error(e)
  }
  if (ape === null) return [personNotFound]
  switch (relationshipParts[0]) {
    case BloodlineRelationships.PATERNAL:
      return await getBloodline(ape, inlaw, sex, Sex.M)
    case BloodlineRelationships.MATERNAL:
      return await getBloodline(ape, inlaw, sex, Sex.F)
    case BaseRelationships.SON:
      return await getChildren(ape, inlaw, Sex.M)
    case BaseRelationships.DAUGHTER:
      return await getChildren(ape, inlaw, Sex.F)
    case BaseRelationships.BROTHER:
      return await getBase(ape, inlaw, Sex.M)
    case BaseRelationships.SISTER:
      return await getBase(ape, inlaw, Sex.F)
    case BaseRelationships.SIBLINGS:
      return await getBase(ape, null, [Sex.M, Sex.F])
    default:
      return []
  }
}

export const whoIsCloser = async (
  apeName1: string,
  apeName2: string
): Promise<string> => {
  const ape1 = await Ape.findOne({ where })
}

export const execute = async (
  command: Commands,
  options: string[]
): Promise<string | string[]> => {
  switch (command) {
    case Commands.ADD_CHILD:
      return await addChild(options)
    case Commands.GET_RELATIONSHIP:
      return await getRelationship(options)
    default:
      return 'COMMAND_NOT_FOUND'
  }
}
