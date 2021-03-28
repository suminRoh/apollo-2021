import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const cache = new InMemoryCache();
const link = new createHttpLink({
    uri: "http://localhost:4000/", //전에 grqphql강의에서 localhost:4000으로 가져왔던 query data를 이용하기위함
    
    resolvers:{//백엔드나 api에서 resolve를 하는 역할을 담당
        Movie:{
            isLiked:()=>false
        }
    },
    Mutation:{
        toggleLikeMovie:(_,{id,isLiked},{cache})=>{
            cache.writeData({//id나 data등 원하는 데이터를 변경할 수 있음
                id:`Movie:${id}`,
                data:{
                    isLiked:!isLiked //true면 false,false면 true로 바꿔줌 
                }
            });
        }
    } 
    
});

const client = new ApolloClient({
cache: cache,
link: link,

})

export default client;