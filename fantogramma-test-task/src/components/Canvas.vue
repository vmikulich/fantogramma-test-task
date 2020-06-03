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
      <canvas id="canvas"></canvas>
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

  mounted() {
    this.store.imageForCanvas.fetchImage().then(() => {
      const canvas = document.getElementById("canvas")
      const ctx = canvas.getContext("2d")
      this.vueCanvasContext = ctx
      this.makeBase()
    })
  }

  get backgroundCanvasImage() {
    return this.store.imageForCanvas.getImage
  }

  makeBase() {
    const baseImage = new Image();
    baseImage.src = this.backgroundCanvasImage;
    this.vueCanvasContext.drawImage(baseImage, 0, 0)
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
        width: 500px;
        height: 500px;
        border: 1px solid red;
      }
    }
  }
</style>