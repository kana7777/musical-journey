<script setup>
import { defineProps } from 'vue'
defineProps(['order-list'])

const itemSubtotal = (drink) =>{
    return drink.quantity * drink.price
}
</script>
<template>
    <hr> 
        <div class="container">
            
            <div class="row  d-flex justify-content-center">
                <div class="col-md-6">
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
            </div>
        </div>
        
    
</template>
<style scoped>

</style>