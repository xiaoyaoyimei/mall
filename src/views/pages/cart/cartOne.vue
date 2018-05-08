<template>
	<div class='cart1'>
		<app-shopping></app-shopping>
		
	</div>
</template>

<script>
import appShopping from '@/Subcomponent/shopping'
 export default {
        data () {
            return {
				// indeterminate: true,
                // checkAll: false,
				// checkAllGroup: [],
				// price:[{label:1,total:"730"},{label:2,total:'730'},{label:3,total:'730'}],
				// totalPrice:0,
				// isActive:false,
				// hasError:true,
            }
		},
		components:{
			appShopping
		},
    }
</script>

<style scoped="scoped" lang="scss" >
 	@import '@/styles/color.scss';
	.cart1{
		margin-bottom:55px;
	}
</style>