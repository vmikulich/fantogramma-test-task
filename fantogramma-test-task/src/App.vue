<template>
  <div id="app">
    <el-container>
      <el-main>
        <el-button
          @click="setLocale('en')"
        >
          {{ $t('changeLanguage') }}
        </el-button>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  language = 'en'

  setLocale(): void {
    const locale = this.language === 'en' ? 'ru' : 'en'
    import(`./locales/${locale}.json`).then(msg => {
      this.$i18n.setLocaleMessage(locale, msg)
      this.$i18n.locale = locale
      this.language = locale
    })
  }
}
</script>

<style lang="scss">
  .el-main {
    display: flex;
    justify-content: center;
  }
</style>
