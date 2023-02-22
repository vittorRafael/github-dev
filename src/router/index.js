import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FavoriteView from '../views/FavoriteView.vue'
import UserView from '../views/UserView.vue'
import RepositoryView from '../views/RepositoryView.vue'
import ProfileView from '../views/ProfileView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/favoritos',
    name: 'favoritos',
    component: FavoriteView,
  },
  {
    path: '/usuarios/',
    name: 'usuarios',
    component: UserView,
  },
  {
    path: '/usuario/:login',
    name: 'profile',
    component: ProfileView,
    props: true
  },
  {
    path: '/repositorios/',
    name: 'repositorios',
    component: RepositoryView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
