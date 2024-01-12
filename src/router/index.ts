import { PageEnum } from '@/enums/pageEnum'
import { createRouter, createWebHashHistory } from 'vue-router'
import { RedirectRoute } from '@/router/base'
import { ErrorPageRoute } from './base'
import { createRouterGuards } from './router-guards'

const modules = import.meta.glob('./modules/**/*.ts', { eager: true })
// 整合modules下的路由，形成列表
const routeModuleList = Object.keys(modules).reduce((list, key) => {
  const mod = modules[key].default ?? {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  return [...list, ...modList]
}, [])

function sortRoute(a, b) {
  return (a.meta?.sort || 0) - (b.meta?.sort || 0)
}

routeModuleList.sort(sortRoute)

// 根路由
export const RootRoute = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root'
  }
}
// 登录路由
export const LoginRoute = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '登录'
  }
}

//需要验证权限
export const asyncRoutes = [...routeModuleList]

// 普通路由，无需验证权限
export const constantRouter = [
  LoginRoute,
  RootRoute,
  RedirectRoute,
  ErrorPageRoute
]

const router = createRouter({
  history: createWebHashHistory(''),
  routes: constantRouter,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 })
})
export function setupRouter(app) {
  app.use(router)
  createRouterGuards(router)
}

export default router
