<template>
    <div>
        <el-form ref="form" :model="expense" label-width="120px">
            <el-form-item label="Nome">
                <el-input placeholder="Nome Spesa" v-model="expense.name"></el-input>
            </el-form-item>
            <el-form-item label="Totale Spesa">
                <el-input placeholder="Totale" v-model="expense.amount"></el-input>
            </el-form-item>
            <el-form-item label="Settimane di competenza">
                <el-input placeholder="Settimane di competenza" v-model="expense.total_weeks_competence"></el-input>
            </el-form-item>
            <el-form-item label="Categoria">
                <el-select v-model="expense.category_id" class="w-100">
                    <el-option
                        v-for="category in categories"
                        :key="category.id"
                        :label="category.name"
                        :value="category.id"
                    >{{ category.name }}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Budget">
                <el-select v-model="expense.budget_id" class="w-100">
                    <el-option
                        v-for="budget in budgets"
                        :key="budget.id"
                        :label="budget.name"
                        :value="budget.id"
                    >{{ budget.name }}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Data">
                <el-date-picker
                    v-model="expense.date"
                    type="date"
                    align="right"
                    class="w-100">
                </el-date-picker>
            </el-form-item>
            <el-form-item class="text-right">
                <el-button type="text">Cancel</el-button>
                <el-button type="primary" @click="storeExpense" :loading="primaryLoading">Salva</el-button>
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
            expense: {
                name: '',
                amount: 0,
                total_weeks_competence: 1,
                date: this.$moment().format('YYYY-MM-DD'),
                category_id: '',
                budget_id: '',
            },
            categories: []
        }
    },
    computed: {
        ...mapGetters({
            primaryLoading: 'app/getPrimaryLoading',
            budgets: 'app/getBudgets'
        }),
    },
    mounted() {
      this.setBudgets();
      this.getCategories();
    },
    methods: {
        ...mapActions({
            setPrimaryLoading: 'app/setPrimaryloading',
            setBudgets: 'app/setBudgets'
        }),
        getCategories() {
          this.$http.get('/api/categories')
            .then(({data}) => {
                this.categories = data;
            })
        },
        storeExpense() {
            this.setPrimaryLoading(true);
            this.expense.date = this.$moment(this.expense.date).format('YYYY-MM-DD');
            this.$http.post('/api/expense', this.expense)
                .then(() => {
                    this.$message.success('Spesa Inserita Con Successo!');
                    this.expense = {
                        name: '',
                        amount: 0,
                        total_weeks_competence: 1,
                        date: this.$moment().format('YYYY-MM-DD'),
                        category_id: '',
                        budget_id: '',
                    };
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
