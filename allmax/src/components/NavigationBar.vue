<template>
    <nav class="navbar">
      <div class="logo">Logo</div>
      <ul class="nav-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/DrinkMenu">Edit MenuList</router-link></li>
        
        <li><router-link to="/orderDrink">Order</router-link></li>
        <li><router-link to="/logIn">login</router-link></li>
      </ul>
    </nav>
  </template>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #343a40;
    padding: 15px 30px;
  }
  
  .logo {
    font-size: 24px;
    color: #ffffff;
  }
  
  .nav-links {
    list-style: none;
    display: flex;
  }
  
  .nav-links li {
    margin-left: 20px;
  }
  
  .nav-links a {
    color: #ffffff;
    text-decoration: none;
    font-size: 16px;
  }
  
  .nav-links a:hover {
    text-decoration: underline;
  }
  </style>