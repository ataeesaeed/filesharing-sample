import VueRouter from 'vue-router'
import services from '@/_services';
import Home from '@/views/Visitor/Home.vue'
import Enter from '@/views/Visitor/Enter.vue'
import Dashboard from '@/views/User/Home.vue'
import Upload from '@/views/User/Upload.vue'
import File from '@/views/User/File.vue'
import Manage from '@/views/User/Manage.vue'

const routes = [
  {
    path: '/enter',
    name: 'Enter',
    component: Enter,
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/file/:id',
    name: 'File',
    component: File,
    meta: { authorized: true } 
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { authorized: true } 
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload,
    meta: { authorized: true } 
  },
  {
    path: '/manage',
    name: 'Manage',
    component: Manage,
    meta: { authorized: true } 
  },
  
  // TODO
  // otherwise redirect to home
  { path: '*', redirect: '/' }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorized } = to.meta;
  const currentUser = services.authenticationService?.currentUserValue;

  if (authorized) {
      if (!currentUser) {
          // not logged in so redirect to login page with the return url
          return next({ path: '/login', query: { returnUrl: to.path } });
      }
  }

  next();
})

export default router
