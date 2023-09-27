import { connect, styled } from "frontity";
import { useRef } from "react";
import searchicon from "../Assets/img/searchicon.svg";
import Image from "@frontity/components/image";

const SearchForm = ({ state, actions, libraries }) => {
  const parse = libraries.source.parse(state.router.link);
  const searchQuery = parse.query["s"];
  // Keep a reference to the input so we can grab it's value on form submission
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
      actions.theme.searchtoggle();
    }
  };

  return (
    <div className="search_input_main">
      <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Search here..." ref={inputRef} />
      <button type="submit"><Image src={searchicon} alt="search button" /></button>
      </form>
    </div>
  );
};

export default connect(SearchForm);


