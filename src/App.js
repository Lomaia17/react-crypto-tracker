import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Coin from "./components/coinitem/Coin";
import ReactPaginate from "react-paginate";
function App() {
  const [fetchedCoins, setFetchedCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const coinsPerPage = 9;
  const coinsVisited = pageNumber * coinsPerPage;
  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        setFetchedCoins(resp.data);
        console.log(resp.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const filteredCoins = fetchedCoins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );
  const displayCoins = filteredCoins
    .slice(coinsVisited, coinsVisited + coinsPerPage)
    .map((coin) => {
      return (
        <Coin
          key={coin.id}
          name={coin.name}
          price={coin.current_price}
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          volume={coin.total_volume}
          image={coin.image}
          priceChange={coin.price_change_percentage_24h}
        />
      );
    });
  const pageCount = Math.ceil(fetchedCoins.length / coinsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div>
      <div className="header">
        <h1 className="brand">
          <i className="fas fa-moon"></i> Gio's Currency
        </h1>
        <form>
          <input
            className="inputField"
            type="text"
            onChange={handleChange}
            placeholder="Search a Coin"
          />
        </form>
      </div>
      <div className="coinsContainer">
        {/* {filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.market_cap}
              volume={coin.total_volume}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}
            />
          );
        })} */}
        {displayCoins}
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </div>
  );
}

export default App;
