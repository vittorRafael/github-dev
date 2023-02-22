import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FavoriteView from '../views/FavoriteView.vue'
import UserView from '../views/UserView.vue'
import RepositoryView from '../views/RepositoryView.vue'
import ProfileView from '../views/ProfileView.vue'
import NotFound from '../views/NotFound.vue'

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
    path: '/usuarios/:user',
    name: 'usuarios',
    component: UserView,
    props: true,
  },
  {
    path: '/usuario/:login',
    name: 'profile',
    component: ProfileView,
    props: true
  },
  {
    path: '/repositorios/:repo',
    name: 'repositorios',
    component: RepositoryView,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
]

const router = new VueRouter({
  mode: 'history',
  base: 'githubapp',
  routes
})

export default router
