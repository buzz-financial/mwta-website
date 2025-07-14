// src/middleware/auth.js
import { supabase } from "../lib/supabase";

export const requireAuth = async (to, from, next) => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      // User is authenticated
      next();
    } else {
      // User is not authenticated, redirect to login
      next("/login");
    }
  } catch (error) {
    console.error("Auth check failed:", error);
    next("/login");
  }
};
