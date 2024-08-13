<template>
  <div class="bg-343">
  <nav class="navbar">
    <!-- <div class="logo">77</div> -->
    <!--  -->
    <input type="checkbox" id="menu-toggle" class="menu-toggle" />
    <!-- 手機版 -->
    <label for="menu-toggle" class="menu-icon">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </label>
    <!-- 桌面 -->
    <ul class="nav-links mb-0">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/DrinkMenu">Edit MenuList</router-link></li>

      <li><router-link to="/todo_list">Todo List <small>(Login Required)</small></router-link></li>
    </ul>
  </nav>
</div>
</template>

<style scoped>
.bg-343{
  background-color: #343a40;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #343a40;
  padding: 24px;
  margin-bottom: 16px;
  margin-top: 8px;
}

.logo {
  font-size: 24px;
  color: #ffffff;
}

.menu-toggle {
  display: none;
}

.menu-icon {
  display: none;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  width: 30px;
  height: 30px;
  align-items: center;
}

.bar {
  width: 100%;
  height: 3px;
  background-color: #ffffff;
  margin: 4px 0;
  transition: 0.4s;
  position: absolute;
  left: 0;
}

.bar:nth-child(1) {
  top: 0;
}

.bar:nth-child(2) {
  top: 38%;
  transform: translateY(-50%);
}

.bar:nth-child(3) {
  bottom: 0;
}
 
.menu-toggle:checked + .menu-icon .bar:nth-child(1) {
  transform: rotate(45deg);
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.menu-toggle:checked + .menu-icon .bar:nth-child(2) {
  opacity: 0;
}

.menu-toggle:checked + .menu-icon .bar:nth-child(3) {
  transform: rotate(-45deg);
  top: 50%;
  transform: translateY(-50%) rotate(-45deg);
}

.nav-links {
  list-style: none;
  display: flex;
  transition: max-height 0.3s ease-out;
  z-index: 100;
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
  text-decoration: none;
}

@media (max-width: 768px) {
  .nav-links {
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 70px;
    left: 0;
    background-color: #343a40;
    max-height: 0;
    overflow: hidden;
  }

  .nav-links li {
    margin-left: 0;
    
    text-align: center;
  }

  .menu-icon {
    display: flex;
  }

  
  .menu-toggle:checked ~ .nav-links {
    max-height: 300px; 
  }
}
.nav-links a {
  color: #ffffff;
  text-decoration: none; /* No underline by default */
  font-size: 16px;
  position: relative;
  transition: 0.3s ease;
}

.nav-links a:hover {
  opacity: .75;
  transition: 0.3s ease;
}
</style>
