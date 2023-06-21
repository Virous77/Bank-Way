import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Section, Heading, UL, LI } from "./quotes.style";

const Quotes = () => {
  type quotesType = {
    quote: string;
    author: string;
    category: string;
  };

  type QuotesType = {
    quotesAll: quotesType[] | undefined;
    loading: boolean;
    error: boolean;
  };

  const [quotes, setQuotes] = useState<QuotesType>({
    quotesAll: [],
    loading: false,
    error: false,
  });

  const getQuotes = useCallback(async () => {
    try {
      setQuotes({ ...quotes, loading: true });
      const { data } = await axios.get("https://zenquotes.io/api/quotes");
      setQuotes({ ...quotes, quotesAll: data, loading: false });
    } catch (error) {
      setQuotes({ ...quotes, loading: false, error: true });
    }
  }, []);

  useEffect(() => {
    getQuotes();
  }, []);

  return (
    <Section>
      <Heading>Top Quotes of the Day!</Heading>

      <UL>
        {quotes.quotesAll?.slice(0, 5)?.map((quote, idx) => (
          <LI key={idx}>
            ({idx + 1}) {quote.quote}
          </LI>
        ))}
      </UL>
    </Section>
  );
};

export default Quotes;
