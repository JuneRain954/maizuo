export default {
    path: '/movie',
    component: () => import('@/views/Movie'),
    children: [
        // 设置二级路由
        {
            path: 'city',
            component: () => import('@/components/City')
        },
        {
            path: 'nowPlaying',
            component: () => import('@/components/NowPlaying')
        },
        {
            path: 'comingSoon',
            component: () => import('@/components/ComingSoon')
        },
        {
            path: 'search',
            component: () => import('@/components/Search')
            // 若需要路由传参，则如下操作：
            // props: true
        },
        {   // 动态跳转（movieId为不确定项）
            path: 'detail/1/:movieId',
            // 使用具名的<router-view>时，要用components, 而不是component
            components: {
                default: () => import('@/components/NowPlaying'),
                // detail --- 相当于<router-view name='detail'></router-view>中name='detail'的detail
                detail: () => import('@/views/Movie/detail')
            },
            // 开启路由传参
            props: {
                detail: true
            }
        },
        {
            path: 'detail/2/:movieId',
            components: {
                default: () => import('@/components/ComingSoon'),
                detail: () => import('@/views/Movie/detail')
            },
            // 开启路由传参
            props: {
                detail: true
            }
        },
        {
            path: '/movie',
            redirect: '/movie/nowPlaying'
        },
        {
            path: '*',
            redirect: 'nowPlaying'
        }
    ]
}