import 'regenerator-runtime/runtime'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.scss'
import './PhaserGame'
import muiTheme from './MuiTheme'
import App from './App'
import store from './stores'

const router = createBrowserRouter([
  {
    path: "/:room/:password/:name/:avatar",
    element: <App />,
  },
]);

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={muiTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
