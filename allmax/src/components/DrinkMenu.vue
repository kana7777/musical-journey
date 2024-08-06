<script setup>
import { ref } from 'vue'
import 'bootstrap'
 
const TempItem = ref([
  {
    id: '',
    name: '',
    info: '',
    price: '',
    count: ''
  }
])
const drinkList = ref([
  {
    id: 1,
    name: '珍珠奶茶',
    info: '香濃奶茶搭配QQ珍珠',
    price: 60,
    count: 20
  },
  {
    id: 2,
    name: '冬瓜檸檬',
    info: '清新冬瓜配上新鮮檸檬',
    price: 20,
    count: 20
  },
  {
    id: 3,
    name: '冬瓜檸檬',
    info: '清新冬瓜配上新鮮檸檬',
    price: 45,
    count: 20
  },
  {
    id:4,
    name: '翡翠檸檬',
    info: '綠茶與檸檬的完美結合',
    price: 40,
    count: 20
  },
  {
    id: 5,
    name: '四季春茶',
    info: '香醇四季春茶，回甘無比',
    price: 40,
    count: 20
  },
  {
    id:6,
    name: '阿薩姆奶茶',
    info: '阿薩姆紅茶搭配香醇鮮奶',
    price: 50,
    count: 20
  },
  {
    id:7,
    name: '檸檬冰茶',
    info: '檸檬與冰茶的清新組合',
    price: 45,
    count: 20
  },
  {
    id:8,
    name: '芒果綠茶',
    info: '芒果與綠茶的獨特風味',
    price: 55,
    count: 20
  },
  {
    id:9,
    name: '抹茶拿鐵',
    info: '抹茶與鮮奶的絕配',
    price: 85,
    count: 18
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
const editTempItem = (item,index) => {
  TempItem.value = { ...item }
  //console.log(TempItem.value)
  isEditing.value = true
  TempItem.value.index = index
}

const deleteItem = (item) => {
  //console.log('item', item)
  const index = drinkList.value.findIndex((del) => del.id === item.id)
  //console.log(index)
  drinkList.value.splice(index, 1)
}
const editDone = () => {
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
    <h1 class="text-center m-5 ">Drink menu</h1>

    <form class="container h-100">
      <table class="table table-hover align-middle">
        <thead>
          <tr>
            <th scope="col" width="30%">品項</th>
            <th scope="col">說明</th>
            <th scope="col">價格</th>
            <th scope="col" width="15%" class="text-center">庫存</th> 
            <th scope="col">刪除</th>
          </tr>
        </thead>
        <tbody v-for="(item, index) in drinkList" :key="item.id">
          <tr :class="{ selected: TempItem.name === item.name }">
            <td>
              
              <span>{{ item.name }}</span>
              <button
                type="button"
                class="btn btn-sm ms-3 edit-btn bg-white"
                @click.prevent="editTempItem(item,index)"
                v-if="TempItem.index!==index"
              >Edit</button>
              
              <div class="input-group" v-else>
                <input type="text" class="form-control temp-text" v-model="TempItem.name">
                <button type="button" class="btn border bg-white btn-sm" @click.prevent="editDone">確定</button>
                <button type="button" class="btn border bg-white btn-sm" @click.prevent="cancelEdit">取消</button>
              </div>
             
              
            
            </td>
            <td>
              {{ item.info }}
            </td>
             
            <td>{{ item.price }}</td>
            <td>
              <div class="input-group ">
              <button type="button" class="btn btn-sm" @click.prevent="addCount(item)">+</button>
                <input class="form-control rounded-2 text-center" type="text" v-model="item.count" /> 
              <button
                type="button"
                class="btn btn-sm"
                @click.prevent="subtractCount(item)"
                :disabled="item.count <= 0">
                -
              </button>
            </div>
            </td>
             
            <td>
              <button
                type="button"
                class="btn btn-sm"
                @click.prevent="deleteItem(item)"
              >
              ❌
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      
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
.temp-text{
  color:#999;
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
.edit-btn{
  padding: 0 12px;
  border: 1px solid #ccc;
  border-radius: 50px;
  color: #888;
}
 
.edit-btn:hover{
  background: #fff;
  border: 1px solid #ccc;
}
</style>
