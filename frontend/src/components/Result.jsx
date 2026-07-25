import React from "react";

function Result({ prediction })
{
    if (!prediction)
    {
        return null;
    }

    const isPass = prediction === "PASS";

    return (
        <div className={isPass ? "result pass" : "result fail"}>

            <h2>
                {isPass ? "🎉 PASS" : "❌ FAIL"}
            </h2>

            <p>
                Student is predicted to
                <strong> {prediction}</strong>
            </p>

            {
                isPass ?
                (
                    <p className="message">
                        Congratulations! The student is likely to pass the examination.
                    </p>
                )
                :
                (
                    <p className="message">
                        The student may need additional preparation to improve performance.
                    </p>
                )
            }

        </div>
    );
}

export default Result;