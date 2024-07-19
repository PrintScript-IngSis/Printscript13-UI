import React from 'react';
import App from './App.tsx'
import './index.css'
import {createRoot} from "react-dom/client";
import {PaginationProvider} from "./contexts/paginationProvider.tsx";
import {SnackbarProvider} from "./contexts/snackbarProvider.tsx";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <PaginationProvider>
        <SnackbarProvider>
            <Auth0Provider
                domain="dev-5xlwq3s4z1dl0qfy.us.auth0.com"
                clientId="0XEkydzkn5pbo0sQc9K9XaynC7viONm6"
                authorizationParams={{
                    redirect_uri: window.location.origin,
                    audience: "https://snippet-api",
                    scope: "read:snippets write:snippets change:rules offline_access openid profile email",
                }}
            >
                <App />
            </Auth0Provider>
        </SnackbarProvider>
      </PaginationProvider>
    </React.StrictMode>,
)
