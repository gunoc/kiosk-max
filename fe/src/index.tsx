import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App';

import './reset.css';
import './index.css';
import { TabMenu } from './components/TabMenu';
import { TestBtnForModal } from './components/TestBtnForModal';
import { AddMenu } from './components/AddMenu';
import { Modal } from './components/Modal';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/add-menu/:id',
        element: <AddMenu />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    {/* <App />
     */}
    <RouterProvider router={router} />
  </React.StrictMode>,
);
