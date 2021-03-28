import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {gql} from "apollo-boost";
import {useMutation} from "@apollo/react-hooks";

const LIKE_MOVIE =gql`
  mutation toggleLikeMovie($id: Int!,$isLiked:Boolean!){
    toggleLikeMovie(id:$id,isLiked:$isLiked) @client #이 mutation이 backend로 보내지면 안되므로 client에 있다고 알려야함
 
  }
`;


const Container = styled.div`
  height: 380px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  border-radius: 7px;
`;

const Poster = styled.div`
  background-image: url(${props => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
`;

export default ({ id, bg ,isLiked}) => {
  const [toggleMovie]=useMutation(LIKE_MOVIE,{variables:{id:parseInt(id),isLiked}});//배열의 이름은 아무거나 상관없고 요점은 배열의 toggleMovie를 실행시키면 LOKE_MOVIE가 동작
  return(
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={bg} />
      </Link> 
      <button onClick={toggleMovie}>
        {isLiked ? "Unlike":"Like"} 
      </button>
    </Container>
  );//isLiked가 false일 때 likeMovie 실행됨
};
   