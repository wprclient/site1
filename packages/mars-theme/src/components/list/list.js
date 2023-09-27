import { connect, styled, decode } from "frontity";
import Item from "./list-item";
import Pagination from "./pagination";
import Link from "@frontity/components/link";
import adimage1 from "../../Assets/img/336x280.svg"
import Image from "@frontity/components/image";
import Lazyimg from "../../Assets/img/lazyimg.svg"
const List = ({ state }) => {
  // Get the data of the current list.
  const data = state.source.get(state.router.link);
  console.log('data',data)
  return (
    <Container>
      {/* If the list is a taxonomy, we render a title. */}
      {data.isTaxonomy && (
        <Header>
          {data.taxonomy}:{" "}
          <b>{decode(state.source[data.taxonomy][data.id].name)}</b>
        </Header>
      )}

      {/* If the list is for a specific author, we render a title. */}
      {data.isAuthor && (
        <Header>
          Author: <b>{decode(state.source.author[data.id].name)}</b>
        </Header>
      )}

      {/* Iterate over the items of the list. */}
      <ListMain>

        <PostMain>
          {data.items.map(({ type, id }) => {
            const item = state.source[type][id];
            // Render one Item component for each one.
            return <Item key={item.id} item={item} />;
          })}

        </PostMain>

        <SideBar>
          <SideOne>
            <Image
             style={{  backgroundImage: `url(${Lazyimg})` }}
             alt="ads" src={adimage1} /> 
          </SideOne>

          <SideTwo>
            <h2>Categories</h2>
            <ul>
              {Object.values(state.source.category)?.map(val =>
                <li>
                  <RecentPostMain>

                    {/* {val.acf.cate_image?.length ? <RecentPostImg>
                      <Image alt="cate-img" src={val.acf.cate_image} />
                    </RecentPostImg> : ""} */}

                    <Link link={val.link}> {val.name}</Link>
                  </RecentPostMain>
                </li>
              )}

            </ul>
          </SideTwo>
        </SideBar>


      </ListMain>

      <Pagination />
    </Container>
  );
};

export default connect(List);

const Container = styled.section`
width: 1220px;
margin: 0;
padding: 0px 50px;

@media(min-width:768px) and (max-width: 992px){
  width: 97.5%;
  padding: 0px 15px;
}

@media(min-width:320px) and (max-width: 767px){
  width: 100%;
  padding: 15px;
}


`;

const Header = styled.h3`
  font-weight: 300;
  text-transform: capitalize;
  color: rgba(12, 17, 43, 0.9);
`;

const ListMain = styled.div`
    width: 100%;
    margin-top: 20px;
    display:flex;

    @media(min-width:320px) and (max-width: 992px){
      display:block;
    }
`;

const PostMain = styled.div`
    width: 70%;
    margin-right:20px;

    @media(min-width:320px) and (max-width: 992px){
      width: 100%;
    }

`;

const SideBar = styled.div`
    width: 30%;
    height: max-content;
    margin-right: 20px;
    @media(min-width:320px) and (max-width: 767px){
    float: left;
    overflow: hidden;
    }
    h2{
      font-size: 20px;
      color: white;
      font-weight: 500;
      font-family: Open Sans, sans-serif;
    }

    p{
      font-family: revert;
      font-size: 17px;
      color: white;
      margin-bottom: 40px;
    }
    a{
      background: black;
    max-width: -webkit-max-content;
    max-width: -moz-max-content;
    max-width: max-content;
    color: white;
    padding: 13px 20px;
    }

    @media(min-width:320px) and (max-width: 767px){
      width: 100%;
      margin-right: 0px;
    }
    @media(min-width:768px) and (max-width: 992px){
      width: 100%;
      margin-right: 0px;
    }

`;

const SideOne = styled.div`
    @media(min-width:320px) and (max-width: 992px)
    {
      width: fit-content;
      padding: 20px;
      padding-bottom: 40px;
    }
`;

const SideTwo = styled.div`
background: #ffffff;
height:max-content;
margin-top:30px;
width:72%;
padding: 40px 50px 40px 50px;
float: left;
box-shadow: 0 0 10px rgba(232, 234, 237, 0.5);

@media(min-width:320px) and (max-width: 992px)
{
  width: 100%;
  padding: 20px;
}



h2{
  color: #000000;
  font-size: 20px;
  margin: 0;
}

h3{
  width:100%;
margin-top:0px;
}

ul{
  padding: 0;
  list-style: none;
  float: left;
}

li{
  float: left;
  width: 100%;
  border-top: 1px solid rgba(94,94,94,0.1);
}

`;

const RecentPostMain = styled.div`
   float: left;
    width: 100%;
    @media (min-width:320px) and (max-width:767px){
      margin-bottom: 15px;
    }
    
a{
  color: #5e5e5e;
  background: none;
  padding: 0px;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
    float: left;
    padding: 10px 0px;
    transition: all .2s ease-in-out;

    :hover{
      padding-left: 5px;
      transition: all .2s ease-in-out;
      color: #83b0de;
    }
}

`;


const RecentPostImg = styled.div`
    width: 67px;
    height: 67px;
    float: left;
    margin-right: 10px;

    img{
      max-width:100%;
      max-height: 100%;
    }

`;


