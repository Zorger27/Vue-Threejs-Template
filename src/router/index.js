import {createRouter, createWebHistory} from 'vue-router'
import Project1 from "@/views/menu/Project1View.vue";
import Project2 from "@/views/menu/Project2View.vue";
import Project3 from "@/views/menu/Project3View.vue";
import About from "@/views/menu/AboutView.vue";
import PageNotFound from "@/views/service/PageNotFound.vue";

const routes = [
  {
    path: '/',
    name: 'project1',
    component: Project1,
    meta: {
      title: 'Template №3 - Project № 1',
      metaTags: [
        {
          property: 'og:title',
          content: 'Project № 1'
        },
        {
          property: 'og:description',
          content: 'Project № 1'
        },
        {
          property: 'og:image',
          content: 'https://vue-threejs-template.vercel.app/assets/ogimage/image_all.jpg'
        },
        {
          property: 'og:url',
          content: 'https://vue-threejs-template.vercel.app'
        },
        {
          property: 'og:type',
          content: 'website'
        },
      ]
    }
  },

  {
    path: '/project2',
    name: 'project2',
    component: Project2,
    meta: {
      title: 'Template №3 - Project № 2',
      metaTags: [
        {
          property: 'og:title',
          content: 'Project № 2'
        },
        {
          property: 'og:description',
          content: 'Project № 2'
        },
        {
          property: 'og:image',
          content: 'https://vue-threejs-template.vercel.app/assets/ogimage/image_all.jpg'
        },
        {
          property: 'og:url',
          content: 'https://vue-threejs-template.vercel.app'
        },
        {
          property: 'og:type',
          content: 'website'
        },
      ]
    }
  },
  {
    path: '/project3',
    name: 'project3',
    component: Project3,
    meta: {
      title: 'Template №3 - Project № 3',
      metaTags: [
        {
          property: 'og:title',
          content: 'Project № 3'
        },
        {
          property: 'og:description',
          content: 'Project № 3'
        },
        {
          property: 'og:image',
          content: 'https://vue-threejs-template.vercel.app/assets/ogimage/image_all.jpg'
        },
        {
          property: 'og:url',
          content: 'https://vue-threejs-template.vercel.app'
        },
        {
          property: 'og:type',
          content: 'website'
        },
      ]
    }
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    meta: {
      title: 'About this Project',
      metaTags: [
        {
          property: 'og:title',
          content: 'About this project'
        },
        {
          property: 'og:description',
          content: 'About this project'
        },
        {
          property: 'og:image',
          content: 'https://vue-threejs-template.vercel.app/assets/ogimage/image_all.jpg'
        },
        {
          property: 'og:url',
          content: 'https://vue-threejs-template.vercel.app'
        },
        {
          property: 'og:type',
          content: 'website'
        },
      ]
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'PageNotFound',
    component: PageNotFound,
    meta: {
      title: 'Page NOT Found',
      metaTags: [
        {
          property: 'og:title',
          content: 'Page NOT Found'
        },
        {
          property: 'og:description',
          content: 'Page NOT Found'
        },
        {
          property: 'og:image',
          content: 'https://vue-threejs-template.vercel.app/assets/ogimage/image_all.jpg'
        },
        {
          property: 'og:url',
          content: 'https://vue-threejs-template.vercel.app'
        },
        {
          property: 'og:type',
          content: 'website'
        },
      ]
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Этот callback запускается перед каждым изменением маршрута, в том числе при загрузке страницы.
router.beforeEach((to, from, next) => {
// Это просматривает совпадающие маршруты от последнего к первому, находя ближайший маршрут с заголовком.
// Например, если у нас есть `/some/deep/nested/route`, и `/some`, `/deep` и `/nested` имеют заголовки, будут выбраны `/nested`.

  // Этот код позволяет управлять заголовками страниц и мета-тегами при навигации между маршрутами.
  // Он также удаляет и очищает устаревшие мета-теги, которые были добавлены при предыдущих навигациях,
  // чтобы избежать конфликтов и обеспечить корректное обновление мета-информации на каждой странице.

  // Находим ближайший маршрут с метаданными 'title'.
  const nearestWithTitle = to.matched.slice().reverse().find(r => {
    const {title} = r.meta;
    return r.meta && title;
  });
  // Находим ближайший маршрут с метаданными 'metaTags'
  const nearestWithMeta = to.matched.slice().reverse().find(r => {
    const {metaTags} = r.meta;
    return r.meta && metaTags;
  });
  // Находим ближайший маршрут с метаданными 'metaTags' у предыдущего маршрута
  const previousNearestWithMeta = from.matched.slice().reverse().find(r => {
    const {metaTags} = r.meta;
    return r.meta && metaTags;
  });

  // Если маршрут с заголовком был найден, устанавливает заголовок документа (страницы) в это значение.
  if(nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if(previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  // Удаляем все элементы, которые были добавлены через Vue Router
  Array.from(document.querySelectorAll('[data-vue-router-controlled]')).map(el => el.parentNode.removeChild(el));

  // Проверяем, есть ли у нас метатеги для рендеринга.
  // Если их нет, то пропускаем рендеринг и переходим к следующему маршруту с помощью return next().
  if(!nearestWithMeta) return next();

  // Обрабатываем и добавляем метатеги в тег <head> документа на основе данных из массива metaTags.
  nearestWithMeta.meta.metaTags.map(tagDef => {
    const tag = document.createElement('meta');

    Object.keys(tagDef).forEach(key => {
      tag.setAttribute(key, tagDef[key]);
    });

    // Используем это, чтобы отслеживать, какие метатеги мы создаем, чтобы не мешать другим.
    tag.setAttribute('data-vue-router-controlled', '');

    return tag;
  })
    // Добавляем метатеги в тег head документа.
    .forEach(tag => document.head.appendChild(tag));

  next();
});

export default router
