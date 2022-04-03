import Navbar from "../components/Navbar";
import UserResults from "../components/UserResults";
import { useState } from "react";
import { useParams } from "react-router-dom";

function Search() {
  let { searchText } = useParams();
  return (
    <div>
      <Navbar searchText={searchText} />
      <UserResults searchText={searchText} />
    </div>
  );
}

export default Search;
