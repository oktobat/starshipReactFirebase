import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from '@/store/index.js'
import { fetchNotice, fetchReview } from '@/store/board';
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import '@/assets/css/reset.css'

// 어플리케이션이 실행될 때 초기 데이터를 가져옴
store.dispatch(fetchNotice());
store.dispatch(fetchReview());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
