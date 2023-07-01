import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GlobalContextProvider } from "./Store/globalContext.tsx";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { AuthContextProvider } from "./Store/AuthContext.tsx";
import { ActivityContextProvider } from "./Store/ActivityContext.tsx";

const endpoint1 = new HttpLink({
  uri: `${import.meta.env.VITE_BACKEND_URL}/${"user"}`,
});

const endpoint2 = new HttpLink({
  uri: `${import.meta.env.VITE_BACKEND_URL}/${"activity"}`,
});

const client = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === "endpoint2",
    endpoint2,
    endpoint1
  ),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <GlobalContextProvider>
      <ApolloProvider client={client}>
        <AuthContextProvider>
          <ActivityContextProvider>
            <App />
          </ActivityContextProvider>
        </AuthContextProvider>
      </ApolloProvider>
    </GlobalContextProvider>
  </BrowserRouter>
);
