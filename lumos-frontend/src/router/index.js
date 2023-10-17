import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue'


// 아래는 git 통합 이전 라우터 설정
// import Mainpage from '../components/body/mainPage.vue'
// import Normalinfo from '../components/body/normalInfo.vue';
// import Reviewresult from '../components/body/reviewResult.vue';
// import Datagraph from '../components/body/dataGraph.vue';
// import Detailinfo from '../components/body/detailInfo.vue';
// import Gradeeval from '../components/body/gradeEval.vue';
// import kidsNormalinfo from '../components/body/kidsNormalInfo.vue';
// import kidsReviewresult from '../components/body/kidsReviewResult.vue';
// import kidsDatagraph from '../components/body/kidsDataGraph.vue';
// import kidsDetailinfo from '../components/body/kidsDetailInfo.vue';
// import kidsGradeeval from '../components/body/kidsGradeEval.vue';
// import Mainpage123 from '../components/body/mainPage123.vue'

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/login',
    component: () => import(/**/ '../views/LoginView.vue')
  },
  {
    path: '/signUp',
    component: () => import(/**/ '../views/SignUpView.vue')
  },
  {
    path: '/yunittest',
    component: () => import(/**/ '../views/YunitTestView.vue')
  },
  {
    path: '/jeongtest',
    component: () => import(/**/ '../views/JeongTestView.vue')
  },
  {
    path: '/hongtest',
    component: () => import(/**/ '../views/HongTestView.vue')
  },
  {
    path: '/admin',
    component: () => import(/**/ '../views/AdminPage.vue')
  },

  // 아래는 git 통합 이전 라우터 설정
  // {
  //   path: '/mainPage123',
  //   name: 'Mainpage123',
  //   component: Mainpage123
  // }, {
  //   path: '/child',
  //   name: 'Mainpage',
  //   component: Mainpage,
  //   children: [
  //     {
  //       path: 'dataGraph',
  //       name: 'Datagraph',
  //       component: Datagraph,
  //     },
  //     {
  //       path: 'detailInfo',
  //       name: 'Detailinfo',
  //       component: Detailinfo,
  //     },
  //     {
  //       path: 'gradeEval',
  //       name: 'Gradeeval',
  //       component: Gradeeval,
  //     },
  //     {
  //       path: 'normalInfo',
  //       name: 'Normalinfo',
  //       component: Normalinfo,
  //     },
  //     {
  //       path: 'reviewResult',
  //       name: 'Reviewresult',
  //       component: Reviewresult,
  //     },
  //     {
  //       path: 'kidsNormalinfo',
  //       name: 'kidsNormalinfo',
  //       component: kidsNormalinfo,
  //     },
  //     {
  //       path: 'kidsReviewresult',
  //       name: 'kidsReviewresult',
  //       component: kidsReviewresult,
  //     },
  //     {
  //       path: 'kidsDatagraph',
  //       name: 'kidsDatagraph',
  //       component: kidsDatagraph,
  //     },
  //     {
  //       path: 'kidsDetailinfo',
  //       name: 'kidsDetailinfo',
  //       component: kidsDetailinfo,
  //     },
  //     {
  //       path: 'kidsGradeeval',
  //       name: 'kidsGradeeval',
  //       component: kidsGradeeval,
  //     },
  //   ],
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
