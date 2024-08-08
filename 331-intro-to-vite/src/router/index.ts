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
import nProgress from 'nprogress'
import EventService from '@/services/EventService'
import { useEventStore } from '@/stores/event'

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
      beforeEnter: (to) => {
        //put API call here
        const id = parseInt(to.params.id as string)
        return EventService.getEvent(id)
          .then((response) => {
            const id = parseInt(to.params.id as string)
            const eventStore = useEventStore()
            return eventStore.setEvent(response.data)            
          })
          .catch((error) => {
            if (error.response && error.response.status == 404) {
              return {
                name: '404-resource-view',
                params: { resource: 'event' }
              }
            } else {
              return { name: 'network-error' }
            }
          })
      },
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
  ],
  scrollBehavior( to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
router.beforeEach(() => {
  nProgress.start()
})
router.afterEach(() => {
  nProgress.done()
})

export default router
