<template>
    <div class="m-1">
        <span class="text-success fw-bold">{{ day }}</span>
        <span class="mx-1">{{ month }}</span>
        <span class="fw-light">{{ yearDay }}</span>
    </div>
</template>
<script>
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

export default {
    props: {
        dateString: {
            type: String,
            required: true
        }
    },
    computed: {
        day() {
            const date = new Date(this.dateString)
            return date.getDate()
        },
        month() {
            const date = new Date(this.dateString)
            return months[date.getMonth()]
        },
        yearDay() {
            const date = new Date(this.dateString)
            return `${date.getFullYear()}, ${days[date.getDay()]}`
        }
    }
}
</script>
<style lang="scss" scoped>
span {
    font-size: 1em;
}
</style>