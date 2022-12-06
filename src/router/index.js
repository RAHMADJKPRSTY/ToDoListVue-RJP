import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/add",
            name: "add-data",
            component: () => import("../pages/Add"),
        },
        {
            path: "/edit/:id",
            name: "edit-data",
            component: () => import("../pages/Edit"),
        },
        {
            path: "/index",
            name: "home-layar",
            component: () => import("../pages/Index"),
        },
        {
            path: "/detail/:id",
            name: "detail-data",
            component: () => import("../pages/Detail"),
        },
        {
            path: "/",
            name: "Home-Awal",
            component: () => import("../pages/Home"),
        },
    ],
});

export default router;