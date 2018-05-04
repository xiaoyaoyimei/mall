<template>
	<div class="sortDetail">
		<Carousel
            v-model="value3"
            :autoplay="setting.autoplay"
            :autoplay-speed="setting.autoplaySpeed"
            :dots="setting.dots"
            :radius-dot="setting.radiusDot"
            :trigger="setting.trigger"
            :arrow="setting.arrow">
                <CarouselItem>
                        <div class="demo-carousel"><img src="../../assets/img/banner.jpg"></div>
                </CarouselItem>
                <CarouselItem>
                        <div class="demo-carousel"><img src="../../assets/img/banner1.jpg"></div>
                </CarouselItem>
    	</Carousel>
        <h4 class='sdh4'>Z1电竞桌</h4>
        <p><span class='sdh4 sdprice'>￥859</span><span class='sdyuan sdprice'>￥999</span><span class='sdprice sdnum'>销量：100件</span><span class='sdspan'><Icon class='sdShare'  type="share"></Icon><br>分享</span></p>
        <p ><Icon class='sdp' type="ios-checkmark-outline"></Icon> 正品保障</p>
        <i-form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <form-item label="规格" prop="city">
            <Row class="">
				<Col :xs="12" class="sMar"  :md="6">
                <i-select v-model="formValidate.city" placeholder="请选择">
                    <i-option value="beijing">New York</i-option>
                    <i-option value="shanghai">London</i-option>
                    <i-option value="shenzhen">Sydney</i-option>
                </i-select>
                </Col>
		    </Row>
            </form-item>
            <form-item label="数量" prop="desc">
                <Row class="">
                <!-- <Col :xs="1" class="sMar"  :md="1">
                        <Icon type="minus"></Icon>
                    </Col> -->
                    <Col :xs="12" class="sMar"  :md="6">
                        <Input v-model="formValidate.desc" placeholder="请输入数量"></Input>
                    </Col>
                    <!-- <Col :xs="1" class="sMar"  :md="1">
                       <Icon type="plus"></Icon>
                    </Col> -->
                </Row>
            </form-item>
            <form-item>
                <!-- <i-button type="primary" @click="handleSubmit('formValidate')">加入购物车</i-button>
                <i-button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</i-button> -->
            </form-item>
    </i-form>
     <Tabs value="name1">
        <TabPane   label="商品详情" name="name1"><img src='../../assets/img/banner.jpg'></TabPane>
        <TabPane  label="评价" name="name2"> 
            <Tag closable color="blue">全部<br>(0)</Tag>
            <Tag closable color="green">好评<br>(0)</Tag>
            <Tag closable color="red">差评<br>(0)</Tag>
        </TabPane>
    </Tabs>
    </div>

</template>
<script>
    	export default {
        data () {
            return {
                value3: 0,
                 model9: '',
                setting: {
                    autoplay: false,
                    autoplaySpeed: 2000,
                    dots: 'inside',
                    radiusDot: false,
                    trigger: 'click',
                    arrow: 'hover'
                },
                formValidate: {
                    name: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '请选择规格', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请输入数量', trigger: 'blur' },
                        // { type: 'string', min: 20, message: '请输入个数', trigger: 'blur' }
                    ]
                }
            }
        },
    }
</script>
<style lang="scss">
 @import '@/styles/color.scss';
    .sortDetail{
        img{
            max-width:100%;
        }
        h4{
            text-align:left;
            text-indent:1.5em;
            height:40px;
        }
        p{
            text-align:left;
            height:40px;
            overflow:hidden;
            .sdh4{
                color:$color-dx;
                font-size:14px;
            }
            .sdprice{
                padding-left:1.5em;
            }
            .sdyuan{
                color:$color-gray;
                text-decoration:line-through;
            }
            .sdnum{
                color:$color-gray;
            }
            .sdspan{
                float:right;
                padding-right:20px;
                color:$color-gray;
            }
            .sdShare{
                font-size:20px;
                color:$color-gray;
            }
            .sdp{
                color:$color-primary;
                font-size:20px;
                padding-left:1em;
            }
        }
        .sMar{
            height:30px;
            line-height:30px;
        }
        .biaoqian{
            width:50%;
        }
        .ivu-tabs-nav {
            width:100%;
        }
        .ivu-tabs-nav .ivu-tabs-tab{
            width:48%;
        }
    }
</style>