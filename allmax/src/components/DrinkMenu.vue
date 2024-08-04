<script setup>
import { ref } from 'vue'
import 'bootstrap'

const drinkList = ref([
  {
    id: 1,
    name: '珍珠奶茶',
    infomation: '香濃奶茶搭配QQ珍珠',
    price: '50',
    count: 20
  },
  {
    id: 2,
    name: '冬瓜檸檬',
    infomation: '清新冬瓜配上新鮮檸檬',
    price: '45',
    count: 20
  },
  {
    id: 2,
    name: '冬瓜檸檬',
    infomation: '清新冬瓜配上新鮮檸檬',
    price: '45',
    count: 20
  },
  {
    id: 2,
    name: '翡翠檸檬',
    infomation: '綠茶與檸檬的完美結合',
    price: '45',
    count: 20
  },
  {
    id: 2,
    name: '四季春茶',
    infomation: '香醇四季春茶，回甘無比',
    price: '45',
    count: 20
  },
  {
    id: 2,
    name: '阿薩姆奶茶',
    infomation: '阿薩姆紅茶搭配香醇鮮奶',
    price: '45',
    count: 20
  }
])

const addCount = async (item) => {
  item.count++
}
const subtractCount = async (item) => {
  item.count--
  if (item.count < 0) {
    item.count = 0
  }
}
// const editbutton = async (item) => {
//   item.name
// }
</script>

<template>
  <div>
    <h1>Drink menu</h1>

    <form>
      <table class="table">
        <thead>
          <tr>
            <th>品項</th>
            <th>說明</th>
            <th>價格</th>
            <th>庫存</th>
          </tr>
        </thead>
        <tbody v-for="item in drinkList" :key="item.id">
          <tr>
            <td>
              {{ item.name }} <span> <button type="button">edit</button></span>
            </td>
            <td>{{ item.infomation }}</td>
            <td>{{ item.price }}</td>
            <td>
              <button type="button" class="btn btn-sm" @click="addCount(item)">+</button>
              <span> <input class="num-input" type="text" v-model="item.count" /></span>
              <button type="button" class="btn btn-sm" @click="subtractCount(item)">-</button>
            </td>
            <td></td>
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
.num-input {
  width: 20%;
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
</style>
