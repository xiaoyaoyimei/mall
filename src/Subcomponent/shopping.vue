<template>
    <div>
        
    </div>
</template>
<script>

 
</script>

<style scoped="scoped" lang="scss" >
 	@import '@/styles/color.scss';
	.cart1{
		margin-bottom:55px;
		.cartCol{
			background-color:$color-white;
			margin-bottom:5px;
			.cartcheckbok{
				height:16px;
				margin-top:12%;
				overflow:hidden;
				.ivu-checkbox-wrapper{
					width:16px;
					overflow:hidden;
				}
			}
			.cartImg{
				max-width:100%;
				padding-top:15px;
			}
			.cart_black{
				text-align:left;
				color:$color-default;
				padding-left:20px;
				box-sizing:border-box;
				font-size:14px;
				padding-top:15px;
			}
			.cart_gray{
				text-align:left;
				color:$color-gray;
				padding-left:20px;
				box-sizing:border-box;
				font-size:12px;
				height:40px;
				overflow:hidden;
			}
			.cart_price{
				color:$color-dx;
				font-size:14px;
				padding-top:75px;
			}
			.color-dx{
				color:$color-dx;
				text-align:left;
			}
			.cartButton1{
				text-align:right;
			}
			.cartButton{
				border-radius:0px;
				padding:15px 25px;
				.font-dx{
					color:$color-white;
				}
			}
			.cartButton:nth-of-type(2n){
				margin-left:-5px;
			}
			
		}
		.cartfoot{
			    background: #fff;
				border-top: 1px solid #eee;
				position: fixed!important;
				height: 50px!important;
				line-height:50px;
				z-index: 31!important;
				bottom: 50px!important;
				left: 0!important;
				width: 100%;
		}
		.active, .text-danger{
			display:none;
		}
	}
</style>