<template>
    <Navbar />
    <div v-if="isLoading" class="d-flex justify-content-center align-items-center vh-100">
        <div class="spinner-grow text-primary"
             role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>

    <div v-else class="d-flex">
        <div class="col-3">
            <EntryList />
        </div>
        <div class="col">
            <router-view />
        </div>
    </div>
</template>
<script>
import { defineAsyncComponent } from 'vue'
import { mapActions, mapState } from 'vuex';

export default {
    components: {
        Navbar: defineAsyncComponent(() => import("@/modules/daybook/components/Navbar.vue")),
        EntryList: defineAsyncComponent(() => import("@/modules/daybook/components/EntryList.vue")),
    },
    methods: {
        ...mapActions('journal', ['loadEntries'])
    },
    created() {
        this.loadEntries()
    },
    computed: {
        ...mapState('journal', ['isLoading'])
    }
}
</script>
<style></style>