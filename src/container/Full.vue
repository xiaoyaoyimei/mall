<template>
<div class="layout">
        <Layout>
            <Header>
            <app-menu></app-menu>
            </Header>
            <Layout :style="{padding: '0 50px'}">
                <Content :style="{padding: '24px 0', minHeight: '280px', background: '#fff'}">
                   <router-view/>
                </Content>
            </Layout>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
    </div>
</div>
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

<style>
</style>