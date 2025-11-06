import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Price() {
  // Replace with your actual CoinAPI key
  const apiKey = "4D4CB7D2-3556-42E7-B31D-D7AC3658510C";

  // Grab the "symbol" from the route params
  const { symbol } = useParams();

  // API endpoint: fetch exchange rate for the symbol against USD
  const url = `https://rest.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${apiKey}`;

  // State to hold fetched data
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch coin data
  const getCoin = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCoin(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCoin();
  }, [symbol]); // re-fetch if symbol changes

  // Render loading state
  if (loading) return <h1>Loading...</h1>;

  // Render error if API returns an error
  if (!coin || coin.error) return <h1>Error fetching data</h1>;

  // Render coin data
  return (
    <div>
      <h1>
        {coin.asset_id_base} / {coin.asset_id_quote}
      </h1>
      <h2>Rate: {coin.rate}</h2>
      <p>Time: {new Date(coin.time).toLocaleString()}</p>
    </div>
  );
}
