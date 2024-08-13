<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const site = "https://todolist-api.hexschool.io";

const isSignUp = ref(false); //註冊/登入
const signUpEmail = ref("");
const signUpPassword = ref("");
const signUpName = ref("");
const messageSignUp = ref("");
const isSignedIn = ref(false); //是否已經登入
const checkUser = ref("");
const isSignUpSuccessful = ref(null);

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
      messageSignUp.value = "Registration Successful" + response.data.uid;
      isSignUpSuccessful.value = true;
    } else {
      messageSignUp.value = "Registration Fail " + response.data.message;
      isSignUpSuccessful.value = false;
    }
  } catch (error) {
    if (error.response) {
      console.log("Error Response:", error.response.data);
      messageSignUp.value = "Registration Fail  " + error.response.data.message;
    } else {
      messageSignUp.value = "Registration Fail  " + error.message;
    }
    isSignUpSuccessful.value = false;
    
  }
  // Clear the message after 5 seconds (5000 milliseconds)
  setTimeout(() => {
    messageSignUp.value = "";
    isSignUpSuccessful.value = null;
  }, 3000);
};

//登入
const emailSignIn = ref("");
const passwordSignIn = ref("");
const token = ref("");
const messageSignIn = ref("");
const isSignInInvalid =ref(true)
const signIn = async () => {
  // reset
  messageSignIn.value = "";

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

    //登入後立刻cookie
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.cookie = `hexschoolTodo=${token.value}; expires=${tomorrow.toUTCString()}`;

    // 立刻讀入 TodoList
    getTodo();
  } catch (error) {
    if (error.response && error.response.data) {
      const { message } = error.response.data;
      messageSignIn.value = `SignIn Failed: ${message}`;
      isSignInInvalid.value = false;
    } else {
      messageSignIn.value = "SignIn Failed";
      isSignInInvalid.value = false;
    }
  }
  setTimeout(() => {
    messageSignIn.value = ""; 
  }, 3000);
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
    messageCheckOut.value = "Verification Successful. UID: " + response.data.uid;
    checkUser.value = response.data.nickname;
    setTimeout(() => {
      messageCheckOut.value = "";
    }, 3000);
  } catch (error) {
    messageCheckOut.value = "Verification fail";
    setTimeout(() => {
      messageCheckOut.value = "";
    }, 3000);
  }
};

//登出

const tokenSignOut = ref("");
const MessageSignOut = ref("");

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
      isSignedIn.value = false;
    } else {
      MessageSignOut.value = "Signout Failed";
    }
  } catch (error) {
    tokenSignOut.value = "Signout Failed" + error.message;
  }
};

//TODO LIST
const todoList = ref({});
const newTodo = ref("");
const addTodo = async () => {
  if (!newTodo.value) return;

  //送出API準備的資料
  const todo = {
    content: newTodo.value,
  };
  await axios.post(`${site}/todos`, todo, {
    headers: {
      Authorization: token.value,
    },
  });
  newTodo.value = ""; //新增完就空值
  console.log("todo", todo);
  getTodo();
};

const getTodo = async () => {
  const response = await axios.get(`${site}/todos`, {
    headers: {
      Authorization: token.value,
    },
  });
  todoList.value = response.data.data; //把回應的資料寫入todoList中
};

//標示已完成的待辦事項
const toggleStatus = async (id) => {
  await axios.patch(
    `${site}/todos/${id}/toggle`,
    {},
    {
      headers: {
        Authorization: token.value,
      },
    }
  );
  getTodo();
};

//刪除待辦事項 使用axios的delete直接做
const deleteTodo = async (id) => {
  await axios.delete(`${site}/todos/${id}`, {
    headers: {
      Authorization: token.value,
    },
  });
  getTodo();
};

//編輯已加入的待辦事項

//宣告一個變數暫存要改的東西
const tempEditTodo = ref({});
const isEditing = ref({});

//按下編輯按鈕的功能
const startEditing = (id) => {
  isEditing.value[id] = true;
  tempEditTodo.value[id] = todoList.value.find((todo) => todo.id === id).content;
  //複製todoList目前的content到tempEditTodo中
};

//更新待辦事項
const updateTodoEdit = (id) => {
  const todoIndex = todoList.value.findIndex((todo) => todo.id === id);

  if (todoIndex !== -1 && tempEditTodo.value[id]) {
    //更新內容
    todoList.value[todoIndex].content = tempEditTodo.value[id];
    console.log("Updated todo:", todoList.value[todoIndex]);
    isEditing.value[id] = false;
  }
};
//取消編輯
const cancelEditing = (id) => {
  isEditing.value[id] = false;
  delete tempEditTodo.value[id];
};

const TodoToken = document.cookie
  .split("; ")
  .find((row) => row.startsWith("hexschoolTodo="))
  ?.split("=")[1];

onMounted(() => {
  if (TodoToken) {
    token.value = TodoToken;
    getTodo();
  }
});
</script>
<template>
  <div class="grid-container">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <!-- 註冊 -->
        <div></div>
        <div class="col-md-7 mb-4">
          <div class="card">
            <div class="card-body" v-if="!isSignedIn && isSignUp">
              <h1>Register</h1>
              <hr>
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
              <div
                  v-if="!isSignedIn && messageSignUp"
                  class="text-center alert my-3"
                  :class="{ 'alert-danger': isSignUpSuccessful === false, 'alert-success': isSignUpSuccessful === true }"
                >
                  {{ messageSignUp }}
                </div>
            </div>

            <div v-else-if="isSignedIn">
              <div class="card-body">
                <div>
                  <h3>hello! {{ checkUser }}</h3>
                  <div class="text-end">
                    <button
                      type="button"
                      class="btn btn-outline-secondary btn-sm me-3"
                      @click="checkOut"
                      v-if="isSignedIn"
                    >
                    Verify UID
                    </button>

                    <button
                      type="button"
                      class="btn  btn-outline-danger btn-sm"
                      @click.prevent="signOut"
                      v-if="isSignedIn"
                    >
                      Sign Out
                    </button>
                    <div class="text">{{ messageCheckOut }}</div>
                  </div>
                </div>
                <!-- list -->
                <div class="todo-list">
                  <label for="" class="form-label pe-3"> </label>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="write something ..."
                      v-model="newTodo"
                    />
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click.prevent="addTodo"
                    >
                      Add Task
                    </button>
                  </div>
                  <h3  class="mt-5">Todo List</h3>
                  <hr />
                  <div class="list-content">
                    <ul v-for="todo in todoList" :key="todo.id" class="list-group">
                      <li class="list-group-item border-0">
                        <div class="d-flex justify-content-between align-items-center">
                          <div class="form-check align-items-center">
                            <input
                              type="checkbox"
                              v-model="todo.status"
                              class="form-check-input"
                              @change="toggleStatus(todo.id)"
                            />
                            <label
                              class="form-check-label"
                              :class="{ 'todo-completed': todo.status }"
                              v-if="!isEditing[todo.id]"
                            >
                              {{ todo.content }}</label
                            >
                            <input
                              class="form-control form-control-sm"
                              v-if="isEditing[todo.id]"
                              type="text"
                              v-model="tempEditTodo[todo.id]"
                              @blur="updateTodoEdit(todo.id)"
                              @keyup.enter="updateTodoEdit(todo.id)"
                              placeholder="Edit todo"
                            />
                          </div>
                          <div class="btn-group">
                            <button
                              type="button"
                              class="btn"
                              @click.prevent="startEditing(todo.id)"
                              v-if="!isEditing[todo.id]"
                            >
                              <img src="@/assets/img/edit.png" alt="Edit" />
                            </button>
                            <button
                              class="btn btn-sm"
                              v-if="isEditing[todo.id]"
                              @click.prevent="cancelEditing(todo.id)"
                            >
                              <img
                                src="@/assets/img/CloseCircle.svg"
                                class="opacity-75"
                                alt="Edit"
                              />
                            </button>

                            <button
                              type="button"
                              class="btn"
                              @click.prevent="deleteTodo(todo.id)"
                            >
                              <img
                                src="@/assets/img/delete.svg"
                                class="opacity-75"
                                alt="Edit"
                              />
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="card-body" v-else-if="!isSignUp">
              <h1>Sign In</h1>
              <hr>
              <form>
                <div class="form-group">
                  <div class="mb-3">
                    <label for="signInEmail" class="form-label">email:</label>
                    <input
                      type="email"
                      id="signInEmail"
                      class="form-control"
                      v-model="emailSignIn"
                      :class="{ 'is-invalid': !isSignInInvalid }"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="signInPassword" class="form-label">password:</label>
                    <input
                      type="password"
                      id="signInPassword"
                      class="form-control"
                      v-model="passwordSignIn"
                       :class="{ 'is-invalid': !isSignInInvalid }"
                    />
                  </div>

                  <button
                    type="button"
                    class="btn btn-secondary w-100 btn-lg mt-3"
                    @click="signIn"
                  >
                    Sign In
                  </button>
                  <div
                    v-if="!isSignedIn && messageSignIn"
                    class="text-center alert alert-danger my-3"
                  >
                    {{ messageSignIn }}
                  </div>
                </div>
              </form>
            </div>
            <div class="switch mb-3 text-center" v-if="!isSignedIn">
              <a href="#" @click.prevent="isSignUp = false"> sign In </a>
              <span>|</span>
              <a href="#" @click.prevent="isSignUp = true"> Register </a>
            </div>
          </div>
        </div>

         
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
  place-items: center;
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
button img {
  width: 16px;
}
.todo-completed {
  text-decoration: line-through;
  color: gray;
}
</style>
