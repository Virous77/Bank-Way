import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Heading, UL, Span, P } from "./quotes.style";
import { IQuotesType } from "../../Interface/interface";
import { displayCol } from "../Common/variable.style";
import { TextShimmer } from "../Shimmers/TextShimmer";
import PullToRefresh from "react-simple-pull-to-refresh";
import { handleGlobalError } from "../../Utils/data";
import { useGlobalContext } from "../../Store/globalContext";

type TQuotes = {
  quotesAll: IQuotesType[] | undefined;
  loading: boolean;
  error: boolean;
};

const Quotes = () => {
  const [quotes, setQuotes] = useState<TQuotes>({
    quotesAll: [],
    loading: false,
    error: false,
  });

  const { handleSetNotification, setState } = useGlobalContext();

  const getQuotes = useCallback(async () => {
    try {
      setQuotes({ ...quotes, loading: true });
      const { data } = await axios.get(
        "https://api.quotable.io/quotes/random?limit=5"
      );
      setQuotes({ ...quotes, quotesAll: data, loading: false });
    } catch (error: any) {
      if (error.message === "Network Error") {
        handleGlobalError({
          error: "Failed to fetch",
          handleSetNotification: handleSetNotification,
          setState: setState,
        });
      }

      setQuotes({ ...quotes, loading: false, error: true });
    }
  }, []);

  const handleRefresh = async () => {
    getQuotes();
  };

  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <PullToRefresh onRefresh={handleRefresh} fetchMoreThreshold={3}>
      <>
        <Heading>Top Quotes of the Day!</Heading>

        {!quotes.error ? (
          <>
            {quotes.loading ? (
              <UL $style={displayCol}>
                {[1, 2, 3, 4].map((number) => (
                  <TextShimmer line={3} key={number} />
                ))}
              </UL>
            ) : (
              <UL $style={displayCol}>
                {quotes.quotesAll?.slice(0, 5)?.map((quote, idx) => (
                  <li key={idx} style={{ color: "var(--exact-font-color)" }}>
                    <Span>({idx + 1})</Span> {quote.content}
                  </li>
                ))}
              </UL>
            )}
          </>
        ) : (
          <P>Some Error Occurred! OOPs..🧐</P>
        )}
      </>
    </PullToRefresh>
  );
};

export default Quotes;
