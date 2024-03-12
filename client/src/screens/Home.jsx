import React, { useState } from "react";
import Card from "../components/Card";
import { useProductContext } from "../Context/ProductContext";
import Carousel from "../components/Carousel";
import Loading from "../components/Loading";
import Error from "../components/Error";

const Home = () => {
  const [search, setSearch] = useState("");
  const { items, categoryData, isLoading, isError } = useProductContext();

  return (
    <div className="w-full h-full">
      <Carousel search={search} setSearch={setSearch} />
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error />
      ) : (
        <div className="text-white">
          {categoryData.map((data, index) => {
            return (
              <div className="flex flex-col px-12" key={index}>
                <h1 className="md:text-4xl text-3xl py-4 font-bold uppercase text-yellow-300">
                  {data.CategoryName}
                </h1>
                <div className="flex gap-8 flex-wrap w-full md:justify-start items-center flex-col md:flex-row">
                  {items
                    .filter(
                      (fooditems) =>
                        fooditems.CategoryName === data.CategoryName &&
                        fooditems.name
                          .toLowerCase()
                          .includes(search.toLowerCase())
                    )
                    .map((filterdItem, index) => {
                      return (
                        <Card
                          key={index}
                          items={filterdItem}
                          option={filterdItem.options[0]}
                        />
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
