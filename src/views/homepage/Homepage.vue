<template>
    <div>
        <div class="d-flex" style="justify-content: space-between">
            <div class="w-100">
                <el-form>
                    <el-form-item label="Budget">
                        <el-select v-model="budget">
                            <el-option
                                v-for="budget in budgets"
                                :key="budget.id"
                                :label="budget.name"
                                :value="budget.id"
                            >{{ budget.name }}</el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div>
                    <el-button type="primary" @click="addExpense">Aggiungi Spesa</el-button>
                </div>
            </div>
        </div>


        <hr>
            <el-row :gutter="20">
                <el-col :md="16">
                    <el-card>
                        Budget Diviso Per Settimana
                        <bar-chart v-if="show.chart" :d="chartdata"></bar-chart>
                    </el-card>
                </el-col>
                <el-col :md="8">
                    <el-card>
                        Ultime 10 spese
                        <div v-for="item in latest" :key="item.id">
                            <hr>
                            <div class="d-flex" style="justify-content: space-between; margin-top: auto; margin-bottom: auto">
                                <div>
                                    <span class="expenseName">{{ item.name}}</span><br>
                                    <span class="expenseCategory">{{ item.category.name }}</span>
                                </div>
                                <div class="expenseAmount">
                                    {{ item.amount }} €
                                </div>
                            </div>

                        </div>
                    </el-card>
                </el-col>
            </el-row>
    </div>

</template>

<script>
import BarChart from "@/components/BarChart";
import {mapActions, mapGetters} from "vuex";
export default {
    name: "Homepage",
    components: {BarChart},
    data() {
        return {
            budget: {},
            latest: [],
            chartdata: {},
            show: {
                chart: false
            }
        }
    },
    mounted() {
        this.setBudgets();
    },
    computed: {
        ...mapGetters({
            budgets: 'app/getBudgets'
        })
    },
    methods: {
        ...mapActions({
            setBudgets: 'app/setBudgets',
            setDrawer: 'app/setDrawer',
        }),
        getWeekBudget() {
            this.$http.get(`/api/dashboard/week/${this.budget.id}`)
                .then(({data}) => {
                    this.chartdata = data;
                    this.show.chart = true;
                })
        },
        getLatestExpenses() {
            this.$http.get(`/api/expense/latest/${this.budget.id}`)
                .then(({data}) => {
                    this.latest = data;
                })
        },
        addExpense() {
            this.setDrawer({
                'show': true,
                'component': 'add-expense',
                'title': 'Aggiungi Spesa'
            });
        }
    },
    watch: {
        budgets() {
            this.budget = this.budgets.length ? this.budgets[0] : {};
        },
        budget() {
            this.getWeekBudget();
            this.getLatestExpenses();
        }
    }
}
</script>

<style scoped lang="scss">
    .expenseName {
        font-size: 1.6rem;
    }

    .expenseCategory {
        font-size: 0.9rem;
        color: grey;
    }
    .expenseAmount {
        font-size: 2rem;
    }
</style>
