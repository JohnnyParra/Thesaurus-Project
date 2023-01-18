import React from 'react'
import { nanoid } from 'nanoid'
import './Results.css'


export default function Results(props: any) {

  if(props.isLoading){
    return <h2>Loading...</h2>
  }

  if(props.data.length == 0) return <h2>No Data Found</h2>;

  const resultsElement = props.data?.map((word: any, i: number) => {
    if(i % 2 == 0){
      return <p key={nanoid()} id={word.word} onClick={(event: any) => props.handleWordClick(event)} style={{color: '#000000'}} className="word">{word.word}</p>
    } else{
      return <p key={nanoid()} id={word.word} onClick={(event: any) => props.handleWordClick(event)} className="word">{word.word}</p>
    }
  })

  return(
    <>
      {resultsElement}
    </>
  )
}