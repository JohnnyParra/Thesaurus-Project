// Libraries
import { useState } from 'react'
import { useQuery } from 'react-query'

// Components
import Results from './components/Results/Results'
import Button from './components/common/Button'

// API requests
import { synonymSearch, rhymeSearch, adjectiveSearch } from './ApiServices/Requests';

// Styling
import './App.css'


export default function App() {
  const [search, setSearch] = useState('')
  const [btnSelected, setBtnSelected] = useState('syn');


// Handles Enter key inside search bar
  const onEnter = (event: any) => {
    if(event.key === 'Enter'){
      if(btnSelected === 'syn'){
        synRefetch()
      } else if (btnSelected === 'rhy'){
        rhyRefetch()
      } else{
        adjRefetch()
      }
    }
  }


// Handles button clicks
  const handleClick = (event: any) => {
    const name = event.target.name
    setBtnSelected(name);
    if(name === 'syn'){
      synRefetch()
    } else if (name === 'rhy'){
      rhyRefetch()
    } else{
      adjRefetch()
    }
  }


// Synonym query
  const { data: synData, isLoading: synLoading, refetch: synRefetch } = useQuery(
    'synonym', 
    () => synonymSearch(search),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      select: (data: any) => {
        return data.filter((word: any) => ('tags' in word && word.tags.includes('syn')));
      }
    }
  );


// rhyme query
  const { data: rhyData, isLoading: rhyLoading, refetch: rhyRefetch } = useQuery(
    'rhyme',
    () => rhymeSearch(search),
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );


// adjective query
  const { data: adjData, isLoading: adjLoading, refetch: adjRefetch } = useQuery(
    'adjective',
    () => adjectiveSearch(search),
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );

  
// which data to display
  let Data;
  let loading;
  if(btnSelected === 'syn'){
    Data = synData;
    loading = synLoading
  } else if (btnSelected === 'rhy'){
    Data = rhyData;
    loading = rhyLoading
  } else if (btnSelected == 'adj') {
    Data = adjData;
    loading = adjLoading
  }

// Results component
  const results = Data === undefined ? 
    <h2>No Word Entered</h2> : <Results data={Data} isLoading={loading} />;

  return(
    <div className="main-container">
      <div className="nav">
        <h1>Thesaurus</h1>
        <input 
          type="text" 
          name="word"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(event) => onEnter(event)}
          placeholder="Enter a Word"
        />
      </div>
      <div className="block"></div>
      <div className="results-container">
        <div className="btn-options">
          <Button 
            handleClick={handleClick} 
            isSelected={btnSelected} 
            text='synonym' 
            name='syn' 
          />
          <Button 
            handleClick={handleClick} 
            isSelected={btnSelected} 
            text='rhyme' 
            name='rhy' 
          />
          <Button 
            handleClick={handleClick} 
            isSelected={btnSelected} 
            text='related adjectives' 
            name='adj' 
          />
        </div>
        {results}
      </div>
    </div>
  )
}