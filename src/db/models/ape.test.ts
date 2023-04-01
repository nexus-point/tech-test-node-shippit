import { describe, expect, test } from '@jest/globals'
import Chance from 'chance'
import { Ape, Sex } from './ape'

const chance = new Chance()

describe('Ape Model Tests', () => {
  test('create ape model', async () => {
    const name = chance.first()
    let ape!: Ape
    try {
      ape = await Ape.create({ name, sex: Sex.F })
    } catch (e) {
      console.error(e)
    } finally {
      expect(ape.name).toBe(name)
      expect(ape.sex).toBe(Sex.F)
      await ape.destroy()
    }
  })
})
