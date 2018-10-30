<template>
	<div>
  	<div class="m_header_bar">
			<router-link to="/user"  class="m_header_bar_back"><Icon type="ios-arrow-back"></Icon></router-link>
			<span class="m_header_bar_title">隐私政策  </span>
		</div>
	<Scroll><yszc></yszc></Scroll>
	</div>
</template>

<script>
	import Yszc from '@/components/Yszc'
	export default {
			data(){
				return {
				}
			},
        components:{
        	Yszc,
        }
       }
</script>

<style >

</style>