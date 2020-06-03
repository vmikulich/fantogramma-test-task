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
    <div class="table-container">
      <el-table
        :data="fruitsSortHandle"
        border
      >
        <el-table-column
          prop="key">
          <template 
            slot="header"
          >
            <p 
              @click="fruitSorter('id')"
              :class="backgroundColorTh ? 'increasing-order' : 'descending-order'"
            >
              Keys</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="fruit">
          <template slot="header">
            <p 
              @click="fruitSorter('fruit')"
              :class="backgroundColorTh ? 'increasing-order' : 'descending-order'"
            >Fruit</p>        
          </template>
        </el-table-column>
      </el-table>
    </div>
    <p :class="backgroundColorTh ? 'increasing-order' : 'descending-order'">{{this.sortedState}}</p>
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
export default class Table extends Vue {

  private store: Store = useStore(this.$store)
  private fieldToSort = 'id'
  private sortedState = true


  mounted() {
    this.store.fruits.fetchFruits()
  }

  get fruits(): Array<object> {
    const fruits: object = this.store.fruits.getFruits
    const keys: string[] = Object.keys(fruits)
    const formatFruitsObject: Array<object> = []
    for (let i = 0; i < keys.length; i++) {
      const keyValue: string = keys[i]
      const id: number = +keys[i].slice(3)
      formatFruitsObject.push({id: id, key: keyValue, fruit: fruits[keyValue].fruit})
    }
    return formatFruitsObject
  }

  get fruitsSortHandle(): Array<object> {
    const sortedFruits = this.fruits
    const activeField = this.fieldToSort
    if (this.sortedState) {
      sortedFruits.sort((a: object, b: object) => {
        if (a[activeField] > b[activeField]) {
          return 1
        }
        if (a[activeField] < b[activeField]) {
          return -1
        }
        return 0
      })
    } else {
      sortedFruits.sort((a: object, b: object) => {
        if (a[activeField] > b[activeField]) {
          return -1
        }
        if (a[activeField] < b[activeField]) {
          return 1
        }
        return 0
      })
    }
    return sortedFruits
  }

  get backgroundColorTh(): boolean {
    return this.sortedState
  }

  fruitSorter(field: string) {
    if (this.fieldToSort !== field) {
      this.fieldToSort = field
    } else {
      this.fieldToSort = field
      this.sortedState = !this.sortedState
    }
  }

  fruitNameSorter() {
    this.fieldToSort = 'fruit'
    this.sortedState = !this.sortedState
  }
}
</script>

<style lang="scss" scoped>
  .el-container {
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    .table-container {
      width: 100%;
      display: flex;
      justify-content: center;
      .el-table {
        max-width: 60%;
        th {
          padding: 0;
          p {
            text-align: center;
            margin: 0;
            color: #fff;
          }
        }
      }
    }
  }

  .increasing-order {
    background-color: rgb(0, 153, 255);
  }

  .descending-order {
    background-color: rgb(15, 197, 55);
  }
</style>