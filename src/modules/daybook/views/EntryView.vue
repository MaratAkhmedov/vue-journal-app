<template>
    <template v-if="entry">
        <div class="entry-title d-flex justify-content-between p-2">
            <div class="fs-3">
                <EntryDate :dateString="entry.date" />
            </div>
            <div>
                <button class="btn btn-danger mx-2">
                    Borrar
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button class="btn btn-primary">
                    Subir foto
                    <i class="fa fa-upload"></i>
                </button>
            </div>
        </div>
        <hr>
        <div class="d-flex flex-column px-3 h-75">
            <textarea placeholder="¿Qué sucedio hoy?"
                      v-if="entry"
                      v-model="entry.text"></textarea>
        </div>
    </template>

    <Fab icon="fa-save" />

    <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
         alt="entry-picture"
         class="img-thumbnail">
</template>
<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters } from 'vuex'

export default {
    props: {
        id: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            data: null
        }
    },
    components: {
        Fab: defineAsyncComponent(() => import("@/modules/daybook/components/Fab.vue")),
        EntryDate: defineAsyncComponent(() => import("@/modules/daybook/components/EntryDate.vue")),
    },
    methods: {
        loadEntry() {
            const entry = this.getEntryById(this.id)

            if (!entry) {
                return this.$router.push({ name: 'daybook-no-entry' })
            }
            this.entry = entry

        }
    },
    computed: {
        ...mapGetters('journal', ['getEntryById'])
    },
    created() {
        this.loadEntry();

        //console.log(this.id);
    },
    watch: {
        id() {
            this.loadEntry();
        }
    }
}
</script>

<style lang="scss" scoped>
textarea {
    font-size: 20px;
    border: none;
    height: 100%;

    &:focus {
        outline: none;
    }
}

img {
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px rgba($color: #000000, $alpha: 0.03);
}
</style>