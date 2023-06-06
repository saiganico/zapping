import { Router } from "express";
import { AuthenticatedUser, Login, Logout, Refresh, Register } from "./controller/auth.controller";

export const routes = (router: Router) => {
    router.post('/api/register', Register)
    router.post('/api/login', Login)
    router.post('/api/user', AuthenticatedUser)
    router.post('/api/refresh', Refresh)
    router.get('/api/refresh', Logout)
}