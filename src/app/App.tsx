import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";
import { Layout } from "./layout/Layout";
import { ROUTES } from "./common/constants/constants";
import { WishlistProvider } from "./common/context/wishlistContext";
import { AlertProvider } from "./common/context/alertContext";
import Alert from "./common/components/Alert";
import "../styles/globals.scss";
import "../styles/main.scss";

export default function App(initial: any) {
  return (
    <div className="app">
      <AlertProvider>
        <WishlistProvider initial={initial.wishlist}>
          <Navbar />
          <Alert />
          <Layout>
            <Routes>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.MOVIE} element={<MovieDetail />} />
              <Route path={ROUTES.CATEGORIES} element={<Categories />} />
              <Route path={ROUTES.WISHLIST} element={<Wishlist />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </WishlistProvider>
      </AlertProvider>
    </div>
  );
}
