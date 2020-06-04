<template>
  <el-container>
    <Button 
      :message="$t('navButtons.goToTable')"
      path="/table"
    />
    <Button 
      :message="$t('navButtons.goToCanvas')"
      path="/canvas"
    />
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Button from './UI/Button.vue'

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
