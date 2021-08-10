import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/ui/Header';
import CharacterGrid from './components/characters/CharacterGrid';
import axios from 'axios';
import Search from './components/ui/Search';
import Pagination from './components/Pagination';


const App = () => {

  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [charactersPerPage, setCharactersPerPage] = useState(10)

  useEffect(() =>{
      const fetchItem = async()=>{
          const result = await axios(`https://www.breakingbadapi.com/api/characters?name=${query }`)
          console.log(result.data);
          setItems(result.data)
          setIsLoading(false)
          
      }

      fetchItem()
  },[query])

  const indexOfLastCharacter = currentPage * charactersPerPage
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage
  const currentCharacters = items.slice(indexOfFirstCharacter, indexOfLastCharacter)

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
        <Header />
        <Search getQuery = {(q) => setQuery(q)}/>
        <CharacterGrid isLoading={isLoading} items={currentCharacters} />
        <Pagination charactersPerPage = {charactersPerPage} totalCharacters = {items.length} paginate={paginate}/>
    </div>
  );
}

export default App;