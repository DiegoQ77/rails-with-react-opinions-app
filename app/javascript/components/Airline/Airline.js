import React, {useState, useEffect, Fragment } from 'react'
import {useParams} from "react-router-dom"
import axios from 'axios'
import { Header } from './Header'
import  styled from 'styled-components'
import { ReviewForm } from './ReviewForm'


const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`
const Column = styled.div`
  background: #fff;
  height: 100vh;
  overflow: scroll;

  &:last-child{
    background: #000;
  }
`
const Main = styled.div`
  padding-left: 50px;

`


export const Airline = ( props ) => {
  const match = useParams()
  const [ airline, setAirline ] = useState({data:{}})
  const [review, setReview ] = useState({})
  const [loaded, setLoaded] = useState(false)

  useEffect( () => {
    const slug = match.slug
    const url = `/api/v1/airlines/${slug}`
    const getData = async () => {
      await axios.get(url)
        .then( resp => {
          setAirline(resp.data),
          setLoaded(true)
        })
        .catch(resp => console.log(resp))
    }
    getData()
  }, [])

  const handleChange = (e) => {
    console.log('test')

    e.preventDefault()
    setReview(Object.assign({}, review, {[e.target.name]: e.target.value}))

  }

  const handleSubmit = (e) => {
    console.log('test')
    e.preventDefault()
    
    const csrfToken = document.querySelector('[name=csrf-token]').content 
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    const airline_id = airline.data.id 
    axios.post('/api/v1/reviews', {review, airline_id})
      .then( resp => {
        const included = [ ...airline.included, resp.data ]
        setAirline({...airlinem, included})
        setReview({title:'', description:'', score: 0})
      })
      .catch( resp => {
      })
  }

  const setRating = (score, e) => {
    e.preventDefault
    setReview({...review, score})
  }

  return (
    <Wrapper>
    { 
      loaded && 
      <Fragment>
        <Column>
          <Main>
            <Header 
              attributes={airline.data.attributes}
              reviews={airline.included}
            />
          <div className="reviews"></div>
          </Main>
        </Column>
      <Column>
        <ReviewForm 
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          attributes={airline.data.attributes}
          setRating={setRating}
          review={review}

        />
      </Column>
    </Fragment>
    }

    </Wrapper>
  )
}
