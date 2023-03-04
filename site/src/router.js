import {createRouter, createWebHashHistory} from "vue-router";
import HomePage from "./components/homePage/homePage.vue";
import DashboardPage from "./components/dashboard/dashboardPage.vue";
import GuildsSelectionPage from "./components/guilds/guildsSelectionPage.vue";
import GuildDashboardView from "./components/dashboard/guildDashboardView.vue";
import EditJobView from "./components/job/editJobView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/dashboard',
        component: DashboardPage,
        children: [
            {
                path: 'guilds',
                name: 'guilds',
                component: GuildsSelectionPage,
            },
            {
                path: ':guildId/jobs',
                name: 'jobs',
                component: GuildDashboardView,
            },
            {
                path: ':guildId/editjob',
                name: 'editjob',
                component: EditJobView,
            }
        ],
    },
    {
        path: "/:pathMatch(.*)*",
        redirect: "/dashboard"
    },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export default createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})