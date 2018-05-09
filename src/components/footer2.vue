<template>
     <div class='foot'>
                <Row>
                    <i-col  class='cartCol ' span="24">
                        <i-col class='' span="18">
                            <P class='color-dx'>总计：</P>
                        </i-col>
                        <i-col class='cartButton1' span="6"> 
                            <i-button class='cartButton'  @click.prevent.native="paymoney" type="error"> <router-link class='font-dx' :to="{ path: 'paymoney' }">支付</router-link></i-button>
                        </i-col>
                    </i-col>
                </Row>
		</div>
</template>
<script>
	
</script>

<style scoped="scoped"  lang="scss">
 @import '@/styles/color.scss';
.foot {
		background: #fff;
		border-top:1px solid #eee;
		position: fixed;
		height: 50px;
		z-index: 31;
		bottom: 0;
		left: 0;
		width:100%;
	i{
		display: block;
		font-size:2em
	}
	a{
		color:$color-white;
    }
    .cartCol {
        height:50px;
        line-height:50px;
        .color-dx{
            text-align:left;
            padding-left:20px;
        }
        .cartButton1{
            text-align:right;
            .cartButton {
                border-radius:0px;
				padding:15px 25px;
            }
        }
    }
	// a.router-link-active{
	// 		color:$color-dx;
	// }
}
</style>