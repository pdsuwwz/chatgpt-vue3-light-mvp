import childRoutes from '@/router/child-routes'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Root',
    redirect: {
      name: 'ChatRoot'
    }
  },
  ...childRoutes,
  {
    path: '/:pathMatch(.*)',
    name: '404',
    component: () => import('@/components/404.vue')
  }
]

export default routes
