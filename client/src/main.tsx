import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GlobalContextProvider } from "./Store/globalContext.tsx";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { AuthContextProvider } from "./Store/AuthContext.tsx";
import { ActivityContextProvider } from "./Store/ActivityContext.tsx";

const client = new ApolloClient({
  uri: `${import.meta.env.VITE_BACKEND_URL}/graphql`,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <GlobalContextProvider>
        <AuthContextProvider>
          <ActivityContextProvider>
            <App />
          </ActivityContextProvider>
        </AuthContextProvider>
      </GlobalContextProvider>
    </ApolloProvider>
  </BrowserRouter>
);
