import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    // alias: 'meetups'
    redirect: "/meetups"
  },
  {
    path: "/meetups",
    name: "meetups",
    component: () =>
      import(/* webpackChunkName: "meetups" */ "@/views/meetups-page")
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "auth" */ "@/views/login-page")
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "auth" */ "@/views/register-page")
  },
  {
    path: "/meetups/:id(\\d+)",
    name: "meetup",
    redirect: to => ({ name: "meetup-description", params: to.params }),
    meta: {
      showReturnToMeetups: true,
      saveScrollPosition: true
    },
    component: () =>
      import(/* webpackChunkName: "meetup" */ "@/views/meetup-page"),
    props: true,
    children: [
      {
        path: "description",
        //alias: "description",
        name: "meetup-description",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "meetup" */ "@/views/meetup-description-page"
          )
      },
      {
        path: "agenda",
        name: "meetup-agenda",
        props: true,
        component: () =>
          import(/* webpackChunkName: "meetup" */ "@/views/meetup-agenda-page")
      }
    ]
  },
  {
    path: "/meetups/create",
    name: "meetup-create",
    component: () =>
      import(/* webpackChunkName: "meetup" */ "@/views/meetup-create-page"),
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters["auth/IS_AUTHENTICATED"]) {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    next();
  }
});

router.onError(error => {
  Vue.prototype.$toaster.error(error.message);
});

export default router;
