<template>
  <router-link
    tag="el-button"
    :to="path"
  >
    {{ message }}
  </router-link>
</template>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Home extends Vue {
  @Prop(String) readonly message!: string
  @Prop(String) readonly path!: string
}
</script>