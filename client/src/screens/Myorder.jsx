import React, { useEffect, useState } from "react";
import axios from "axios";

const Myorder = () => {
  const [orderedData, setOrderedData] = useState({});
  const email = localStorage.getItem("userEmail");
  const myOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/myOrder",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      if (response) setOrderedData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   myOrder();
  // }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          {orderedData.length !== 0
            ? Array(orderedData).map((data) => {
                return data.orderedData
                  ? data.orderedData.orderData
                      .slice(0)
                      .reverse()
                      .map((item) => {
                        return item.map((arrayData) => {
                          return (
                            <div>
                              {arrayData.Order_Date ? (
                                <div className="m-auto mt-5">
                                  {(data = arrayData.Order_Date)}
                                  <hr />
                                </div>
                              ) : (
                                <div className="col-12 col-md-6 col-lg-3">
                                  <div
                                    className="card mt-3"
                                    style={{
                                      width: "16rem",
                                      maxHeight: "360px",
                                    }}
                                  >
                                    <img
                                      src={arrayData.img}
                                      className="card-img-top"
                                      alt="..."
                                      style={{
                                        height: "120px",
                                        objectFit: "fill",
                                      }}
                                    />
                                    <div className="card-body">
                                      <h5 className="card-title">
                                        {arrayData.name}
                                      </h5>
                                      <div
                                        className="container w-100 p-0"
                                        style={{ height: "38px" }}
                                      >
                                        <span className="m-1">
                                          {arrayData.qty}
                                        </span>
                                        <span className="m-1">
                                          {arrayData.size}
                                        </span>
                                        <span className="m-1">{data}</span>
                                        <div className=" d-inline ms-2 h-100 w-20 fs-5">
                                          ₹{arrayData.price}/-
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        });
                      })
                  : "";
              })
            : ""}
        </div>
      </div>
    </div>
  );
};

export default Myorder;
