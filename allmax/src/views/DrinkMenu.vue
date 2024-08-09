<script setup>
import { ref, computed } from 'vue'
import 'bootstrap'
import { Modal } from 'bootstrap'

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
 
])
const isEditing = ref(false)
const tempDeleteItem = ref(null)
const errorMessage = ref('')
const buttonText = computed(() => isExpanded.value ? '還是算了' : '新增品項')
 
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
const isExpanded = ref(false)
const newItem = ref({
  name: '',
  info: '',
  price: '',
  count: ''
})
const addItemToList = () => {
  if (!newItem.value.name || !newItem.value.info || !newItem.value.price || !newItem.value.count) {
    errorMessage.value = '欸欸...怎麼能空白啊？'
    return
  }
  errorMessage.value = ''
  drinkList.value.unshift({
    id: new Date().getTime(),
    ...newItem.value
  })
  newItem.value = {
    name: '',
    info: '',
    price: '',
    count: ''
  }
  isExpanded.value = false 
}
const toggleCollapse = () => {
  isExpanded.value = !isExpanded.value
}

const openDeleteModal = (item) => {
  tempDeleteItem.value = item
}
const deleteItem = (item) => {
  //console.log('item', item)
  const index = drinkList.value.findIndex((currenItem) => currenItem.id === item.id)
  //console.log(index)
  drinkList.value.splice(index, 1)


  // 關掉視窗
  const modalElement = document.getElementById('deleteModal')
  const modal = Modal.getInstance(modalElement) || new Modal(modalElement)
  modal.hide()

  // 清空刪除暫存
  tempDeleteItem.value = null;
  
 
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
  <div class="container">
    <div class="content">
      <div>
        <h1 class="text-center m-5 ">Drink menu Edit List</h1>
    
        <form class="container h-100">
          <div class="text-end">
            <button type="button" class="btn btn-outline-secondary"  @click.prevent="toggleCollapse"
            data-bs-toggle="collapse" href="#collapseExample" role="button" :aria-expanded="isExpanded.toString()" aria-controls="collapseExample">{{buttonText}}</button>
          </div>
          <div class="collapse my-3" id="collapseExample">
            <div class="card-body">
              <div class="d-flex row  align-items-end justify-content-center">
                <div class="col-md-3">
                   
                    <label for="">品項</label>
                    <input type="text" v-model="newItem.name" class="form-control"
                    :class="{'is-invalid': errorMessage && !newItem.name}" >
                     
                </div>
                <div class="col-md-3">
                   
                    <label for="">說明</label>
                    <input type="text" v-model="newItem.info" class="form-control"
                    :class="{'is-invalid': errorMessage && !newItem.info}">
                    
                </div>
                 <div class="col-md-2">
                   
                    <label for="">價格</label>
                    <input type="text" v-model="newItem.price" class="form-control"
                    :class="{'is-invalid': errorMessage && !newItem.price}">
                    
                </div>
                <div class="col-md-2">
                  <label for="">庫存</label>
                  <input type="text" v-model="newItem.count" class="form-control"
                  :class="{'is-invalid': errorMessage && !newItem.count}">
                </div>
                <div class="col-md-2 d-flex justify-content-center">
                  <button type="button" class="btn btn-outline-secondary px-5" @click.prevent="addItemToList">加入品項</button>
                </div>
                <div v-if="errorMessage" class="text-danger mt-2">{{ errorMessage }}</div>
              </div>
             
            </div>
          </div>
          <table class="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col" width="50%">品項</th>
                 
                <th scope="col">價格</th>
                <th scope="col" width="15%" class="text-center">庫存</th> 
                <th scope="col" class="text-end">刪除</th>
              </tr>
            </thead>
            <tbody v-for="(item, index) in drinkList" :key="item.id">
              <tr :class="{ selected: TempItem.name === item.name }">
                <td>
                  
                  <span class="fw-bold">{{ item.name }}</span>
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
                 
                  <div class="mt-1">
                    <small class="opacity-50 ">{{ item.info }}</small>
                  </div>
                  
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
                 
                <td class="text-end"> 
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-danger delete-btn"
                   @click.prevent="openDeleteModal(item)"
                    data-bs-toggle="modal" data-bs-target="#deleteModal"
                  >Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          
        </form>
        <!-- Modal -->
    <div class="modal fade " id="deleteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">刪除品項</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body"  >
           確定要刪除嗎
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger"  @click.prevent="deleteItem(tempDeleteItem)">刪掉</button>
          </div>
        </div>
      </div>
    </div>
    
      </div>
    </div>
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
.is-invalid {
  border-color: #dc3545;
}
.delete-btn{
  padding: 0 12px;
  border: 1px solid #ccc;
  border-radius: 50px;
  color: #888;
}
.delete-btn:hover{
  color: #fff;
  border: 1px solid #dc3545;
}
.grid-container {
  background: #333;
  display: grid;
  place-items: center;  
  height: 100vh;        
}

.content {
  text-align: center;    
}
</style>
