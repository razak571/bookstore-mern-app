import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksCard from "../components/home/BooksCard";
import BooksTable from "../components/home/BooksTable";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const initialView = localStorage.getItem("view") || "table";
  const [showType, setShowType] = useState(initialView);
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseURL}/books`)
      .then((res) => {
        setBooks(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("view", showType);
  }, [showType]);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          onClick={() => setShowType("table")}
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
        >
          Table
        </button>
        <button
          onClick={() => setShowType("card")}
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
