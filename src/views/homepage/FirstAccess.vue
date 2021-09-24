<template>
    <div>
        <el-dialog
            title="Benvenuto su BudgetMonitoring"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            :show-close="false"
            width="40%">
            <span>Seleziona il tuo budget iniziale e la valuta</span>

            <add-budget
                class="mt-4"
                @budgetInserted="budgetInserted"
            ></add-budget>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: "FirstAccess",
    data() {
        return {
            dialogVisible: true
        };
    },
    computed: {
      ...mapGetters({
            'user': 'auth/getUser'
        })
    },
    methods: {
        ...mapActions({
            setFirstAccess: "auth/setFirstAccess"
        }),
        budgetInserted() {
            this.$http.put(`api/user/${this.user.id}`, {
                first_access: false
            })
            .then(() => {
                this.setFirstAccess();
                this.$router.push({name: 'homepage'});
            })
            .catch(() => {
                console.log('ggggg');
            })
        }
    }
}
</script>

<style scoped>

</style>
