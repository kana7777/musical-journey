<script setup>
import { ref } from "vue";
import axios from "axios";

const site = "https://todolist-api.hexschool.io";

const isSignUp = ref(false);
const signUpEmail = ref("");
const signUpPassword = ref("");
const signUpName = ref("");
const messageSignUp = ref("");
const isSignedIn = ref(false); //是否已經登入

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
  } catch (error) {
    token.value = "失敗";
  }
};

//驗證

const tokenCheck = ref("");
const messageCheckOut = ref("");
const checkUser = ref("");
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
  } catch (error) {
    messageCheckOut.value = "失敗";
  }
};

//登出
const tokenSignOut = ref("");
const MessageSignOut = ref("");
const signOut = async () => {
  try {
    const response = await axios.post(
      `${site}/users/sign_out`,
      {},
      {
        headers: {
          Authorization: token.value,
        },
      }
    );
    if (response.data.status) {
      MessageSignOut.value = response.data.message;
    } else {
      MessageSignOut.value = "登出失败";
    }
  } catch (error) {
    tokenSignOut.value = "登出錯誤: " + error.message;
  }
};
</script>
<template>
  <div class="grid-container">
    <div class="container">
      <button
        type="button"
        class="btn btn-secondary"
        @click.prevent="signOut"
        v-if="isSignedIn"
      >
        登出
      </button>
      <span>{{ MessageSignOut }}</span>
      <button type="button" class="btn btn-secondary" @click="checkOut" v-if="isSignedIn">
        驗證UID
      </button>
      <div class="text">{{ messageCheckOut }}</div>
      <div v-if="isSignedIn" class="text">哈囉！！{{ checkUser }}！！早安午安晚安</div>
      <div class="row d-flex justify-content-center">
        <!-- 註冊 -->
        <div></div>
        <div class="col-md-8 mb-4">
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
              <h2>歡迎回來！</h2>
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
              <div class="text">{{ token }}</div>
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
</style>
