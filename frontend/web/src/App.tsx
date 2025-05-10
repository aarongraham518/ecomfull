import React, {useState} from 'react';
import './App.css';
import Home from './pages/Home';
import { SearchInput } from './components/ui/search/SearchInput';

function App() {
  const [query, setQuery] = useState('');

  return (
    <div className="App">
      <SearchInput
        // label="Search"
        placeholder="Search Product"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        errorMessage={query.length > 20 ? 'Too long!' : ''}
      />
      <Home />
    </div>
  );
}

export default App;
