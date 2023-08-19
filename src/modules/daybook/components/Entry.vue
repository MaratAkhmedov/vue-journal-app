<template>
    <div class="entry-container mb-3 pointer p-2"
    @click="$router.push({name: 'daybook-entry', params: {id: entry.id}})">

        <!-- Title -->
        <div class="entry-title d-flex">
            <EntryDate :dateString="entry.date"/>
        </div>

        <div class="entry-description">
            <p>{{ shortText }}</p>
        </div>
    </div>
</template>

<script>
import EntryDate from './EntryDate.vue';

export default {
    props: {
        entry: {
            type: Object,
            required: true
        }
    },
    computed: {
        shortText() {
            return this.entry.text.length > 150
                ? this.entry.text.substring(0, 150) + "..."
                : this.entry.text;
        }
    },
    components: { EntryDate }
}
</script>
<style lang="scss" scoped>
    .entry-title{
        font-size: 16px;
    }
    .entry-container {
        border-bottom: 1px solid #2c3e50;
        transition: 0.2s all ease-in;

        &:hover {
            background-color: lighten($color: grey, $amount: 45);
            transition: 0.2s all ease-in;
        }
    }

    .entry-description{
        font-size: 12px;
    }
</style>