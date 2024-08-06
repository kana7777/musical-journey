<script setup>
import { ref } from 'vue'
import 'bootstrap'
const TempItem = ref([
  {
    id: '',
    name: '',
    infomation: '',
    price: '',
    count: ''
  }
])
const drinkList = ref([
  {
    id: Date.now(),
    name: '珍珠奶茶',
    infomation: '香濃奶茶搭配QQ珍珠',
    price: '50',
    count: 20
  },
  {
    id: Date.now(),
    name: '冬瓜檸檬',
    infomation: '清新冬瓜配上新鮮檸檬',
    price: '45',
    count: 20
  },
  {
    id: Date.now(),
    name: '冬瓜檸檬',
    infomation: '清新冬瓜配上新鮮檸檬',
    price: '45',
    count: 20
  },
  {
    id: Date.now(),
    name: '翡翠檸檬',
    infomation: '綠茶與檸檬的完美結合',
    price: '45',
    count: 20
  },
  {
    id: Date.now(),
    name: '四季春茶',
    infomation: '香醇四季春茶，回甘無比',
    price: '45',
    count: 20
  },
  {
    id: Date.now(),
    name: '阿薩姆奶茶',
    infomation: '阿薩姆紅茶搭配香醇鮮奶',
    price: '45',
    count: 20
  }
])
const isEditing = ref(false)
const addCount = (item) => {
  item.count++
}
const subtractCount = (item) => {
  item.count--
  if (item.count < 0) {
    item.count = 0
  }
}
const editTempItem = (item) => {
  TempItem.value = { ...item }
  console.log(TempItem.value)
  isEditing.value = true
}

const deleteItem = (item) => {
  //console.log('item', item)
  const index = drinkList.value.findIndex((del) => del.id === item.id)
  //console.log(index)
  drinkList.value.splice(index, 1)
}
const editdone = () => {
  const index = drinkList.value.findIndex((del) => del.id === TempItem.value.id)
  drinkList.value[index] = TempItem.value
  TempItem.value = {}
  isEditing.value = false
}
const cancelEdit = () => {
  TempItem.value = {}
  isEditing.value = false
}
</script>

<template>
  <div>
    <h1 class="text-center">Drink menu</h1>

    <form class="container">
      <table class="table text-center table-hover">
        <thead>
          <tr>
            <th>品項</th>
            <th>說明</th>
            <th>價格</th>
            <th>庫存</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in drinkList" :key="item.id">
          <tr :class="{ selected: TempItem.name === item.name }">
            <td>
              {{ item.name }}
            </td>
            <td>{{ item.infomation }}</td>
            <td>{{ item.price }}</td>
            <td>
              <button type="button" class="btn btn-sm" @click.prevent="addCount(item)">+</button>
              <span> <input class="num-input" type="text" v-model="item.count" /></span>
              <button
                type="button"
                class="btn btn-sm"
                @click.prevent="subtractCount(item)"
                :disabled="item.count <= 0"
              >
                -
              </button>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-sm border me-3"
                @click.prevent="editTempItem(item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-sm btn-outline-danger"
                @click.prevent="deleteItem(item)"
              >
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="row">
        <div>
          <div class="edit d-flex gap-3 justify-content-center" v-if="isEditing">
            <input type="text" v-model="TempItem.name" placeholder="品項" />
            <input type="text" v-model="TempItem.infomation" placeholder="說明" />
            <input type="text" v-model="TempItem.price" placeholder="價格" />
            <input type="text" v-model="TempItem.count" placeholder="庫存" />
            <button type="button" class="btn border" @click.prevent="editdone">確定</button>
            <button type="button" class="btn border" @click.prevent="cancelEdit">取消</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}
.selected {
  background-color: #f0f0f0;
}
.num-input {
  text-align: center;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
.btn:disabled {
  border: 0;
  opacity: 0.3;
}
</style>
