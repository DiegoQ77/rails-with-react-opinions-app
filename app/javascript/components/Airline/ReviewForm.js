import React, { Fragment } from 'react'
import styled from 'styled-components'
import Gray from './Stars/Gray'
import Hover from './Stars/Hover'
import Selected from './Stars/Selected'


const RatingContainer = styled.div`
  text-align: center;
  border-radius: 4px;
  font-size: 18px;
  padding: 40px 0 10px 0;
  border: 1px solid #e6e6e6;
  background: #fff;
`
const RatingBox = styled.div`
  background: #fff;
  display: flex;
  justify-content: center;
  flex-direction: row-reverse;
  position: relative;
  margin-top: 12px;
  input {
    display: none;
  }
  label{
    cursor: pointer;
    width: 40px;
    height: 40px;
    background-image: url("data:image/svg+xml;charset=UTF-8,${Gray}");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 70%;
  }
  input:checked ~ label,
  input:checked ~ label ~ label {
    background-image: url("data:image/svg+xml;charset=UTF-8,${Selected}");
  }

  input:not(:checked) ~ label:hover,
  input:not(:checked) ~ label:hover ~ label {
    background-image: url("data:image/svg+xml;charset=UTF-8,${Hover}");;
  }

`
const Field = styled.div`
  border-radius: 4px;
  input {
    min-height: 50px;
    border-radius: 4px;
    border: 1px solid #e6e6e6;
    margin: 0 0 12px 0;
    padding: 12px;
    width: 97%;

  }

  textarea{
    width: 100%;
    min-height: 80%;
    border-radius: 4px;
    border: 1px;
    margin: 12px 0;
    padding: 12px;

  }


`

const Wrapper = styled.div`
  background: #fff;
  padding: 20px;
  background: #000;
  height: 100vh;
  padding-top: 100px;


`

const SubmitBtn = styled.div`
  text-align: center;
  color: #fff;
  background: #333;
  border-radius: 4px;
  padding: 12px;
  font-size: 18px;
  cursor: pointer;
  transition: ease-in-out 0.1s;
  border: 1px solid #fff;
  width: 97%;
  
  margin-top: 20px;

  &:hover {
    background: #fff;
    color: black;
    border: 1px solid #fff;
  }
`

const Headline = styled.div`
  padding: 20px;
  font-size: 30px;
  font-weight: bold;
  color: #fff;


`

const RatingTitle = styled.div`
 font-size: 20px;
 padding-bottom: 20px;
 font-weight: bold;
`

export const ReviewForm = (props) => {

  const ratingOptions = [5,4,3,2,1].map( (score, index) => {
    return (
      <Fragment>
        <input 
          type="radio" 
          value={score} 
          name="rating" 
          onChange={ () => console.log('selected',score)} 
          id={`rating-${score}`}
          checked={props.review.score}
        />
        <label onClick={props.setRating.bind(this, score)}></label>
      </Fragment>
    )
  })
  return (
    <Wrapper>
      <form onSubmit={props.handleSubmit}>
        <Headline>Have an experience with {props.attributes.name} share ypur review</Headline>
        <Field>
          <input type="text" name="title" value={props.review.title} placeholder="Review Title" onChange={props.handleChange}/>
        </Field>
        <Field>
          <input type="text" name="description" value={props.review.description} placeholder="Review Description" onChange={props.handleChange}/>
        </Field>
        <Field>
          <RatingContainer>
            <RatingTitle className="rating-title-text"> Rate This Airline</RatingTitle>
            <RatingBox>
             {ratingOptions}
            </RatingBox>
          </RatingContainer>
        </Field>
        <SubmitBtn type="submit"> Submit Your Review</SubmitBtn>
      </form>
    </Wrapper>
  )
}
