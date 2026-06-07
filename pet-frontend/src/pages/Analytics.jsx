import React, { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function Analytics() {

  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/pets"
      );

      setPets(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const dogCount =
    pets.filter(
      pet => pet.type === "Dog"
    ).length;

  const catCount =
    pets.filter(
      pet => pet.type === "Cat"
    ).length;

  const birdCount =
    pets.filter(
      pet => pet.type === "Bird"
    ).length;

  const rabbitCount =
    pets.filter(
      pet => pet.type === "Rabbit"
    ).length;

  const data = [
    {
      name: "Dogs",
      value: dogCount
    },
    {
      name: "Cats",
      value: catCount
    },
    {
      name: "Birds",
      value: birdCount
    },
    {
      name: "Rabbit",
      value: rabbitCount
    }
  ];

  const COLORS = [
    "#0d6efd",
    "#20c997",
    "#ffc107",
    "#dc3545"
  ];

  return (

    <div className="container py-5">

      <BackButton destination="/admin" />

      <h1 className="fw-bold mb-4">
        Analytics Dashboard
      </h1>

      {/* Summary Cards */}

      <div className="row mb-5">

        <div className="col-lg-2 col-md-4 col-sm-6 mb-3">

          <div
            className="card border-0 shadow text-white"
            style={{
              background:
                "linear-gradient(135deg,#0d6efd,#4dabf7)"
            }}
          >

            <div className="card-body text-center">

              <h6>Total Pets</h6>

              <h2>{pets.length}</h2>

            </div>

          </div>

        </div>

        <div className="col-lg-2 col-md-4 col-sm-6 mb-3">

          <div
            className="card border-0 shadow text-white"
            style={{
              background:
                "linear-gradient(135deg,#20c997,#63e6be)"
            }}
          >

            <div className="card-body text-center">

              <h6>Dogs</h6>

              <h2>{dogCount}</h2>

            </div>

          </div>

        </div>

        <div className="col-lg-2 col-md-4 col-sm-6 mb-3">

          <div
            className="card border-0 shadow text-white"
            style={{
              background:
                "linear-gradient(135deg,#ffc107,#ffd43b)"
            }}
          >

            <div className="card-body text-center">

              <h6>Cats</h6>

              <h2>{catCount}</h2>

            </div>

          </div>

        </div>

        <div className="col-lg-2 col-md-4 col-sm-6 mb-3">

          <div
            className="card border-0 shadow text-white"
            style={{
              background:
                "linear-gradient(135deg,#dc3545,#ff6b6b)"
            }}
          >

            <div className="card-body text-center">

              <h6>Birds</h6>

              <h2>
                {birdCount}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-lg-2 col-md-4 col-sm-6 mb-3">

          <div
            className="card border-0 shadow text-white"
            style={{
              background:
                "linear-gradient(135deg,#20d012,#20d345)"
            }}
          >

            <div className="card-body text-center">

              <h6>Rabbits</h6>

              <h2>{rabbitCount}</h2>

            </div>

          </div>

        </div>

      </div>

      <div className="row">

        {/* Pie Chart */}

        <div className="col-lg-6 mb-4">

          <div
            className="card shadow border-0 rounded-4"
          >

            <div className="card-body">

              <h4 className="fw-bold mb-4">
                Pets By Category
              </h4>

              <ResponsiveContainer
                width="100%"
                height={350}
              >

                <PieChart>

                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    label
                  >

                    {data.map(
                      (entry, index) => (

                        <Cell
                          key={index}
                          fill={
                            COLORS[index %
                            COLORS.length]
                          }
                        />

                      )
                    )}

                  </Pie>

                  <Tooltip />

                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        {/* Bar Chart */}

        <div className="col-lg-6 mb-4">

          <div
            className="card shadow border-0 rounded-4"
          >

            <div className="card-body">

              <h4 className="fw-bold mb-4">
                Pet Statistics
              </h4>

              <ResponsiveContainer
                width="100%"
                height={350}
              >

                <BarChart data={data}>

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    fill="#0263f6"
                    radius={[
                      10,
                      10,
                      0,
                      0
                    ]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;