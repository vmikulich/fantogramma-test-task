import { Mutation, State, Getter, Action } from 'vuex-simple';
import axios from 'axios'

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
    // try {
      const fruits = await axios.get('http://fantogramma.org/test.json')
      this.setFruits(fruits.data)
    // } catch(error) {
    //   throw error
    // }
  }

}