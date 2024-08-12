<script setup>
import Navbar from './components/NavigationBar.vue'; 
</script>

<template>
  <div id="app">
    <Navbar />
    <div>
      <router-view />
    </div>
  </div>
</template>



<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

  
.grid-container {
  background: #333;
  display: grid;
  place-items: center;  
  height:100vh;
  overflow-y: hidden;  
}

.content {
  text-align: center;
  color: #ffe;    
}
/* 捲軸寬度及高度 */
::-webkit-scrollbar {
  width: 10px; /*右側捲軸寬度*/
  height: 10px; /*下方捲軸高度*/
  border-radius: 50px;
}
/* 軌道背景底色 */
::-webkit-scrollbar-track {
  background:#333; 
 
}
 
/* 滑桿顏色 */
::-webkit-scrollbar-thumb {
  background: #333; 
}
/* 滑桿滑鼠滑入時的顏色 */
::-webkit-scrollbar-thumb:hover {
  background: #666; 
 
}
/* 捲軸兩側頂端的按鈕 */
::-webkit-scrollbar-button {
  background-color: #333;
 
}
/* 捲軸兩側頂端的按鈕滑鼠滑入時的顏色 */
::-webkit-scrollbar-button:hover {
  background-color: #666;
}
</style>
