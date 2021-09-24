<template>
    <div>
        Budget

    </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: "Budget",
    mounted() {
        this.setDrawer({
            'show': true,
            'component': 'add-budget',
            'title': 'Aggiungi Budget'
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
