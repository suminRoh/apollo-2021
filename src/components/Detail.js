import React from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import styled from "styled-components";
//해당 id클릭하면 detail 페이지로 넘어가는 코드 

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`   
  margin-left: 10px;
  width:50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${props => props.bg});
  background-size: cover;
  background-position: center center;
`;


const GET_MOVIE=gql` #query에 variable이 있다면 그것을 적어줘야 함
    query getMovie($id: Int!){# Apollo만을 위한 것 변수 type 검사
        movie(id:$id){ # 이 query는 server로 전달
        id # id를 줘서 movie detail의 id가 movie list와 연관되어 있다는 것을 알려줘서 데이터가 변경될 때 같이 변경되도록 해줘야함
        title
        medium_cover_image
        language
        rating
        description_intro
        isLiked @client
        }
        suggestions(id:$id){
        id
        medium_cover_image
        }
    } 
   
`;

export default() => {
    let {id}=useParams();//parameter를 얻을 수 있음 
    const { loading, data } = useQuery(GET_MOVIE, {variables: { id:parseInt(id)}});
    return (//data를 바로 요청하면 error가 날 수 있으므로 삼항연산자로 만들어줘야 함
        <Container>
          <Column>
            <Title>{loading ? "Loading...": `${data.movie.title} ${data.movie.isLiked?"♥":"♨"}`}</Title> //title에 data.movie.title과 isLiked의 boolean에 따라 이모티콘 표시됨

            <Subtitle>{data?.movie?.language}·{data?.movie?.rating}</Subtitle>
            <Description>{data?.movie?.description_intro} </Description>

          </Column>
          <Poster bg={data?.movie?.medium_cover_image}></Poster>
        </Container>
      );
      /*
      data가 있는지 확인해야 함
      optional chaining을 이용해서 ?만으로 삼항연산자 대신 존재여부 확인 가능
      */
      

 

};

