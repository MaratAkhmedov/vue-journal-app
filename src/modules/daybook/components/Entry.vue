<template>
    <div class="entry-container mb-3 pointer p-2">

        <!-- Title -->
        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">15</span>
            <span class="mx-1 fs-5">Julio</span>
            <span class="mx-2 fw-light">2021, jueves</span>
        </div>

        <div class="entry-description">
            Minim anim ullamco exercitation aliquip consectetur duis veniam labore magna consequat cillum excepteur mollit. Sit consectetur adipisicing qui velit Lorem exercitation consectetur ea eu dolore fugiat. Labore elit esse non Lorem officia velit nisi. Officia pariatur ut labore consequat. Reprehenderit aliquip voluptate deserunt incididunt aliquip.
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="scss">
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