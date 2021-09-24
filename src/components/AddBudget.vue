<template>
    <div>
        <el-form ref="form" :model="budget" label-width="120px">
            <el-form-item label="Nome Budget">
                <el-input placeholder="Nome Budget" v-model="budget.name"></el-input>
            </el-form-item>
            <el-form-item label="Totale Budget">
                <el-input placeholder="Spesa" v-model="budget.amount"></el-input>
            </el-form-item>
            <el-form-item label="Categoria">
                <el-select v-model="budget.budget_type_id" class="w-100">
                    <el-option
                        v-for="budgetType in budgetTypes"
                        :key="budgetType.id"
                        :label="budgetType.name"
                        :value="budgetType.id"
                    >{{ budgetType.name }}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Data">
                <el-date-picker
                    v-model="budget.date"
                    type="daterange"
                    align="right"
                    class="w-100"
                    start-placeholder="Dal"
                    end-placeholder="al">
                </el-date-picker>
            </el-form-item>
            <el-form-item class="text-right">
                <el-button type="text">Cancel</el-button>
                <el-button type="primary" @click="storeBudget" :loading="primaryLoading">Salva</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { budgetTypes } from "@/mixins/picklist";
import {mapGetters, mapActions} from "vuex";

export default {
    name: "AddExpense",
    mixins: [budgetTypes],
    data() {
        return {
            budget: {
                name: '',
                amount: 0,
                date: [this.$moment().format('YYYY-MM-DD'), this.$moment().add(1, 'M').format('YYYY-MM-DD')],
                budget_type_id: ''
            }
        }
    },
    computed: {
        ...mapGetters({
            primaryLoading: 'app/getPrimaryLoading',
        }),
    },
    methods: {
        ...mapActions({
            setPrimaryLoading: 'app/setPrimaryloading',
        }),
        storeBudget() {
            this.setPrimaryLoading(true);
            this.budget.started_at = this.budget.date[0];
            this.budget.ended_at = this.budget.date[1];
            this.$http.post('/api/budget', this.budget)
                .then(() => {
                    this.$message.success('Budget Inserito Con Successo!');
                    this.$emit('budgetInserted');
                })
            .catch(() => {
                this.$message.error('Errore');
            })
            .finally(() => {
                this.setPrimaryLoading(false);
            })
        }
    }
}
</script>

<style scoped>

</style>
