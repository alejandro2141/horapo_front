<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>

    <div class="text-left m-2 pb-0 text-dark bg-light">
		<div class="display-6 "  > 
			<a HREF="/index.html" class="text-primary text-decoration-none"> 
			<i class="bi bi-arrow-left-square"></i> 
			Salir
			</a> 
		</div>
		<div class="text-muted">	
		</div>
		<hr>
	</div>

</template>

<style scoped>

</style>

