<template>
  <el-container>
    <Button 
      message="Go to table"
      path="/table"
    />
    <Button 
      message="Go to canvas"
      path="/canvas"
    />
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Button from './UI/Button'

@Component({
  components: {Button}
})
export default class Home extends Vue {
 
}
</script>

<style lang="scss" scoped>
  a {
    text-decoration: none;
    color: #ffffff;
  }

  .el-container {
    justify-content: center;
  }
</style>
