<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>

    <div class="text-center pt-2 pb-0 text-dark bg-light ">
		<div class="display-4 "  > 
			<a HREF="/index.html" class="text-dark text-decoration-none"> 
			<i class="bi bi-arrow-left-square"></i> 
			123Hora  
			</a> 
		</div>
		<div class="text-muted">	Las mejores consultas privadas en un solo lugar
		</div>
		<hr>
	</div>

</template>

<style scoped>

</style>

