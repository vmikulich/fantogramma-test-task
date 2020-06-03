import { Module, State } from 'vuex-simple'
import { Fruits } from './modules/fruits'
import { ImageForCanvas } from './modules/imageForCanvas'
 
export class Store {

  @State()
  public version = "2.0.0"
 
  @Module()
  public fruits = new Fruits()

  @Module()
  public imageForCanvas = new ImageForCanvas()
}