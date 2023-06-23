import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Heading, UL, Span, P } from "./quotes.style";
import { QuotesType } from "../../Interface/interface";
import { displayCol } from "../Common/variable.style";
import { TextShimmer } from "../Shimmers/TextShimmer";

const Quotes = () => {
  type quotesType = {
    quotesAll: QuotesType[] | undefined;
    loading: boolean;
    error: boolean;
  };

  const [quotes, setQuotes] = useState<quotesType>({
    quotesAll: [],
    loading: false,
    error: false,
  });

  const getQuotes = useCallback(async () => {
    try {
      setQuotes({ ...quotes, loading: true });
      const { data } = await axios.get(
        "https://api.quotable.io/quotes/random?limit=5"
      );
      setQuotes({ ...quotes, quotesAll: data, loading: false });
    } catch (error) {
      setQuotes({ ...quotes, loading: false, error: true });
    }
  }, []);

  useEffect(() => {
    getQuotes();
  }, []);

  return (
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
                <li key={idx}>
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
  );
};

export default Quotes;
