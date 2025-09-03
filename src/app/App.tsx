import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import MovieDetail from "./pages/Detail/MovieDetail";
import Wishlist from "./pages/Wishlist/Wishlist";
import NotFound from "./pages/NotFound/NotFound";
import Categories from "./pages/Categories/Categories";
import { Layout } from "./layout/Layout";
import { ROUTES } from "./constants/constants";
import { WishlistProvider } from "./context/wishlistContext/wishlistContext";
import { AlertProvider } from "./context/alertContext/alertContext";
import Alert from "./components/Alert/Alert";
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
