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
               <app-footer1></app-footer1>
            </Layout>
        </div>
    </div>
    </template>
    
    <script>
    import AppHeader from '@/components/Header'
    import AppFooter1 from '@/components/Footer1'
    import AppMenu from '@/components/Menu'
        export default {
                data(){
                    return {
                    }
                },
            components:{
                AppHeader,
                AppFooter1,
                AppMenu
            }
           }
    </script>
    
    <style scoped="scoped">
        
    </style>