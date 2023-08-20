<template>
    <template v-if="entry">
        <div class="entry-title d-flex justify-content-between p-2">
            <div class="fs-3">
                <EntryDate :dateString="entry.date" />
            </div>
            <div>
                <button v-if="id !== 'new'"
                        class="btn btn-danger mx-2"
                        @click="onDeleteEntry">
                    Borrar
                    <i class="fa fa-trash-alt"></i>
                </button>

                <button class="btn btn-primary"
                        @click="onSelectImage">
                    Subir foto
                    <i class="fa fa-upload"></i>
                </button>
                <input type="file"
                       @change="onSelectedImage"
                       ref="imageSelector"
                       v-show="false"
                       accept="image/png, image/jpeg, image/jpg">
            </div>
        </div>
        <hr>
        <div class="d-flex flex-column px-3 h-75">
            <textarea placeholder="¿Qué sucedio hoy?"
                      v-if="entry"
                      v-model="entry.text"></textarea>
        </div>
    </template>

    <Fab icon="fa-save"
         @on:click="saveEntry" />

    <!-- <img v-if="entry.picture && !localImage"
         :src="entry.picture"
         alt="entry-picture"
         class="img-thumbnail"> -->
    <img v-if="localImage || entry.picture"
         :src="localImage || entry.picture"
         alt="entry-picture"
         class="img-thumbnail">
</template>
<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters, mapActions } from 'vuex'
import Swal from 'sweetalert2'
import uploadImage from '@/helpers/uploadImage'

export default {
    props: {
        id: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            entry: null,
            localImage: null,
            file: null
        }
    },
    components: {
        Fab: defineAsyncComponent(() => import("@/modules/daybook/components/Fab.vue")),
        EntryDate: defineAsyncComponent(() => import("@/modules/daybook/components/EntryDate.vue")),
    },
    methods: {
        loadEntry() {
            this.localImage = null;     // empty previously created image
            this.file = null;     // empty previously created image

            let entry;
            if (this.id === 'new') {
                entry = {
                    text: '',
                    date: new Date().toDateString()
                }
            } else {
                entry = this.getEntryById(this.id)                
                if (!entry) return this.$router.push({ name: 'daybook-no-entry' })
            }

            this.entry = entry

        },
        async saveEntry() {

            new Swal({
                title: 'Espere por favor',
                allowOutsideClick: false,
            })
            Swal.showLoading()

            if(this.localImage) {
                const picture = await uploadImage(this.file)
                this.entry.picture = picture
            }

            if (this.entry.id) {
                console.log('this.entry', this.entry);
                
                await this.updateEntry(this.entry)
            } else {
                const id = await this.createEntry(this.entry)
                this.$router.push({ name: 'daybook-entry', params: { id } })
            }
            //this.file = null
            Swal.fire('Guardado', 'Entrada registrada con éxito', 'success')
        },
        async onDeleteEntry() {

            const { isConfirmed } = await Swal.fire({
                title: '¿Está seguro?',
                text: 'Una vez borrado, no se puede recuperar',
                showDenyButton: true,
                confirmButtonText: 'Si, estoy seguro'
            })
            if (!isConfirmed) return

            this.deleteEntry(this.entry.id)
            this.$router.push({ name: 'daybook-no-entry' })
        },
        onSelectedImage(event) {
            const file = event.target.files[0]

            if (!file) {
                this.localImage = null
                this.file = file
                return
            }

            this.file = file

            const fr = new FileReader()
            fr.onload = () => this.localImage = fr.result
            fr.readAsDataURL(file)
        },
        onSelectImage() {
            this.$refs.imageSelector.click()
        },
        ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry'])
    },
    computed: {
        ...mapGetters('journal', ['getEntryById'])
    },
    created() {        
        this.loadEntry();
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