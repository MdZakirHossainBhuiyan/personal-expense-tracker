import DisplayIncomeExpense from "./Components/DisplayIncomeExpense";
import FilterComponent from "./Components/FilterComponent";
import ItemList from "./Components/ItemList";
import SearchComponent from "./Components/SearchComponent";


function App() {
  return (
    <div>
      <main style={{"display": "flex", "flexDirection": "column"}}>
        <DisplayIncomeExpense />
        <FilterComponent />
        <SearchComponent />
        <ItemList />
      </main>
    </div>
  );
}

export default App;
