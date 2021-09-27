<template>
    <el-empty :description="description"></el-empty>
</template>

<script>
export default {
    name: "DataNotFound",
    props: {
        description: {
            default: 'Nessun Dato Disponibile'
        }
    }
}
</script>

<style scoped>

</style>
