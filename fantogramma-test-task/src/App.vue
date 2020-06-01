<template>
  <div id="app">
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Home from './components/Home.vue';

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
  .el-main {
    display: flex;
    justify-content: center;
  }
</style>
