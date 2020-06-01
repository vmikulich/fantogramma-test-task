<template>
  <el-container>
    <router-link
      tag="el-button"
      to="/table"
    >
      Go to table
    </router-link>
    <router-link
      tag="el-button"
      to="/canvas"
    >
      Go to canvas
    </router-link>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
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
