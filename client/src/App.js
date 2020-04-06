import React, { useState, useEffect } from "react";
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";
import axios from "axios";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPaginationIndex, setCurrentPaginationIndex] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [allPostsCount, setAllPostsCount] = useState(0);

  useEffect(() => {
    setCurrentPaginationIndex(1);
  }, [postsPerPage]);

  useEffect(() => {
    let startIndex =
      currentPaginationIndex === 1
        ? currentPaginationIndex
        : (currentPaginationIndex - 1) * postsPerPage + 1;

    const fetchPosts = async () => {
      setLoading(true);
      const { posts, totalRecords } = (
        await axios.get(
          `http://localhost:5000/getPosts/${startIndex}/${postsPerPage}`
        )
      ).data;
      setPosts(posts);
      setAllPostsCount(totalRecords);
      setLoading(false);
    };

    fetchPosts();
  }, [currentPaginationIndex, postsPerPage]);

  // Change page
  const paginate = (pageNumber) => setCurrentPaginationIndex(pageNumber);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">List of Posts</h1>
      <select
        className="form-control"
        onChange={(evt) => setPostsPerPage(evt.target.value)}
      >
        <option value={5}>Choose items per page (Default is 5)</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
      <br />
      <Posts posts={posts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={allPostsCount}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
