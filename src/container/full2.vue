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
              <app-footer2></app-footer2>
            </Layout>
        </div>
    </div>
    </template>
    
    <script>
    import AppHeader from '@/components/Header'
      import AppFooter2 from '@/components/Footer2'
    import AppMenu from '@/components/Menu'
        export default {
                data(){
                    return {
                    }
                },
            components:{
                AppHeader,
                AppFooter2,
                AppMenu,
                
            }
           }
    </script>
    
    <style scoped="scoped">
        
    </style>