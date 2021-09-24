<template>
    <div>
        Spese
    </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: "Spese",
    mounted() {
        this.setDrawer({
            'show': true,
            'component': 'add-expense',
            'title': 'Aggiungi Spesa'
        });
    },
    methods: {
        ...mapActions({
            setDrawer: 'app/setDrawer',
        }),
    }
}
</script>

<style scoped>

</style>
