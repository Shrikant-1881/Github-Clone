import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../Navbar";
import axios from "axios";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    //  console.log("UserId", userId);
    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `http://localhost:3002/repo/${userId}` //`http://16.170.241.205:3002/repo/user/${userId}`   //  ${server}
        ); //https://apna-github-backend.onrender.com

        const data = await response.json();
        // console.log(data);
        setRepositories(data.repositories);
      } catch (err) {
        console.error("Error while fetching repositories: ", err);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(`http://localhost:3002/repo/all`); //`http://16.170.241.205:3002/repo/all`    //${server}

        const data = await response.json();
        setSuggestedRepositories(data);
        //console.log(suggestedRepositories);
      } catch (err) {
        console.error("Error while fetching repositories: ", err);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (searchQuery == "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />

      <section id="dashboard">
        <aside>
          <h3>Suggested repositories</h3>
          {suggestedRepositories.map((repo) => {
            return (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description}</h4>
              </div>
            );
          })}
        </aside>
        <main>
          {" "}
          <h2>Your repositories</h2>
          <div id="search">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {Array.isArray(searchResults) ? (
            searchResults.length === 0 ? (
              <p>No repositories found.</p>
            ) : (
              searchResults.map((repo) => (
                <div key={repo._id}>
                  <h4>{repo.name}</h4>
                  <h4>{repo.description}</h4>
                </div>
              ))
            )
          ) : (
            <p>repositories...</p>
          )}
          {/* {searchResults.map((repo) => {
            console.log();
            return (
              <div key={repo._id}>
                <h4>{repo.name}</h4>
                <h4>{repo.description}</h4>
              </div>
            );
          })} */}
        </main>
        <aside>
          <h3>Upcoming Events</h3>
          <ul>
            <li>Test Conference - Feb 18</li>
          </ul>
          <ul>
            <li>Developer Meetup - Feb 20</li>
          </ul>
          <ul>
            <li>React Summit - Feb 23</li>
          </ul>
        </aside>
      </section>
    </>
  );
};

export default Dashboard;
