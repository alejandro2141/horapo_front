<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>

    <div class="mt-5 mb-5 text-center pb-5 " >

		<a  HREF='./nested/publicSearch.html'  type="button" class="btn btn-primary text-white btn-lg m-2">&nbsp;&nbsp;&nbsp; Buscar una Hora &nbsp;&nbsp;</a>
		<a HREF="./nested/getAppointments.html"  type="button" class="btn btn-success btn-lg text-white m-2">Consultar mis Horas</a>

	</div>


</template>

<style scoped>

</style>

