<template>
    <div class="layout">
            <Layout>
                <!--<Header>
                <app-menu></app-menu>
                </Header>-->
                <Layout >
                    <Content :style="{ minHeight: '280px',marginBottom:'50px'}">
                       <router-view/>
                    </Content>
                </Layout>
               <app-footer></app-footer>
            </Layout>
        </div>
    </div>
    </template>
    
    <script>
    import AppHeader from '@/components/Header'
    import AppFooter from '@/components/Footer1'
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
        
    </style>