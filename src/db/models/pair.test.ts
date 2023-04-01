import { describe, expect, test } from '@jest/globals'
import Chance from 'chance'
import { Pair } from './pair'
import { Ape, Sex } from './ape'

const chance = new Chance()

describe('Pair Model Tests', () => {
  test('create pair model', async () => {
    const name = chance.first()
    let ape!: Ape
    let pair!: Pair
    try {
      ape = await Ape.create({ name, sex: Sex.F })
      pair = await Pair.create({
        ape_id: ape.id,
        farther_id: 1,
        mother_id: 2,
      })
    } catch (e) {
      console.error(e)
    } finally {
      expect(pair.farther_id).toBe(1)
      expect(pair.mother_id).toBe(2)
      await pair.destroy()
      await ape.destroy()
    }
  })
})
