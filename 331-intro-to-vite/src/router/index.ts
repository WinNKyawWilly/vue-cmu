import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import AboutView  from '@/views/AboutView.vue'
import StudentView from '@/views/StudentView.vue'
import EventDetailView from '@/views/event/DetailView.vue'
import EditEventView from '@/views/event/EditView.vue'
import RegisterEventView from '@/views/event/RegisterView.vue'
import EventLayoutView from '@/views/event/LayoutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      props: (route) => ({
        page: parseInt(route.query.page?.toString() || '1' ), 
        pageSize: parseInt(route.query.perPage?.toString() || '3')
      })
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/student',
      name: 'student',
      component: StudentView
    },
    {
      path: '/events/:id',
      name: 'event-layout-view',
      component: EventLayoutView,
      props: true,
      children: [
        {
          path: '',
          name: 'event-detail-view',
          component: EventDetailView,
          props: true
        },
        {
          path: 'edit',
          name: 'event-edit-view',
          component: EditEventView,
          props: true
        },
        {
          path: 'register',
          name: 'event-register-view',
          component: RegisterEventView,
          props: true
        }
      ]
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkErrorView
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

export default router
