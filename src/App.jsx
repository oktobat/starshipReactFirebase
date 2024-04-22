import React from 'react';
import {Route, Routes}  from 'react-router-dom'
import Layout from '@/Layout'
import HomeView from '@/views/HomeView'
import ActorView from '@/views/ActorView'
import ArtistView from '@/views/ArtistView'
import MovieView from '@/views/MovieView'
import TheaterView from '@/views/TheaterView'
import ProductView from '@/views/ProductView'
import ProductDetailView from '@/views/ProductDetailView'
import CartView from '@/views/CartView'
import ProductInsertView from '@/views/ProductInsertView'
import LoginView from '@/views/LoginView'
import JoinView from '@/views/JoinView'
// import MemberModifyView from '@/views/MemberModifyView'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={ <HomeView /> } />
        <Route path="/actor" element={ <ActorView />} />
        <Route path="/artist" element={ <ArtistView />} />
        <Route path="/movie" element={ <MovieView />} />
        <Route path="/theater" element={ <TheaterView />} />
        <Route path="/product" element={ <ProductView />} />
        <Route path="/product/:id" element={ <ProductDetailView />} />
        <Route path="/cart" element={ <CartView />} />
        <Route path="/productInsert" element={ <ProductInsertView />} />
        <Route path="/login" element={ <LoginView /> } />
        <Route path="/join" element={ <JoinView /> } />
        {/* <Route path="/memberModify" element={ <MemberModifyView /> } /> */}
      </Route>
    </Routes>
  );
};

export default App;