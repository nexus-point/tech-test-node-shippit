import { describe, expect, test } from '@jest/globals'
import Chance from 'chance'
import { Ape, Sex } from '../db/models/ape'
import { Pair } from '../db/models/pair'
import {
  execute,
  Commands,
  childAdditionFailed,
  childAdded,
  personNotFound,
  BloodlineRelationships,
  BaseRelationships,
} from './commands'

const chance = new Chance()

describe('Commands Tests', () => {
  beforeAll(async () => {
    const ape = await Ape.findOne({ where: { name: 'Minerva' } })
    if (ape !== null) {
      await Pair.destroy({ where: { ape_id: ape.id } })
      await Ape.destroy({ where: { id: ape.id } })
    }
  })

  test('test add child Flora Minerva F', async () => {
    const result = await execute(Commands.ADD_CHILD, [
      'Flora',
      'Minerva',
      Sex.F,
    ])
    expect(result).toBe(childAdded)
  })

  test('test add child fail', async () => {
    const char = chance.character({ pool: 'MF' })
    const result = await execute(Commands.ADD_CHILD, ['Blah', 'Minerva', char])
    expect(result).toBe(childAdditionFailed)
  })
  test('test get relationship - Remus, Maternal-Aunt', async () => {
    const results: string[] = (await execute(Commands.GET_RELATIONSHIP, [
      'Remus',
      BloodlineRelationships.MATERNAL + '-' + BaseRelationships.AUNT,
    ])) as string[]
    expect(results.sort()).toEqual(['Dominique', 'Minerva'].sort())
  })

  test('test get relationship - Remus, Maternal-Uncle', async () => {
    const results: string[] = (await execute(Commands.GET_RELATIONSHIP, [
      'Remus',
      BloodlineRelationships.MATERNAL + '-' + BaseRelationships.UNCLE,
    ])) as string[]
    expect(results.sort()).toEqual(['Louis'].sort())
  })

  test('test get relationship - Remus, Maternal (Uncles and Aunts)', async () => {
    const results: string[] = (await execute(Commands.GET_RELATIONSHIP, [
      'Remus',
      BloodlineRelationships.MATERNAL,
    ])) as string[]
    expect(results.sort()).toEqual(['Dominique', 'Louis', 'Minerva'].sort())
  })

  test('test get relationship fail- Blah, Maternal-Aunt', async () => {
    const result = await execute(Commands.GET_RELATIONSHIP, [
      'Blah',
      BloodlineRelationships.MATERNAL + '-' + BaseRelationships.AUNT,
    ])
    expect(result[0]).toBe(personNotFound)
  })

  test('test get relationship - William, Paternal-Aunt', async () => {
    const results: string[] = (await execute(Commands.GET_RELATIONSHIP, [
      'William',
      BloodlineRelationships.PATERNAL + '-' + BaseRelationships.AUNT,
    ])) as string[]
    expect(results.sort()).toEqual(['Lilly'].sort())
  })

  test('test get relationship - William, Paternal-Uncle', async () => {
    const results: string[] = (await execute(Commands.GET_RELATIONSHIP, [
      'William',
      BloodlineRelationships.PATERNAL + '-' + BaseRelationships.UNCLE,
    ])) as string[]
    expect(results.sort()).toEqual(['Albus'].sort())
  })

  test('test get relationship - Remus, Paternal (Uncles and Aunts)', async () => {
    const results: string[] = (await execute(Commands.GET_RELATIONSHIP, [
      'William',
      BloodlineRelationships.PATERNAL,
    ])) as string[]
    expect(results.sort()).toEqual(['Albus', 'Lilly'].sort())
  })

  test('test get relationship fail- Blah, Paternal-Aunt', async () => {
    const result = await execute(Commands.GET_RELATIONSHIP, [
      'Blah',
      BloodlineRelationships.PATERNAL + '-' + BaseRelationships.AUNT,
    ])
    expect(result[0]).toBe(personNotFound)
  })
  test('test get relationship - Minerva, Siblings', async () => {
    const results: string[] = (await execute(Commands.GET_RELATIONSHIP, [
      'Minerva',
      BaseRelationships.SIBLINGS,
    ])) as string[]
    expect(results.sort()).toEqual(
      ['Victorie', 'Ted', 'Dominique', 'Louis'].sort()
    )
  })

  test('test get relationship - Flora, Son', async () => {
    const results: string[] = (await execute(Commands.GET_RELATIONSHIP, [
      'Flora',
      BaseRelationships.SON,
    ])) as string[]
    expect(results.sort()).toEqual(['Louis'].sort())
  })

  test('test get relationship - Flora, Daughter', async () => {
    const results: string[] = (await execute(Commands.GET_RELATIONSHIP, [
      'Flora',
      BaseRelationships.DAUGHTER,
    ])) as string[]
    expect(results.sort()).toEqual(['Victorie', 'Dominique', 'Minerva'].sort())
  })

  test('test get relationship - Albus, Brother', async () => {
    const results: string[] = (await execute(Commands.GET_RELATIONSHIP, [
      'Albus',
      BaseRelationships.BROTHER,
    ])) as string[]
    expect(results.sort()).toEqual(['James'].sort())
  })

  test('test get relationship - Louis, Brother', async () => {
    const results: string[] = (await execute(Commands.GET_RELATIONSHIP, [
      'Louis',
      BaseRelationships.BROTHER,
    ])) as string[]
    expect(results.sort()).toEqual([])
  })

  test('test get relationship - Louis, Brother-In-Law', async () => {
    const results: string[] = (await execute(Commands.GET_RELATIONSHIP, [
      'Louis',
      BaseRelationships.BROTHER + '-' + BloodlineRelationships.IN_LAW,
    ])) as string[]
    expect(results.sort()).toEqual(['Ted'].sort())
  })

  test('test get relationship - Victorie, Sister', async () => {
    const results: string[] = (await execute(Commands.GET_RELATIONSHIP, [
      'Victorie',
      BaseRelationships.SISTER,
    ])) as string[]
    expect(results.sort()).toEqual(['Dominique', 'Minerva'].sort())
  })

  test('test get relationship - Lilly, Sister', async () => {
    const results: string[] = (await execute(Commands.GET_RELATIONSHIP, [
      'Lilly',
      BaseRelationships.SISTER,
    ])) as string[]
    expect(results.sort()).toEqual([])
  })

  test('test get relationship - Lilly, Sister-In-Law', async () => {
    const results: string[] = (await execute(Commands.GET_RELATIONSHIP, [
      'Lilly',
      BaseRelationships.SISTER + '-' + BloodlineRelationships.IN_LAW,
    ])) as string[]
    expect(results.sort()).toEqual(['Darcy', 'Alice'].sort())
  })
})
