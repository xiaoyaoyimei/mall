<template>
    <div class='paymoney'>
        <Tabs value="name1">
        <TabPane label="快递配送" name="name1">
            <Row>
                <Col span="24" class='font-dx'><router-link class='fontDx' :to="{ path: 'paymoney' }">请选择收货地址<Icon class='float float1' type="ios-arrow-right"></Icon></router-link></Col>
            </Row>
             <Row class='margin'>
                <Col span="24" class='font-dx'><router-link class='fontDx' :to="{ path: 'paymoney' }">优惠券<span class='float fontSize'>目前无可用优惠券<Icon class='paddingLeft'  type="ios-arrow-right"></Icon></span></router-link></Col>
            </Row>
            <Row class='liebiao'>
                <i-col  class='cartCol' span="24">
					<i-col span="5"><img class='cartImg' src='../../../assets/img/x1.jpg'></i-col>
					<i-col span="13">
						<p class='cart_black'>迪锐克斯座椅</p>
						<p class='cart_gray'>迪锐克斯座椅：五星脚（绿色）</p>
						<p class='cart_gray'>x1</p>
					</i-col>
					<i-col span="4"><p class='cart_price'>￥：730</p></i-col>
				</i-col>
				<i-col  class='cartCol' span="24">
					<i-col span="5"><img class='cartImg' src='../../../assets/img/x1.jpg'></i-col>
					<i-col span="13">
						<p class='cart_black'>迪锐克斯座椅</p>
						<p class='cart_gray'>迪锐克斯座椅：五星脚（绿色）</p>
						<p class='cart_gray'>x1</p>
					</i-col>
					<i-col span="4"><p class='cart_price'>￥：730</p></i-col>
				</i-col>
				<i-col  class='cartCol' span="24">
					<i-col span="5"><img class='cartImg' src='../../../assets/img/x1.jpg'></i-col>
					<i-col span="13">
						<p class='cart_black'>迪锐克斯座椅</p>
						<p class='cart_gray'>迪锐克斯座椅：五星脚（绿色）</p>
						<p class='cart_gray'>x1</p>
					</i-col>
					<i-col span="4"><p class='cart_price'>￥：730</p></i-col>
				</i-col>
            </Row>
            
        </TabPane>
        <TabPane label="到店自提" name="name2">标签二的内容</TabPane>
    </Tabs>
         <div class='cartfoot'>
                <Row>
                    <i-col  class='cartCol ' span="24">
                        <i-col class='' span="18">
                            <P class='color-dx totalPrice'>总计：{{totalPrice}}</P>
                        </i-col>
                        <i-col class='cartButton1' span="6"> 
                            <i-button class='cartButton'  @click.prevent.native="paymoney" type="error"> <router-link class='payBtn' :to="{ path: 'paymoney' }">支付</router-link></i-button>
                        </i-col>
                    </i-col>
                </Row>
		</div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                indeterminate: true,
                checkAll: false,
                checkAllGroup: ['香蕉', '西瓜'],
                price:[{label:1,total:"730"},{label:2,total:'730'},{label:3,total:'730'}],
                totalPrice:2190,
            }
        },
        methods: {
            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.checkAllGroup = ['香蕉', '苹果', '西瓜'];
                } else {
                    this.checkAllGroup = [];
                }
            },
            checkAllGroupChange (data) {
                if (data.length === 3) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            }
        }
    }
</script>
<style lang="scss">
 @import '@/styles/color.scss';
   .ivu-layout-content{
       margin-bottom:0px!important;
   }
    .paymoney{
         .ivu-tabs-nav{
            width:100%;
        }
        .ivu-tabs-nav .ivu-tabs-tab{
            width:50%;
            text-align:center;
        }
        .ivu-tabs-bar{
            margin-bottom:0px;
        }
        .margin{
            margin:5px 0px;
        }
        .cartCol{
			background-color:$color-white;
            margin-bottom:5px;
            padding-left:25px;
			.cartcheckbok{
				height:16px;
				margin-top:12%;
				overflow:hidden;
				.ivu-checkbox-wrapper{
					width:16px;
					overflow:hidden;
				}
            }
            .totalPrice{
                height:50px;
                line-height:50px;
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
        .font-dx{
            text-align:left;
            width:100%;
            box-sizing:border-box;
            padding: 15px 20px;
            background-color:$color-white;
            
            .fontDx{
                color:$color-default;
                font-size:14px;
                display:inline-block;
                width:100%;
                .float{
                    float:right;
                }
                .float1{
                    // font-size:25px;
                }
                .fontSize{
                    font-size:12px;
                }
                .paddingLeft{
                    padding-left:10px;
                }
            }
        }
        .cartfoot {
                background: #fff;
                border-top:1px solid #eee;
                // padding:5px 0;
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
                color:$color-default;
                background-color:$color-dx;
            }
            a.router-link-active{
                    color:$color-dx;
            }
            a.payBtn{
                color:$color-white!important;
            }
        }
        
    }
</style>