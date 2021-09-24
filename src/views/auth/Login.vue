<template>
<!--    <div id="login">-->
<!--        <div id="login-box">-->
<!--            <div class="d-flex">-->
<!--                <img style="margin-left: auto; margin-right: auto" :src="logo" alt="logo" height="200">-->
<!--            </div>-->
<!--            <el-form class="mt-2">-->
<!--                <el-input placeholder="Email" v-model="email" class="mt-2" type="text" @keyupenter="login"></el-input>-->
<!--                <el-input placeholder="Password" v-model="password" class="mt-2"  type="password" @keyupenter="login"></el-input>-->
<!--               <el-button type="primary" @click="login" class="w-100 mt-2" :loading="primaryLoading">Login</el-button>-->
<!--            </el-form>-->
<!--        </div>-->
<!--    </div>-->
    <div class="d-flex">
        <div style="background: rgb(0 102 255 / 38%)">
            <img :src="loginBackground" style="opacity: 0.5;">
        </div>
        <div class="d-flex p-3" >
            <div style="margin-top: 10rem; margin-bottom: auto">
                <div class="text-center">
                    Budget Monitoring
                </div>
                <div v-if="! showRegister">
                    <el-form class="mt-2">
                        <el-input placeholder="Email" v-model="loginForm.email" class="mt-2" type="text" @keyupenter="login"></el-input>
                        <el-input placeholder="Password" v-model="loginForm.password" class="mt-2"  type="password" @keyupenter="login"></el-input>
                        <el-button type="primary" @click="login" class="w-100 mt-2" :loading="primaryLoading">Login</el-button>
                    </el-form>
                    <div class="text-center">
                        <el-button class="text-center" type="text" @click="showRegister = true">Registrati!</el-button>
                    </div>
                </div>
                <div v-else>
                    <el-form class="mt-2">
                        <el-input placeholder="Nome" v-model="registerForm.name" class="mt-2" type="text" @keyupenter="register"></el-input>
                        <el-input placeholder="Cognome" v-model="registerForm.surname" class="mt-2" type="text" @keyupenter="register"></el-input>
                        <el-input placeholder="Email" v-model="registerForm.email" class="mt-2" type="text" @keyupenter="register"></el-input>
                        <el-input placeholder="Password" v-model="registerForm.password" class="mt-2"  type="password" @keyupenter="register"></el-input>
                        <el-input placeholder="Conferma Password" v-model="registerForm.password_confirmation" class="mt-2"  type="password" @keyupenter="register"></el-input>
                        <el-button type="primary" @click="register" class="w-100 mt-2" :loading="primaryLoading">Registrati</el-button>
                    </el-form>
                    <el-button class="text-center" type="text" @click="showRegister = false">Vai al login</el-button>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import { mapActions } from 'vuex'
import loginBackground from '@/assets/img/login.jpeg'
export default {
name: "Login",
    data() {
        return {
            loginForm: {
                email: '',
                password: '',
            },
            registerForm: {
                name: '',
                surname: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
            errors: false,
            loading: false,
            loginBackground: loginBackground,
            showRegister: false
        }
    },
    methods: {
        ...mapActions({
            signIn: 'auth/signIn',
        }),
        register() {
            this.$http.post('/register', this.registerForm)
                .then(() => {
                    this.showRegister = false;
                    this.$message.success('Registrazione andata a buon fine!');
                })
                .catch((err) => {
                    this.$message.error(err);
            })
        },
        async login () {
            this.setPrimaryLoading(true);
            this.errors = false;
            await this.signIn({
                email: this.loginForm.email,
                password: this.loginForm.password,
            })
                .then(() => {
                    this.$router.push({name: 'homepage'});
                })
                .catch(() => {
                    this.$message.error('Oops, this is a error message.');
                })
                .finally(() => {
                   this.setPrimaryLoading(false)
                })
        },
    }
}
</script>

<style scoped lang="scss">
    #login {
        display: flex;
        height: 100vh;
    }

    #login-box {
        margin: auto;
        background-color: white;
        padding: 2rem;
        border-radius: 4px;
        box-shadow: #929292;
    }
</style>
