import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GlobalContextProvider } from "./Store/globalContext.tsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { AuthContextProvider } from "./Store/AuthContext.tsx";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <GlobalContextProvider>
      <ApolloProvider client={client}>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ApolloProvider>
    </GlobalContextProvider>
  </BrowserRouter>
);
