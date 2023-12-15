import '../QuoteBlock.css';
import generateRandomHexColor from '../generateRandomHexColor';
import { useState, useEffect, useCallback } from 'react';
import { quoteArray, QuoteData } from '../getQuotes';
import copySvg from '../copy.svg';

function getRandomIndex(arrayLength: number): number {
  return Math.floor(Math.random() * arrayLength);
}

function QuoteBlock() {
  const [quotes, setQuotes] = useState<QuoteData['quotes']>([]);
  const [selectedQuote, setSelectedQuote] = useState<
    QuoteData['quotes'][0] | null
  >(null);
  const [backgroundColor, setBackgroundColor] = useState<string>('white');

  const handleButtonClick = useCallback(() => {
    setSelectedQuote(quotes[getRandomIndex(quotes.length)]);
    setBackgroundColor(generateRandomHexColor());
  }, [quotes]);

  const handleCopyToClipboard = useCallback(() => {
    if (selectedQuote) {
      navigator.clipboard.writeText(selectedQuote.quote);

      alert('Quote copied to clipboard!');
    }
  }, [selectedQuote]);

  useEffect(() => {
    setBackgroundColor(generateRandomHexColor());

    setQuotes(quoteArray.quotes);
    setSelectedQuote(
      quoteArray.quotes[getRandomIndex(quoteArray.quotes.length)]
    );

    return () => {
      const button = document.querySelector('.new__quote');
      button?.removeEventListener('click', handleButtonClick);
    };
  }, [handleButtonClick]);

  useEffect(() => {
    const button = document.querySelector('.new__quote');
    button?.addEventListener('click', handleButtonClick);

    return () => {
      button?.removeEventListener('click', handleButtonClick);
    };
  }, [handleButtonClick, quotes]);

  document.body.style.backgroundColor = backgroundColor;
  return (
    <div className="container">
      <div className="quote__row">
        <div className="quote__block">
          <div className="quote__text">
            <p style={{ color: backgroundColor }}>
              <span
                style={{ color: backgroundColor }}
                className="quotation__marks"
              >
                "
              </span>
              {selectedQuote?.quote}
            </p>
          </div>
          <div className="quote__author">
            <p style={{ color: backgroundColor }}>- {selectedQuote?.author}</p>
          </div>
          <button className="new__quote" style={{ backgroundColor }}>
            Наступна цитата
          </button>
          <div className="copy__quote" onClick={handleCopyToClipboard}>
            <img src={copySvg} alt="copy" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuoteBlock;
