<template>
    <div>
        <div class='cartfoot'>
			<Row>
				<i-col  class='cartCol ' span="24">
					<i-col class='' span="4">
							<div style="padding-bottom:6px;margin-bottom:6px;">
								<Checkbox :indeterminate="indeterminate"  :value="checkAll"   @click.prevent.native="handleCheckAll">全选</Checkbox>
							</div>
					</i-col>
					<i-col class='' span="8">
						<P class='color-dx'>总计：￥{{totalPrice}}</P>
					</i-col>
					<i-col class='cartButton1' span="12"> 
						<i-button class='cartButton' v-bind:class="{ active: isActive}" @click.prevent.native="edit" type="primary">编辑</i-button>
						<i-button class='cartButton' v-bind:class="{ active: isActive}" @click.prevent.native="paymoney" type="error"> <router-link class='font-dx' :to="{ path: 'paymoney' }"> 结算</router-link></i-button>
						<i-button class='cartButton' v-bind:class="{ 'text-danger': hasError }" @click.prevent.native="edit1" type="primary">完成</i-button>
						<i-button class='cartButton' v-bind:class="{ 'text-danger': hasError }" @click.prevent.native="remove" type="error">删除</i-button>
					</i-col>
				</i-col>
			</Row>
		</div>
		<Row>
		    <Checkbox-group v-model="checkAllGroup" @on-change="checkAllGroupChange">
		 		<i-col  class='cartCol' span="24">
        			<i-col class='cartcheckbok' span="2"><Checkbox  label="1"></Checkbox></i-col>
					<i-col span="5"><img class='cartImg' src='../assets/img/x1.jpg'></i-col>
					<i-col span="13">
						<p class='cart_black'>迪锐克斯座椅</p>
						<p class='cart_gray'>迪锐克斯座椅：五星脚（绿色）</p>
						<p class='cart_gray'>x1</p>
					</i-col>
					<i-col span="4"><p class='cart_price'>￥：730</p></i-col>
				</i-col>
				<i-col  class='cartCol' span="24">
        			<i-col class='cartcheckbok' span="2"><Checkbox  label="2"></Checkbox></i-col>
					<i-col span="5"><img class='cartImg' src='../assets/img/x1.jpg'></i-col>
					<i-col span="13">
						<p class='cart_black'>迪锐克斯座椅</p>
						<p class='cart_gray'>迪锐克斯座椅：五星脚（绿色）</p>
						<p class='cart_gray'>x1</p>
					</i-col>
					<i-col span="4"><p class='cart_price'>￥：730</p></i-col>
				</i-col>
				<i-col  class='cartCol' span="24">
        			<i-col class='cartcheckbok' span="2"><Checkbox label="3"></Checkbox></i-col>
					<i-col span="5"><img class='cartImg' src='../assets/img/x1.jpg'></i-col>
					<i-col span="13">
						<p class='cart_black'>迪锐克斯座椅</p>
						<p class='cart_gray'>迪锐克斯座椅：五星脚（绿色）</p>
						<p class='cart_gray'>x1</p>
					</i-col>
					<i-col span="4"><p class='cart_price'>￥：730</p></i-col>
				</i-col>
			</Checkbox-group>
				
		</Row>
    </div>
</template>
<script>

 export default {
        data () {
            return {
                indeterminate: true,
                checkAll: false,
				checkAllGroup: [],
				price:[{label:1,total:"730"},{label:2,total:'730'},{label:3,total:'730'}],
				totalPrice:0,
				isActive:false,
				hasError:true,
            }
		},
        methods: {
			edit(){
				this.isActive=true;
				this.hasError=false;
			},
			edit1(){
				this.isActive=false;
				this.hasError=true;
			},
			paymoney(){
				
			},
			remove(){

			},
            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;
                if (this.checkAll) {
					this.checkAllGroup = ['1', '2', '3'];
					for (let index = 0; index < this.price.length; index++) {
							this.totalPrice = parseFloat(this.price[index].total) + parseFloat(this.totalPrice);
					}
                } else {
					this.checkAllGroup = [];
					this.totalPrice=0;
                }
			},
			handleCheck () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.checkAllGroup = ['1', '2', '3'];
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
				this.totalPrice = 0;
				for(var i=0;i<data.length;i++){
					for (let index = 0; index < this.price.length; index++) {
						if(data[i] == this.price[index].label){
							this.totalPrice = parseFloat(this.price[index].total) + parseFloat(this.totalPrice);
						}
					}
				}
            }
        }
    }
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