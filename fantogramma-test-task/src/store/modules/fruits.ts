import { Mutation, State, Getter, Action } from 'vuex-simple';
import axios from 'axios'
import * as t from 'io-ts'



const FruitType = t.interface({
  key22: t.type({
    fruit: t.string
  }),
  key1: t.type({
    fruit: t.string
  }),
  key100: t.type({
    fruit: t.string
  }),
  key4: t.type({
    fruit: t.string
  })
})

type Fruit = t.TypeOf<typeof FruitType>

export class Fruits {

  @State()
  public fruits: object = {}

  @Getter()
  public get getFruits() {
    return this.fruits
  }

  @Mutation()
  public setFruits(fruits: object) {
    this.fruits = fruits
  }

  @Action()
  public async fetchFruits() {
    const fruits = await axios.get('http://fantogramma.org/test.json')
    const res = FruitType.decode(fruits)
    this.setFruits(fruits.data)
  }

}