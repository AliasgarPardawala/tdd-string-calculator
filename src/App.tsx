import React, {useState} from "react";
import './App.css'
import {add} from "./calculator.ts";

interface SumHistory {
    input: string,
    answer: number | null,
    error: string | null
}

function App() {
    const [input, setInput] = useState<string>("")
    const [answer, setAnswer] = useState<number | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [history, setHistory] = useState<SumHistory[]>([])

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value)
        setAnswer(null)
        setError(null)
    }

    const handleSubmit = () => {
        const res: SumHistory = {
            input,
            answer: null,
            error: null
        }
        try {
            const a = add(input)
            setAnswer(a)
            res.answer = a
            setError(null)
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message)
                res.error = e.message
                setAnswer(null)
            }
        } finally {
            setHistory([...history, res])
        }
    }

    const renderInput = () => {
        return (
            <div>
                <span className={"input-label"}>Enter Input</span>
                <textarea
                    name={"input"}
                    onChange={(e) => handleInputChange(e)}
                />
            </div>
        )
    }

    const renderSubmitButton = () => {
        return (
            <div>
                <button onClick={handleSubmit}>
                    Calculate
                </button>
            </div>
        )
    }

    const renderOutput = () => {
        return (
            <div>
                {answer !== null &&
                    <span>Sum is: {answer}</span>
                }
                {error !== null &&
                    <span className={"danger"}>{error}</span>
                }
            </div>
        )
    }

    return (
        <>
            <h2>String Calculator</h2>
            {renderInput()}
            {renderSubmitButton()}
            {renderOutput()}
            <HistoryList history={history}/>
        </>
    )
}


const HistoryList = ({history}: { history: SumHistory[] }) => {
    if (!history.length) {
        return <></>
    }
    return (
        <>
            <h3>History</h3>
            <div className={"history-table"}>
                <div className={"history-list-item"}>
                    <span>Input</span>
                    <span>Output</span>
                </div>
                <div className={"scroll"}>
                    {history.map((calculation, index) =>
                        <div key={calculation.input + index} className={"history-list-item"}>
                            <span>{calculation.input}</span>
                            <span>{calculation.answer || calculation.error}</span>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default App
