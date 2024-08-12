<script setup>
import { ref } from "vue";
import axios from "axios";
const site = "https://todolist-api.hexschool.io";


const isSignUp = ref(false);//註冊/登入
const signUpEmail = ref("");
const signUpPassword = ref("");
const signUpName = ref("");
const messageSignUp = ref("");
const isSignedIn = ref(false); //是否已經登入
const checkUser = ref("");

const signUp = async () => {
  //收集送出資料
  const signUpData = {
    email: signUpEmail.value,
    password: signUpPassword.value,
    nickname: signUpName.value,
  };
  try {
    const response = await axios.post(`${site}/users/sign_up`, signUpData);
    if (response.data.status) {
      messageSignUp.value = "註冊成功" + response.data.uid;
    }
  } catch (error) {
    messageSignUp.value = "註冊失敗" + error.message;
  }
};

//登入
const emailSignIn = ref("");
const passwordSignIn = ref("");
const token = ref("");

const signIn = async () => {
  //收集將送出API的登入資料
  const SignInData = {
    email: emailSignIn.value,
    password: passwordSignIn.value, 
  };
  try {
    const response = await axios.post(`${site}/users/sign_in`, SignInData);
    token.value = response.data.token;
    isSignedIn.value = true;
    checkUser.value = response.data.nickname;
  } catch (error) {
    token.value = "失敗";
  }
};

//驗證

const tokenCheck = ref("");
const messageCheckOut = ref(""); 
const checkStatus = ref(false);

const checkOut = async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  document.cookie = `hexschoolTodo=${
    tokenCheck.value
  }; expires=${tomorrow.toUTCString()}`;

  try {
    const response = await axios.get(`${site}/users/checkout`, {
      headers: {
        Authorization: token.value,
      },
    });
    checkStatus.value = response.data.status;
    messageCheckOut.value = "驗證成功 UID: " + response.data.uid;
    checkUser.value = response.data.nickname;
    setTimeout(() => {
      messageCheckOut.value = "";  
    }, 3000); 
 
  } catch (error) {
    messageCheckOut.value = "失敗";
    setTimeout(() => {
      messageCheckOut.value = "";  
    }, 3000); 
  }
};
 
//登出
const showModal = ref(false);
const tokenSignOut = ref(""); 
const MessageSignOut = ref("");
const confirmSignOut = () => {
  signOut();
  showModal.value = false;
};
const signOut = async () => {
  try {
    const response = await axios.post(
      `${site}/users/sign_out`,
      {}, //data
      {
        headers: {
          Authorization: token.value,
        },
      }
    );
    if (response.data.status) {
      MessageSignOut.value = response.data.message;
      isSignedIn.value=false;
      
    } else {
      MessageSignOut.value = "登出失败";
    }
  } catch (error) {
    tokenSignOut.value = "登出錯誤: " + error.message;
  }
};

//TODO LIST
 
 
</script>
<template>
  <div class="grid-container">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <!-- 註冊 -->
        <div></div>
        <div class="col-md-6 mb-4">
          <div class="card">
            <div class="card-body" v-if="!isSignedIn && isSignUp">
              <h1>Register</h1>
              <div class="mb-3">
                <label for="SignupEmail" class="form-label">email:</label>
                <input
                  type="email"
                  id="SignupEmail"
                  class="form-control"
                  v-model="signUpEmail"
                />
              </div>
              <div class="mb-3">
                <label for="SignupPassword" class="form-label">password:</label>
                <input
                  type="password"
                  id="SignupPassword"
                  class="form-control"
                  v-model="signUpPassword"
                />
              </div>
              <div class="mb-3">
                <label for="signUpName" class="form-label">Name:</label>
                <input
                  type="text"
                  id="signUpName"
                  class="form-control"
                  v-model="signUpName"
                />
              </div>
              <button
                type="button"
                class="btn btn-secondary btn-lg w-100 mt-3"
                @click="signUp"
              >
                Register
              </button>
              <div class="text">{{ messageSignUp }}</div>
            </div>

            <div v-else-if="isSignedIn">
              <div class="card-body">
                <h2>歡迎回來！</h2>
                <div v-if="isSignedIn" class="text">哈囉！！{{ checkUser }}！！早安午安晚安</div>
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click.prevent="showModal = true"
                  v-if="isSignedIn"> 登出</button>
                
                <button type="button" class="btn btn-secondary" @click="checkOut" v-if="isSignedIn">
                  驗證UID
                </button>
                <div class="text">{{ messageCheckOut }}</div>

                <!-- list -->
                <div class="todo-list">
                  <label for="" class="form-label pe-3">  </label>
                  <div class="input-group"> 
                    <input type="text" class="form-control"   placeholder="enter your ...">
                    <button type="button" class="btn btn-primary"  >加入</button>
                  </div>
                  <hr>
                  <div class="addcontent">
                    <ul>
                      <li>
                        
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              
            </div>
            <div class="card-body" v-else-if="!isSignUp">
              <h1>Sign In</h1>
              <div class="mb-3">
                <label for="signInEmail" class="form-label">email:</label>
                <input
                  type="email"
                  id="signInEmail"
                  class="form-control"
                  v-model="emailSignIn"
                />
              </div>
              <div class="mb-3">
                <label for="signInPassword" class="form-label">password:</label>
                <input
                  type="password"
                  id="signInPassword"
                  class="form-control"
                  v-model="passwordSignIn"
                />
              </div>

              <button
                type="button"
                class="btn btn-secondary w-100 btn-lg mt-3"
                @click="signIn"
              >
                Sign In
              </button>
              <!-- <div class="text">{{ token }}</div> -->
            </div>
            <div class="switch mb-3 text-center" v-if="!isSignedIn">
              <a href="#" @click.prevent="isSignUp = false"> sign In </a>
              <span>|</span>
              <a href="#" @click.prevent="isSignUp = true"> Register </a>
            </div>
          </div>
        </div>

        <!-- 登入 -->

        <div>
          <!-- <button
            type="button"
            class="btn btn-primary radius"
            @click="isSignUp = !isSignUp"
          >
            {{ isSignUp ? "Sign In" : "JOIN NOW" }}
          </button> -->
        </div>
      </div>
    </div>
    <div v-if="showModal" class="modal" style="display: block; background-color: rgba(0, 0, 0, 0.5);">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">確認登出</h5>
            <button type="button" class="btn-close" @click="showModal = false"></button>
          </div>
          <div class="modal-body">
            您確定要登出嗎？
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showModal = false">取消</button>
            <button type="button" class="btn btn-primary" @click="confirmSignOut">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.container {
  padding-top: 5rem;
}
.grid-container {
  background: #333;
  display: grid;
  place-items: start end;
  height: 100vh;
}
.card-body {
  padding: 4rem;
}
.switch a {
  text-decoration: none;
}
.card {
  border-radius: 16px;
}
.toast {
  background-color: #333;
  color: white;
  padding: 16px;
  border-radius: 8px;
  opacity: 0.9;
  transition: opacity 0.5s ease;
}

.toast-body {
  font-size: 16px;
}
</style>
