import DashBoad from "../pages/dashBoard";
import NotFoundPage from "../pages/notFoundPage";

export const routes = [
    {
        path: '/',
        page: DashBoad,
    },
    {
        path: '*',
        page: NotFoundPage,
    }
]