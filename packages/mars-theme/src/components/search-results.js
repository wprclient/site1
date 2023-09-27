import { Global, css, connect, styled } from "frontity";
import List from "./list";
import { useRef } from "react";
import searchicon from "../Assets/img/searchicon.svg";
import Image from "@frontity/components/image";

const reverseFormat = (query) => query.replace("+", " ");

const SearchResults = ({ state, actions }) => {

  // Get information about the current URL.
  const data = state.source.get(state.router.link);

  // data.total → total pages that match the current path/url
  // data.searchQuery → query done to get search results
  const { total, searchQuery } = data;
  const isEmpty = data.total === 0;


  const inputRef = useRef();

  const handleSubmit = (event) => {
    // Prevent page navigation
    event.preventDefault();

    // Get the input's value
    const searchString = inputRef.current.value;

    // If the typed search string is not empty
    // Better to trim write spaces as well
    if (searchString.trim().length > 0) {
      // Let's go search for blogs that match the search string
      actions.router.set(`/?s=${searchString.toLowerCase()}`);

      // Scroll the page to the top
      window.scrollTo(0, 0);

      // Close the search modal
    }
  };
  return (
    <>
      <Global styles={globalStyles} />
      <div>
        <Container>
          <div className="main-top">
            <div className="search-result">
              <span>Search Results for: {`“${reverseFormat(searchQuery)}”`}</span>
              <IntroText size="thin">
                {isEmpty ? (
                  <Text>
                    We could not find any results for your search. You can give it
                    another try through the search form below.
                  </Text>
                ) : (
                  <Text>
                    We found {total} {total === 1 ? "result" : "results"} for your
                    search.
                  </Text>
                )}
              </IntroText>
            </div>



          </div>

        </Container>


        {isEmpty ? (
          <Container>
            <div className="search_input_main">
              <form onSubmit={handleSubmit}>
                <input type="search" placeholder="Search here..." ref={inputRef} />
                <button type="submit"><Image src={searchicon} alt="search button" /></button>
              </form>
            </div>
          </Container>
        ) : (
          <List showExcerpt={true} showMedia={false} />
        )}


      </div>
    </>
  );
};

export default connect(SearchResults);

const globalStyles = css`
.main-top {
  background: #ffffff;
  padding: 40px;
  margin-top: 22px;
}
.search_input_main{
  margin-top:24px;
}

`;

const Container = styled.section`
width: 1200px;
margin: 0;
padding: 0px 50px;

@media(min-width:768px) and (max-width: 992px){
  width: 100%;
  padding: 0px;
}



@media(min-width:320px) and (max-width: 767px){
  width: 100%;
  padding: 0px;
}

`;

const IntroText = styled("div")`
  width: 100%;
  margin-top: 0.5rem;
  font-weight: initial;

  @media (min-width: 700px) {
    font-size: 2rem;
    margin-top: 0.5rem;
  }
`;

const Text = styled.p`
  margin: 0 0 1em 0;
  &:last-child {
    margin-bottom: 0;
  }
`;

