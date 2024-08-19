
<template>
    
    <div class="container mb-5">
        <div class="row">
            <!--菜單 -->
            <div class="col-md-4">
                <ul class="list-group">
                    <li v-for="drink in drinkData " :key="drink.id" 
                    class="list-group-item list-group-item-action"
                    @click.prevent="addCart(drink)"> 
                        <p class="d-flex justify-content-between w-100">
                            <span>{{drink.name}}</span>
                            <span> ${{ drink.price }}</span>
                        </p>
                        <span><small>{{drink.description}}</small></span>
                    </li> 
                </ul>
            </div>
            <!-- 加入的品項 -->
            <div class="col-md-8">
                
                <div class="cart-container"> 
                    <div class="cart h-100" :class="{ 'cart-empty': cart.length === 0 }">
                        <table class="table table-hover align-middle" >
                            <thead>
                                <tr>
                                    <th scope="col" align="center">品項</th>
                                    <th scope="col">甜度</th>
                                    <th scope="col">冰塊</th>
                                    <th scope="col" width="90">數量</th>
                                    <th scope="col">單價</th>
                                    <th scope="col">小計</th>
                                    <th scope="col" width="50">刪除</th>
                                </tr>
                            </thead>
                            <tbody  class="table-group-divider">
                                <tr v-for="drink in cart" :key="drink.id">
                                    <td>{{drink.name}}
                                        <div class="text">
                                            <small> {{drink.description}} </small>
                                        </div>
                                        
                                    </td>
                                    <td>
                                        <select class="form-select form-select-sm" v-model="drink.ice" @change="updateCart(drink)">
                                            <option v-for="option in iceOptions" :key="option" :value="option">
                                                {{ option }}
                                            </option>
                                        </select>
                                    </td>
                                    <td>
                                        <select class="form-select form-select-sm" v-model="drink.sugar" @change="updateCart(drink)">
                                            <option v-for="option in sugarOptions" :key="option" :value="option">
                                                {{ option }}
                                            </option>
                                        </select>
                                    </td>
                                    <td>
                                        <select class="form-select form-select-sm" v-model="drink.quantity"  @change="updateCart(drink)">
                                            <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                                        </select>
                                    </td>
                                    <td>
                                        $ {{drink.price}}
                                    </td>
                                    <td>
                                        $ {{ drink.price* drink.quantity}}
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-sm" @click="removeFromCart(drink.id)">
                                            ❌
                                        </button>
                                    </td>
                                </tr>
                                
                            </tbody>
                            
                        </table>
                    </div>
                    <div v-if="errorMessage" class="alert alert-danger" role="alert">
                        {{ errorMessage }}
                    </div>
                    <div class="cart-info" v-if="cart.length !== 0">
                        <div class="sum text-end mb-3"> 
                            訂單金額： $ <span class="text-primary fs-5 "> {{ sum }}</span>  
                        </div>
                        <div class="text-end">
                            <div class="form-floating">
                                <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 100px"
                                v-model="description"></textarea>
                                <label for="floatingTextarea2">備註</label>
                            </div>
                        </div>
                        <div class="text-center m-3">
                            <button type="button" class="w-50 btn btn-lg btn-secondary"
                            @click.prevent="createOrder"
                            >送出訂單</button>
                        </div>
                    </div>
                    <div v-if="cart.length === 0" class="text-center" >
                        <p>No items in the cart</p>
                    </div>
                </div>
                
            </div>
        </div>
        <!-- 送出訂單 -->
        <hr>
        <div v-if="!orderList.id" class="alert alert-secondary text-center" role="alert">
            尚未建立訂單
        </div>
        <div v-else class="card shadow-sm">
            <div class="card-body">
                <div class="text"> 訂單編號 {{ orderList.id}}</div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">品項</th>
                            <th scope="col">甜度</th>
                            <th scope="col">冰塊</th>
                            <th scope="col">數量</th>
                            <th scope="col">小計</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="drink in orderList.cart" :key="drink.id">
                            <td>{{ drink.name}}</td>
                            <td>{{ drink.ice }}</td>
                            <td>{{ drink.sugar }}</td>
                            <td>{{ drink.quantity}}</td>
                            <td>{{ itemSubtotal(drink) }}</td>
                            
                        </tr>
                    </tbody>
                </table>
                <div>
                    備註: <span> {{ orderList.description}}</span>
                </div>
                <div class="text-end">
                    <h5>總計: <span>{{ orderList.sum }} </span></h5>
                </div>
            </div>
        </div>
    </div>
    

</template>
<script setup>
import { ref,computed } from "vue";

const drinkData = [
  {
    "id": 1,
    "name": "珍珠奶茶",
    "description": "香濃奶茶搭配QQ珍珠",
    "price": 50,
    "ice": "",  
    "sugar": ""  
  },
  {
    "id": 2,
    "name": "冬瓜檸檬",
    "description": "清新冬瓜配上新鮮檸檬",
    "price": 45,
    "ice": "",  
    "sugar": ""    
  },
  {
    "id": 3,
    "name": "翡翠檸檬",
    "description": "綠茶與檸檬的完美結合",
    "price": 55,
    "ice": "",  
    "sugar": ""  
  },
  {
    "id": 4,
    "name": "四季春茶",
    "description": "香醇四季春茶，回甘無比",
    "price": 45,
    "ice": "",  
    "sugar": ""  
  },
  {
    "id": 5,
    "name": "阿薩姆奶茶",
    "description": "阿薩姆紅茶搭配香醇鮮奶",
    "price": 50,
    "ice": "",  
    "sugar": ""  
  },
  {
    "id": 6,
    "name": "檸檬冰茶",
    "description": "檸檬與冰茶的清新組合",
    "price": 45,
    "ice": "",  
    "sugar": ""  
  },
  {
    "id": 7,
    "name": "芒果綠茶",
    "description": "芒果與綠茶的獨特風味",
    "price": 55,
    "ice": "",  
    "sugar": ""  
  },
  {
    "id": 8,
    "name": "抹茶拿鐵",
    "description": "抹茶與鮮奶的絕配",
    "price": 60,
    "ice": "",  
    "sugar": ""  
  }
]

const iceOptions = [
    '正常', '少冰', '去冰'
];

const sugarOptions = [
    '正常', '少糖', '半糖', '微糖', '微微糖', '無糖'
];
const cart=ref([]);//定義購物車

const orderList = ref({}) // 加入購物車的物件

const description = ref('');//新增右邊購物車的備註

const errorMessage = ref('');


const addCart = (drink) => {
    cart.value.push({
    ...drink,
    id: new Date().getTime(),
    quantity: 1, 
    });
    
};

// 從購物車中移除飲料
const removeFromCart = (id) => {
    const index = cart.value.findIndex(drink => drink.id === id);
    if (index !== -1) {
    cart.value.splice(index, 1);
    }
};

//計算總金額
const sum = computed(() => {
    return cart.value.reduce((pre, next) => {
    return pre + next.price * next.quantity;
    }, 0);
});

//計算數量的變化更新購物車
const updateCart = (item) => {
    cart.value = cart.value.map((cartItem) => {
        if (cartItem.id === item.id) {
        cartItem.quantity = parseInt(item.quantity);
        cartItem.ice = item.ice;  
        cartItem.sugar = item.sugar;  
        }
        return cartItem;
    });
};
console.log('orderList',orderList.value);
const createOrder = () => {

    const orderCart = cart.value.map(item => ({
        ...item,
        ice: item.ice,  
        sugar: item.sugar 
        }));

    orderList.value = {
    id: new Date().getTime(),
    cart:  orderCart,
    description: description.value,
    sum: sum.value,
    };
    cart.value = [];
    description.value = '';
};

//
const itemSubtotal = (drink) =>{
    return drink.quantity * drink.price
}

</script>
<style scoped>
</style>