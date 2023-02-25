import guildsSelector from "./components/guilds/guildsSelector.vue";
import {createRouter, createWebHistory} from 'vue-router'
import guildDashboardView from "./components/dashboard/guildDashboardView.vue";
import newJobView from "./components/job/newJobView.vue";

const routes = [
    {
        path: '/selectguild',
        component: guildsSelector,
    },
    {
        path: '/dashboard/:guildId',
        name: 'dashboard',
        component: guildDashboardView,
    },
    {
        path: '/dashboard/:guildId/:jobName',
        name: 'jobView',
        component: newJobView,
    }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export default createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})