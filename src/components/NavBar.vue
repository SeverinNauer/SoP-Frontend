<template>
    <div>
    <Menubar :model="items" />
    </div>
</template>

<script>
    export default {
        name: "NavBar",
        data(){
            return{
                items: [
                    {
                        label:'Home',
                        icon:'pi pi-home',
                        to: '/'
                    },
                    {
                        label:'Events',
                        icon:'pi pi-fw pi-calendar'
                    },
                    {
                        label:'Login',
                        icon:'pi pi-sign-in',
                        to: '/login'
                    }
                ]

            }
        }
    }
</script>

<style scoped>

</style>