import React, { useState } from "react";
import StudentForm from "./components/StudentForm";
import Result from "./components/Result";
import api from "./api";
import "./App.css";

function App()
{
    const [prediction, setPrediction] = useState("");
    const [loading, setLoading] = useState(false);

    const predictStudent = async (studentData) =>
    {
        setLoading(true);

        try
        {
            const response = await api.post("/predict", studentData);

            setPrediction(response.data.prediction);
        }
        catch(error)
        {
            alert("Unable to connect to the backend.");

            console.log(error);
        }

        setLoading(false);
    };

    return (
        <div className="container">

            <div className="card">

                <h1>Student Performance Analysis</h1>

                
                <StudentForm
                    predictStudent={predictStudent}
                    loading={loading}
                />

                <Result prediction={prediction}/>

            </div>

        </div>
    );
}

export default App;