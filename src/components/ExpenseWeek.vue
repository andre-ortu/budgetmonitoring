<template>
    <div>
        <el-card class="p-2" style="margin-bottom: 1rem">
            <h2>Riepilogo Budget e Spese</h2>
            <el-table
                :data="totalExpenses"
                border
                style="margin-bottom: 1rem"
                show-summary
                :summary-method="getRemainingBudget"
            >
                <el-table-column
                    label=""
                    prop="description"
                ></el-table-column>
                <el-table-column
                    v-for="(total, key) in totalExpensesColumns"
                    :key="key"
                    :label="'Settimana ' + (key + 1)"
                    :prop="'Settimana' + (key + 1)">
                </el-table-column>

            </el-table>
        </el-card>

        <el-row :gutter="20">
            <el-col :md="24" v-for="(expense, key) in expensesWeek.dates" :key="key" style="margin-bottom: 20px">
                <el-card style="margin-bottom: 1rem">
                    <p class="cardTitle">Settimana {{ key + 1 }}: {{ expense }}</p>
                    <div>
                        <el-table
                            :data="expensesWeek.expenses[key]"
                            border
                            show-summary
                            :summary-method="getSummaries"
                            style="width: 100%">
                            <el-table-column
                                label="Name"
                                prop="name">
                            </el-table-column>
                            <el-table-column
                                label="Spesa Totale"
                                prop="amount">
                                <template slot-scope="scope">
                                    € {{ scope.row.amount }}
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="Durata"
                                prop="total_weeks_competence">
                            </el-table-column>
                            <el-table-column
                                label="Competenza settimana"
                                prop="amount_competence">
                                <template slot-scope="scope">
                                    € {{ scope.row.amount_competence }}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>
<script>
export default {
    name: 'expense-week',
    props: {
        budget: {
            required: true
        }
    },
    data() {
        return {
            expensesWeek: [],
            totalExpenses: []
        }
    },
    mounted() {
        this.getExpensesWeek();
    },
    computed: {
        totalExpensesColumns() {
            if(this.totalExpenses.length) {
                let columns = Object.keys(this.totalExpenses[0]);
                columns.shift();
                return columns;
            }
            return []
        }
    },
    methods: {
        setTotalExpenses() {
            console.log('asd');
            let budget = {
                'description': 'Budget'
            };
            let expenses = {
                'description': 'Spese'
            };
            this.expensesWeek.budget.forEach((b, key) => {
                budget['Settimana'  + (key + 1)] = b;
            });
            this.expensesWeek.totalExpenses.forEach((totalExpenses, key) => {
                expenses['Settimana'  + (key + 1)] = totalExpenses;
            });
            this.totalExpenses = [
                budget,
                expenses
            ]
        },
        getExpensesWeek() {
            this.$http.get(`/api/dashboard/week/expenses/${this.budget.id}`)
                .then(({data}) => {
                    this.expensesWeek = data;
                    this.setTotalExpenses();
                })
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                switch(index) {
                    case 0: sums[index] = 'Totale'; break;
                    case 2: sums[index] = '--'; break;
                    default: {
                        const values = data.map(item => Number(item[column.property]));
                        if (!values.every(value => isNaN(value))) {
                            sums[index] = '€ ' + values.reduce((prev, curr) => {
                                const value = Number(curr);
                                if (!isNaN(value)) {
                                    return prev + curr;
                                } else {
                                    return prev;
                                }
                            }, 0);
                        } else {
                            sums[index] = 'N/A';
                        }
                    }
                }

            });

            return sums;
        },
        getRemainingBudget(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                switch(index) {
                    case 0: sums[index] = 'Totale'; break;
                    default: {
                        const values = data.map(item => Number(item[column.property]));
                        if (!values.every(value => isNaN(value))) {
                            sums[index] = '€ ' + values.reduce((prev, curr) => {
                                const value = Number(curr);
                                if (!isNaN(value)) {
                                    return prev - curr;
                                } else {
                                    return prev;
                                }
                            });
                        } else {
                            sums[index] = 'N/A';
                        }
                    }
                }

            });

            return sums;
        }
    }
}
</script>

<style scoped>
    .cardTitle {
        font-size: 1.2rem;
        font-weight: bold;
    }
</style>
