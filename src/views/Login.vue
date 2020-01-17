<template>
    <div style="align-content: center">
        <span class="p-float-label">
	<InputText id="username" type="text" v-model="username"/>
	<label for="username">Username</label>
</span>
        <Password v-model="password"/>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                username: "",
                password: ""
            }
        }
    }
</script>

<style scoped>

</style>