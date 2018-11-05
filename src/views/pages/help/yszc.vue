<template>
	<div>
  	<div class="wap_header">
			<router-link to="/user"  ><Icon type="ios-arrow-back"></Icon>隐私政策</router-link>
		</div>
	<yszc class="pt44 plr15"></yszc>
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

<style  scoped="scoped">
.plr15{
	padding-left: 15px;
	padding-right: 15px;
}
</style>