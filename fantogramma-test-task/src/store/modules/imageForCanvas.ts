import { Mutation, State, Getter, Action } from 'vuex-simple';
import axios from 'axios'

export class ImageForCanvas {

  @State()
  public image = ''

  @Getter()
  public get getImage() {
    return this.image
  }

  @Mutation()
  public setImage(image: string) {
    this.image = image
  }

  @Action()
  public async fetchImage() {
    try {
      const image = await axios({
        url: 'http://fantogramma.org/test.png',
        method: 'GET',
        responseType: 'blob'
      })
      const url = window.URL.createObjectURL(new Blob([image.data]))
      this.setImage(url)
      return url
    } catch(error) {
      return new Error(error)
    }
  }
}