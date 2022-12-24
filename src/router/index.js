import { createRouter, createWebHistory } from 'vue-router'
import Homepage from "@/components/Homepage/Homepage.vue";
import Login from "@/components/Homepage/Login.vue";
import Signup from "@/components/Homepage/Signup.vue";
import PageNotFound from "@/components/NotFound/PageNotFound.vue";
import Movie from "@/components/Movie/Movie.vue";
import MovieEdit from "@/components/Movie/Edit.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/:pathMatch(.*)*',
      name: '404 Not Found',
      component: PageNotFound,
    },
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
    {
      path: '/movie/edit',
      name: 'movie_edit',
      component: MovieEdit,
    },
  ]
})

export default router
