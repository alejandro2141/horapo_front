<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})

const count = ref(0)
</script>

<template>

	<div class="fixed-bottom">

    <div  class="d-flex justify-content-between  mt-0 pt-0 bg-dark p-2"> 

      <text class="">
			<a href="/nested/aboutUs.html" class="m-1   text-decoration-none btn-floating "  role="button">
				&nbsp;&nbsp;&nbsp;&nbsp;	<i class="text-white  text-decoration-none">123hora?</i>
			</a>
	  </text>

      <text class="">
			<a HREF="/nested/professionalAccess.html" class=" m-1  text-decoration-none btn-floating "  role="button">
					<i class="text-white text-decoration-none">Profesionales</i>
			</a>
	  </text>

	  <text>
			<a HREF="/nested/register.html" class=" text-decoration-none btn-floating m-1"  role="button">
					<i class="text-white text-decoration-none">Registrate</i>&nbsp;&nbsp;&nbsp;&nbsp;
			</a>
	  </text>


<!--
      <a HREF="/nested/getAppointments.html"  style="text-decoration: none;" class=" fw-lighter">
-->
	

    </div>

	</div>


<!--
   <div class="fixed-bottom bg-light" >
		
			<div class=" text-center  ">
			
			<div class="container p-0 pb-0">
			<section class="d-flex justify-content-between ">

				<a href="/nested/aboutUs.html" class="m-1 text-secondary   text-decoration-none btn-floating "  role="button">
				&nbsp;&nbsp;&nbsp;&nbsp;	<i class="text-primary">123hora?</i>
				</a>
		
				<a HREF="/nested/professionalAccess.html" class=" m-1  text-secondary  text-decoration-none btn-floating "  role="button">
					<i class="text-primary text-decoration-none">Profesionales</i>
				</a>
				<a HREF="/nested/register.html" class="text-secondary  text-decoration-none btn-floating m-1"  role="button">
					<i class="text-primary text-decoration-none">Registrate</i>&nbsp;&nbsp;&nbsp;&nbsp;
				</a>
			
			</section>
			
			</div>
		
		</div>


	</div>
-->
</template>

<style scoped>

</style>

