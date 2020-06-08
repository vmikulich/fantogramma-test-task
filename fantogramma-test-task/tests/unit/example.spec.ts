import { shallowMount, RouterLinkStub, createLocalVue  } from '@vue/test-utils'
import Vuex from 'vuex'
import Button from '@/components/UI/Button.vue'
import Table from '@/components/TAble.vue'
import { useStore,  } from 'vuex-simple'
import { Store } from '@/store/store'
import store from '@/store/index'
import i18n from '@/i18n'
import { createVuexStore } from 'vuex-simple'



const localVue = createLocalVue()

localVue.use(Vuex)


describe('Button.vue', () => {

  it('is Vue instance', () => {
    const msg = 'go to home'
    const wrapper = shallowMount(Button, {
      propsData: { msg },
      stubs: ['router-link', 'el-button']
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('renders the button name', () => {
    const msg = 'go to home'
    const wrapper = shallowMount(Button, {
      propsData: { msg },
      stubs: ['router-link', 'el-button']
    })
    expect(wrapper.html()).toContain(msg)
  })
})

// describe('Table.vue', () => {

//   let actions: any
//   let store: any

//   beforeEach(() => {
//     actions = {
//       fetchFruits: jest.fn(),
//     }
//     const instance = new Store
//     store = createVuexStore(instance, {
//       strict: false,
//       modules: {actions},
//       plugins: []
//     })
//   })

//   it('fruits array has a correct structure', () => {
//     const expected = [
//       {
//         id: 22,
//         key: 'key22',
//         fruit: 'Cherries'
//       },
//       {
//         id: 1,
//         key: 'key1',
//         fruit: 'Orange'
//       },
//       {
//         id: 100,
//         key: 'key100',
//         fruit: 'Apple'
//       },
//       {
//         id: 4,
//         key: 'key4',
//         fruit: 'Guava'
//       },
//     ]
//     const wrapper: any = shallowMount(Table, {
//       stubs: ['router-link', 'el-container', 'el-row', 'el-col', 'el-table','el-table-column'],
//       store,
//       localVue,
//       i18n
//     })
//     expect(store.fruits.fetchFruits()).toHaveBeenCalled()
//   })
// })


