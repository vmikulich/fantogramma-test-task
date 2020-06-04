<template>
  <el-container>
    <el-row>
      <el-col :span="24">
        <Button 
          message="Go to home"
          path="/"
        />
      </el-col>
    </el-row>
    <div class="canvas-container">
      <canvas id="canvas" width="500" height="500"></canvas>
    </div>
  </el-container>
</template>

<script lang="ts">
import { useStore } from 'vuex-simple';
import { Component, Vue } from 'vue-property-decorator'
import { Store } from '../store/store'
import Button from './UI/Button'


@Component({
  components: {Button}
})
export default class Canvas extends Vue {
  
  private store: Store = useStore(this.$store)
  private vueCanvasContext = null
  private vueCanvas = null
  private mouse = null

  private squareParams = {
    offsetX: 225,
    offsetY: 225
  }

  mounted() {
    this.store.imageForCanvas.fetchImage().then(() => {
      const canvas: HTMLCanvasElement = document.getElementById("canvas")
      this.vueCanvas = canvas
      const ctx: CanvasRenderingContext2D = canvas.getContext("2d")
      this.vueCanvasContext = ctx
      //this.makeBaseImage(ctx)
      this.mouse = this.getMouse(canvas)
      this.updateSquarePosition()
    })
  }

  get backgroundCanvasImage() {
    return this.store.imageForCanvas.getImage
  }

  makeBaseImage(ctx: CanvasRenderingContext2D): void {
    const baseImage = new Image();
    baseImage.src = this.backgroundCanvasImage
    console.log(this.vueCanvasContext)
    baseImage.addEventListener("load", function() {
      ctx.drawImage(baseImage, 0, 0)
    }, false)
  }

  // drawSquare(ctx: CanvasRenderingContext2D) {
  //   ctx.fillRect(225,225,50,50)
  // }

  updateSquarePosition(): void {
    requestAnimationFrame(this.updateSquarePosition)

    this.clearCanvas()

    if (this.mouse.left) {
      this.squareParams.offsetX += this.mouse.dx
      this.squareParams.offsetY += this.mouse.dy
    }
    this.vueCanvasContext.fillStyle = 'rgba(0, 128, 0, 0.5)'
    this.vueCanvasContext.fillRect(this.squareParams.offsetX, this.squareParams.offsetY, 50, 50)

    this.mouse.update()
  }

  getMouse(element: HTMLCanvasElement) {
    const mouse = {
      x: 0, y: 0,
      dx: 0, dy: 0,
      left: false
    }

    mouse.update = () => {
      mouse.dx = 0
      mouse.dy = 0
    }

    element.addEventListener('mousemove', event => {
      const rect = element.getBoundingClientRect()

      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      mouse.dx = x - mouse.x
      mouse.dy = y - mouse.y

      mouse.x = x
      mouse.y = y
    })

    element.addEventListener('mousedown', event => {
      const color: Array<number> = [0, 128, 0]
      const imgData: Array<number> = this.vueCanvasContext.getImageData(mouse.x, mouse.y, 1, 1).data.slice(0, 3)
      console.log(color)
      console.log(imgData)
      console.log(color.join(''))
      console.log(imgData.join(''))
      if (event.button === 0 && color.join() === imgData.join()) {
        mouse.left = true
        this.vueCanvasContext.fillStyle = 'rgba(0, 0, 255, 0.5)'
      }
    })

    element.addEventListener('mouseup', event => {
      if (event.button === 0) {
        mouse.left = false
        this.squareParams.offsetX = 225
        this.squareParams.offsetY = 225
        this.vueCanvasContext.fillStyle = 'rgba(0, 128, 0, 0.5)'
      }
    })

    return mouse
  }

  clearCanvas(): void {
    const temp = this.vueCanvas.width
    this.vueCanvas.width = temp
  }
}
</script>

<style lang="scss" scoped>
  .el-container {
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    .canvas-container {
      margin-top: 30px;
      #canvas {
        // width: 500px;
        // height: 500px;
        border: 1px solid red;
      }
    }
  }
</style>