export const budgetTypes = {
    data() {
        return {
            budgetTypes: []
        }
    },
    mounted() {
      this.retrieveCategories();
    },

    methods: {
        retrieveCategories() {
            this.$http.get('/api/budget-types')
                .then(({data}) => {
                    this.budgetTypes = data;
                })
        }
    }
}
