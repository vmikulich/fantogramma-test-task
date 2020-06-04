<template>
  <el-container>
    <el-row>
      <el-col :span="24">
        <Button 
          :message="$t('navButtons.goToHome')"
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
import Button from './UI/Button.vue'


@Component({
  components: {Button}
})
export default class Canvas extends Vue {
  
  private store: Store = useStore(this.$store)
  private vueCanvasContext = {}
  private vueCanvas = {}
  private mouse = {}
  private squareWidth = 50
  private squreHeight = 50

  private squareParams = {
    offsetX: 225,
    offsetY: 225
  }

  mounted() {
    this.store.imageForCanvas.fetchImage().then(() => {
      const canvas: HTMLCanvasElement = document.getElementById("canvas")
      canvas.style.backgroundImage = `url(${this.backgroundCanvasImage})`
      this.vueCanvas = canvas
      const ctx: CanvasRenderingContext2D = canvas.getContext("2d")
      this.vueCanvasContext = ctx
      this.mouse = this.getMouse(canvas, ctx)
      this.updateSquarePosition()
      // this.makeBaseImage(ctx)
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

  updateSquarePosition(): void {
    requestAnimationFrame(this.updateSquarePosition)

    this.clearCanvas()

    if (this.mouse.left) {
      this.squareParams.offsetX += this.mouse.dx
      this.squareParams.offsetY += this.mouse.dy
    }
    this.vueCanvasContext.beginPath()
    this.vueCanvasContext.fillStyle = 'rgba(0, 128, 0, 0.5)'
    this.vueCanvasContext.fillRect(this.squareParams.offsetX, this.squareParams.offsetY, this.squareWidth, this.squreHeight)

    this.mouse.update()
  }

  getMouse(element: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    const mouse = {
      x: 0, 
      y: 0,
      dx: 0,
      dy: 0,
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
      const imgData: Uint8ClampedArray = ctx.getImageData(mouse.x, mouse.y, 1, 1).data.slice(0, 3)
      // const squareData = ctx.getImageData(this.squareParams.offsetX, this.squareParams.offsetX, 50, 50)
      if (event.button === 0 && color.join() === imgData.join()) {
        mouse.left = true
        ctx.clearRect(this.squareParams.offsetX, this.squareParams.offsetX, this.squareWidth, this.squreHeight)
        ctx.fillStyle = 'rgba(0, 0, 255, 0.5)'
        ctx.fillRect(this.squareParams.offsetX, this.squareParams.offsetY, this.squareWidth, this.squreHeight)

        // for (let i = 0; i < squareData.data.length; i += 4) {
        //   // console.log('before', [squareData.data[i], squareData.data[i+1], squareData.data[i+2]])
        //   squareData.data[i] = 0
        //   squareData.data[i + 1] = 0
        //   squareData.data[i + 2] = 255
        //   // console.log('after', [squareData.data[i], squareData.data[i+1], squareData.data[i+2]])
        // }
        // ctx.putImageData(squareData, this.squareParams.offsetX, this.squareParams.offsetX)
      }
    })

    element.addEventListener('mouseup', event => {
      if (event.button === 0) {
        mouse.left = false
        this.squareParams.offsetX = 225
        this.squareParams.offsetY = 225
      }
    })

    element.addEventListener('mouseleave', event => {
      if (event.button === 0) {
        mouse.left = false
        this.squareParams.offsetX = 225
        this.squareParams.offsetY = 225
        // this.vueCanvasContext.fillStyle = 'rgba(0, 128, 0, 0.5)'
      }
    })

    return mouse
  }

  clearCanvas(): void {
    // const temp = this.vueCanvas.width
    // this.vueCanvas.width = temp
    this.vueCanvasContext.clearRect(0, 0, 500, 500)
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
        border: 1px solid red;
      }
    }
  }
</style>