<script setup>
import { ref ,onMounted} from "vue";
import axios from 'axios'
 
</script>
<template>
    <div>
        <div class="content">

            <div class="signup-wrap">
                <h1>Signup</h1>
                <div class="card p-5 m-3">
                    <div class="input-group">
                        <label for="">email:</label>
                        <input type="text" v-modal="email">
                    </div>
                    <div class="input-group">
                        <label for="">password:</label>
                        <input type="text" v-modal="password">
                    </div>
                    <div class="input-group">
                        <label for="">Name:</label>
                        <input type="text" v-modal="Name">
                    </div>
                    <button type="button" class="btn btn-primary" @click.prevent="signUp">Sign Up</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style>


</style>