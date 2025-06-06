import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, createRoutesFromChildren, Route } from 'react-router-dom'
import {Contact, NotFound, Allpost, Addpost, Home, About, Login, SignUp  } from './Components/index.js'
import { Provider } from 'react-redux'
import {store} from './store/store.js'

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="/all-post" element={<Allpost />} />
      <Route path="/add-post" element={<Addpost />} />
      <Route path="contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      {/* Catch-all route for 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>,
)
