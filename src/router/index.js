import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    // alias: 'meeetups'
    redirect: '/meetups',
    //component: () => import(/* webpackChunkName: "meetups" */ '@/views/meetups-page'),
  },
  {
    path: '/meetups',
    name: 'meetups',
    component: () => import(/* webpackChunkName: "meetups" */ '@/views/meetups-page'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "auth" */ '@/views/login-page'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "auth" */ '@/views/register-page'),
  },
  /*
  {
    path: '/meetups/:meetupId(\\d+)',
    name: 'meetup',
    redirect: (to) => ({ name: 'meetup-description', params: to.params }),
    meta: {
      showReturnToMeetups: true,
      saveScrollPosition: true,
    },
    component: () => import('../views/MeetupPage'),
    children: [
      {
        path: '',
        alias: 'description',
        name: 'meetup-description',
        props: true,
        component: () => import('../views/MeetupDescriptionPage'),
      },
      {
        path: 'agenda',
        name: 'meetup-agenda',
        props: true,
        component: () => import('../views/MeetupAgendaPage'),
      },
    ],
  },
  */
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
