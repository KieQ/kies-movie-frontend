import { createRouter, createWebHistory } from 'vue-router'
import Homepage from "@/components/Homepage/Homepage.vue";
import Login from "@/components/Homepage/Login.vue";
import Signup from "@/components/Homepage/Signup.vue";
import PageNotFound from "@/components/NotFound/PageNotFound.vue";
import Movie from "@/components/Movie/Movie.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Homepage,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/sign_up',
      name: 'sign_up',
      component: Signup,
    },
    {
      path: '/movie',
      name: 'movie',
      component: Movie,
    },
    { path: '/:pathMatch(.*)*',
      name: '404 Not Found',
      component: PageNotFound,
    },

  ]
})

export default router
