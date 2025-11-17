import { createRouter, createWebHistory } from "vue-router";
import FileUploadComponent from "./components/subirfichero.vue";
const myrouter = [
  {
    path: "/",
    component: FileUploadComponent,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes: myrouter,
});

export default router;