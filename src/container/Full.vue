<template>
        <Layout>
                <Content  :style="{ minHeight: '280px'}">
                 <transition name="slidemode">  <router-view/></transition>
                </Content>
           <app-footer></app-footer>
        </Layout>
</template>

<script>
import AppHeader from '@/components/Header'
import AppFooter from '@/components/Footer'
import AppMenu from '@/components/Menu'
	export default {
			data(){
				return {
				}
			},
        components:{
        	AppHeader,
        	AppFooter,
        	AppMenu
        }
       }
</script>

<style scoped="scoped">
	.slideleft-enter-active,.slideleft-leave-active,.slideright-enter-active,.slideright-leave-active{transition: all 1s;}
.slideleft-enter,.slideleft-leave-to,.slideright-enter,.slideright-leave-to{opacity: 0;}
.slideright-enter {transform: translateX(+100%);}
.slideright-leave-active {transform: translateX(-100%);}
.slideleft-enter {transform: translateX(-100%);}
.slideleft-leave-active {transform: translateX(+100%);}

</style>