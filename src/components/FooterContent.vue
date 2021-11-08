<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>
   <div class="fixed-bottom bg-light" >
		<hr>
			<div class=" text-center  ">
			<!-- Grid container -->
			<div class="container p-0 pb-0">
			<!-- Section: Social media -->
			<section class="text-primary ">
				<!-- button 1 -->
				<a href="./nested/aboutUs.html" class="m-2 text-secondary  text-decoration-none btn-floating m-1"  role="button">
					<i class="text-primary">Que es 123hora?</i>
				</a>
				<!-- button 1 -->
				<a HREF="./nested/professionalAccess.html" class=" m-2  text-secondary  text-decoration-none btn-floating m-1"  role="button">
					<i class="text-primary text-decoration-none">Acceso Profesional</i>
				</a>
				<!-- button 1 -->
				<a HREF="./nested/register.html" class=" m-2  text-secondary  text-decoration-none btn-floating m-1"  role="button">
					<i class="text-primary text-decoration-none">Registrate</i>
				</a>
			
			</section>
			<!-- Section: Social media -->
			</div>
			<!-- Grid container -->
		
			<!-- Copyright 
			<div class="text-center p-1" style="background-color: rgba(0, 0, 0, 0.1);">
			123Hora.cl © 2021 
			</div>
			-->
			
			<!-- Copyright -->
		</div>


	</div>

</template>

<style scoped>

</style>

