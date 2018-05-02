<template>
	<div class="index">
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
     <Row class="series">
        <Col span="6"><img  src="../../assets/img/x1.jpg">电竞桌系列</Col>
        <Col span="6"><img  src="../../assets/img/x2.jpg">电竞椅系列</Col>
         <Col span="6"><img  src="../../assets/img/x3.jpg">其他周边</Col>
          <Col span="6"><img  src="../../assets/img/x4.jpg">电竞馆周边</Col>
   </Row>
   <div class="activity">
    	<img src="../../assets/img/b1.jpg"><img src="../../assets/img/b2.jpg">
   </div>
     <div class="floor">
       	<h3><a href="#">更多></a>电竞椅系列</h3>
	   <Row  class="goodslist">
	        <Col  :xs="12"  :md="6" >
	            	<img src="../../assets/img/s.jpg" alt="迪锐克斯（DXRACER）F01电脑椅子 可转办公椅 人体工学椅 电竞椅 红黑 游戏椅子">
	            	<a title="迪锐克斯（DXRACER）F01电脑椅子 可转办公椅 人体工学椅 电竞椅 红黑 游戏椅子">迪锐克斯（DXRACER）F01电脑椅子 可转办公椅 人体工学椅 电竞椅 红黑 游戏椅子</a>
	            	<h4 class="color-dx">￥899.00</h4>
	        </Col>
	        <Col  :xs="12"  :md="6" >
	           	<img src="../../assets/img/s.jpg" alt="迪锐克斯（DXRACER）F01电脑椅子 可转办公椅 人体工学椅 电竞椅 红黑 游戏椅子">
	            	<a title="迪锐克斯（DXRACER）F01电脑椅子 可转办公椅 人体工学椅 电竞椅 红黑 游戏椅子">迪锐克斯（DXRACER）F01电脑椅子 可转办公椅 人体工学椅 电竞椅 红黑 游戏椅子</a>
	            	<h4 class="color-dx">￥899.00</h4>
	        </Col>
	        <Col  :xs="12"  :md="6" >
	            	<img src="../../assets/img/s.jpg" alt="迪锐克斯（DXRACER）F01电脑椅子 可转办公椅 人体工学椅 电竞椅 红黑 游戏椅子">
	            	<a title="迪锐克斯（DXRACER）F01电脑椅子 可转办公椅 人体工学椅 电竞椅 红黑 游戏椅子">迪锐克斯（DXRACER）F01电脑椅子 可转办公椅 人体工学椅 电竞椅 红黑 游戏椅子</a>
	            	<h4 class="color-dx">￥899.00</h4>
	        </Col>
	        <Col  :xs="12"  :md="6" >
	          	<img src="../../assets/img/s.jpg" alt="迪锐克斯（DXRACER）F01电脑椅子 可转办公椅 人体工学椅 电竞椅 红黑 游戏椅子"> 
	            	<a title="迪锐克斯（DXRACER）F01电脑椅子 可转办公椅 人体工学椅 电竞椅 红黑 游戏椅子">迪锐克斯（DXRACER）F01电脑椅子 可转办公椅 人体工学椅 电竞椅 红黑 游戏椅子</a>
	            	<h4 class="color-dx">￥899.00</h4>
	        </Col>
	    </Row>
	    </div>
       <div class="floor">
       	<h3><a href="#">更多></a>电竞桌系列</h3>
	   <Row  class="goodslist">
	        <Col  :xs="12"  :md="6" >
	            	<img src="../../assets/img/s1.jpg" alt="DXRACER 迪锐克斯2017款人体工学游戏桌1000型家用电脑桌电竞桌子简约办公书桌 全黑色">
	            	<a title="DXRACER 迪锐克斯2017款人体工学游戏桌1000型家用电脑桌电竞桌子简约办公书桌 全黑色 ">DXRACER 迪锐克斯2017款人体工学游戏桌1000型家用电脑桌电竞桌子简约办公书桌 全黑色 </a>
	            	<h4 class="color-dx">￥1699.00</h4>
	        </Col>
	       <Col  :xs="12"  :md="6" >
	            	<img src="../../assets/img/s1.jpg" alt="DXRACER 迪锐克斯2017款人体工学游戏桌1000型家用电脑桌电竞桌子简约办公书桌 全黑色">
	            	       	<a title="DXRACER 迪锐克斯2017款人体工学游戏桌1000型家用电脑桌电竞桌子简约办公书桌 全黑色 ">DXRACER 迪锐克斯2017款人体工学游戏桌1000型家用电脑桌电竞桌子简约办公书桌 全黑色 </a>
	            	<h4 class="color-dx">￥1699.00</h4>
	        </Col>
	        <Col  :xs="12"  :md="6" >
	            	<img src="../../assets/img/s1.jpg" alt="DXRACER 迪锐克斯2017款人体工学游戏桌1000型家用电脑桌电竞桌子简约办公书桌 全黑色">
	            	       	<a title="DXRACER 迪锐克斯2017款人体工学游戏桌1000型家用电脑桌电竞桌子简约办公书桌 全黑色 ">DXRACER 迪锐克斯2017款人体工学游戏桌1000型家用电脑桌电竞桌子简约办公书桌 全黑色 </a>
	            	<h4 class="color-dx">￥1699.00</h4>
	        </Col>
	          <Col  :xs="12"  :md="6" >
	            	<img src="../../assets/img/s1.jpg" alt="DXRACER 迪锐克斯2017款人体工学游戏桌1000型家用电脑桌电竞桌子简约办公书桌 全黑色">
	            	       	<a title="DXRACER 迪锐克斯2017款人体工学游戏桌1000型家用电脑桌电竞桌子简约办公书桌 全黑色 ">DXRACER 迪锐克斯2017款人体工学游戏桌1000型家用电脑桌电竞桌子简约办公书桌 全黑色 </a>
	            	<h4 class="color-dx">￥1699.00</h4>
	        </Col>
	    </Row>
	    </div>
	</div>
</template>

<script>
	export default {
        data () {
            return {
                value3: 0,
                setting: {
                    autoplay: false,
                    autoplaySpeed: 2000,
                    dots: 'inside',
                    radiusDot: false,
                    trigger: 'click',
                    arrow: 'hover'
                }
            }
        },
    }
</script>

<style lang="scss" >
 @import '@/styles/color.scss';
	.index {
			background: #f5f5f5;
			img{
			max-width: 100%;
			}
			.series{
				margin-top:10px;
				background: #fff;
				border-top:1px solid $color-border;
				margin-bottom:15px;
				text-align: center;
				padding:10px 0;
				div{
					display: flex;
					align-items: center;
					flex-direction: column;
					cursor: pointer;
				}
				img{
					max-width:100%;
					border-radius: 100%;
					border:2px solid $color-border;
					display: block;
					margin-bottom: 10px;
				}
			}
			.activity{
				img{
					margin-bottom:10px;
				}
			}
			.goodslist a {
				white-space: nowrap;
				overflow:hidden;
				text-overflow: ellipsis;
				display:block;
				color:$color-default;
			}
			.floor{ 
				background: #fff;
			   .goodslist div{
				padding:10px;
				}
				p{
					margin-top:8px;
					margin-bottom:8px;
				}
				h3{
				padding:8px 0;
				border-bottom:1px solid #eee;
					a{
						float: right;
						margin-right: 15px;
						color:$color-dx;
					}
			}
			}
		}
		@media screen and (max-width: 767px) {
			.index {
			 .series{ 
		    	img{
		        	max-width:70px;
		   		 }
				}
			}
}
</style>