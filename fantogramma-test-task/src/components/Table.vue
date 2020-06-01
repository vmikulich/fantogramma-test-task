<template>
  <el-container>
    <el-row>
      <el-col :span="24">
        <router-link
          tag="el-button"
          to="/"
        >
          Go to home
        </router-link>
        <router-link
          tag="el-button"
          to="/canvas"
        >
          Go to canvas
        </router-link>
      </el-col>
    </el-row>
    <div>
      <el-table
        :data="fruits">
        <el-table-column
          prop="key">
          <template slot="header">
            Keys
          </template>
        </el-table-column>
        <el-table-column
          prop="fruit">
          <template slot="header">
            Fruit
          </template>
        </el-table-column>
        <!-- <el-table-column
          align="right">
          <template slot="header">
            <el-input
              v-model="search"
              size="mini"
              placeholder="Type to search"/>
          </template> -->
          <!-- <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template> -->
        <!-- </el-table-column> -->
      </el-table>
      <!-- <table cellspacing="0">
        <tr>
          <th>Key</th>
          <th @click="fruitSorter">Fruits</th>
        </tr>
        <tr 
          v-for="line in fruits"
          :key="line.key"
        >
          <td>{{ line.key }}</td>
          <td>{{ line.fruit }}</td>
        </tr>
      </table> -->
    </div>
  </el-container>
</template>

<script lang="ts">
import { useStore } from 'vuex-simple';
import { Component, Vue } from 'vue-property-decorator'
import { Fruits } from '../store/fruits'


@Component
export default class Table extends Vue {

  public store: Fruits = useStore(this.$store)

  public sortedState = true

  mounted() {
    this.store.fetchFruits()
  }

  get fruits(): Array<object> {
    const fruits: object = this.store.getFruits
    const keys: string[] = Object.keys(fruits)
    const formatFruitsObject: Array<object> = []
    for (let i = 0; i < keys.length; i++) {
      const keyValue: string = keys[i]
      formatFruitsObject.push({key: keyValue, fruit: fruits[keyValue].fruit})
    }
    console.log(formatFruitsObject)
    return formatFruitsObject.sort((a: object, b: object) => {
      if (a['key'] > b['key']) {
          return 1;
      }

      if (a['key'] < b['key']) {
          return -1;
      }

      return 0;
    })
  }

  fruitSorter() {
    console.log('click')
    this.fruits.sort((a, b) => {
      if (a['key'] > b['key']) {
          return 1;
      }

      if (a['key'] < b['key']) {
          return -1;
      }

      return 0;
    })
  }
}
</script>

<style lang="scss" scoped>
  .el-container {
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    el-table {
      width: 100%;
      // display: flex;
      // justify-content: center;
    }
  }
</style>