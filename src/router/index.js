import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
// import { mapState } from 'vuex';
import Home from '../views/Home.vue';
import Info from '../views/Info.vue';
import Search from '../views/SearchFeed.vue';


Vue.use(VueRouter);

const requireAuth = (to, from, next) => {
  if (!store.getters.SESSION_IS_LOGGED) {
    next({ name: 'Home' });
  } else {
    next();
  }
};


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/About.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/tagfeed',
    name: 'TagFeed',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/TagsFeed.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/usersfeed',
    name: 'UsersFeed',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/UsersFeed.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/info',
    name: 'ImageInfo',
    component: Info,
    beforeEnter: requireAuth,
    props: (route) => ({
      image: { firstName: 'John', lastName: 'Snow' },
      ...route.params,
    }),
  },
  {
    path: '/userTags',
    name: 'UserTags',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/UserTags.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/search/:selected',
    name: 'SearchFeed',
    component: Search,
    beforeEnter: requireAuth,
    props: (route) => ({
      image: { firstName: 'John', lastName: 'Snow' },
      ...route.params,
    }),
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/User.vue'),
    beforeEnter: requireAuth,
  },
  {
    path: '/profile',
    name: 'Profile',
    props: { isOther: false },
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/ProfileTabs.vue'),
    beforeEnter: requireAuth,
    children: [
      {
        path: '/profile/multimedia/:id',
        component: () => import('@/views/profile/Multimedia.vue'),
        props: { isOther: false },
      },
      {
        path: '/profile/siguiendo/:id',
        component: () => import('@/views/profile/Siguiendo.vue'),
        props: { isOther: false },
      },
      {
        path: '/profile/seguidores/:id',
        // path: '/seguidores',
        component: () => import('@/views/profile/Seguidores.vue'),
        // params: true,
        props: { isOther: false },
      },
    ],
  },
  {
    path: '/otherprofile',
    name: 'otherprofile',
    props: { isOther: true },
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/OtherProfileTabs.vue'),
    beforeEnter: requireAuth,
    children: [
      {
        path: '/otherprofile/multimedia/:id',
        component: () => import('@/views/profile/Multimedia.vue'),
        props: { isOther: true },
      },
      {
        path: '/otherprofile/siguiendo/:id',
        component: () => import('@/views/profile/Siguiendo.vue'),
        props: { isOther: true },
      },
      {
        path: '/otherprofile/seguidores/:id',
        // path: '/seguidores',
        component: () => import('@/views/profile/Seguidores.vue'),
        // params: true,
        props: { isOther: true },
      },
    ],
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
