export const updateURLParams = ({ query }: { query: string }) => {
  const searchParams = new URLSearchParams();

  if (query === "signIn") {
    searchParams.set("sign-in", "true");
  }

  if (query === "signUp") {
    searchParams.set("sign-up", "true");
  }

  const newURL = `${window.location.pathname}?${searchParams.toString()}`;
  window.history.replaceState({}, "", newURL);
};

export const retrieveQueryParams = (search: string) => {
  const searchParams = new URLSearchParams(search);

  const signIn = searchParams.get("sign-in");
  const signUp = searchParams.get("sign-up");

  return {
    signIn: signIn || "",
    signUp: signUp || "",
  };
};

export const popularSearch = [
  {
    id: 1,
    name: "Nike",
    link: "/query",
  },
  {
    id: 2,
    name: "Shoes",
    link: "/query",
  },
  {
    id: 3,
    name: "T-shirt",
    link: "/query",
  },
  {
    id: 4,
    name: "Sneakers",
    link: "/sneaker",
  },
];
