import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Data from '../../assets/450DSAFinal';

function String() {
    // Filter the topics as per the position (2 in this case)
    const filteredData = Data.filter((topic) => topic.position === 2);

    // State to keep track of "Done" status
    const [questionStatus, setQuestionStatus] = useState(() =>
        filteredData.map((topic) =>
            topic.questions.map((question) => ({
                ...question,
                Done: question.Done || false, // Initialize the "Done" state
            }))
        )
    );

    // Toggle "Done" status
    const handleToggleDone = (topicIndex, questionIndex) => {
        const updatedStatus = [...questionStatus];
        updatedStatus[topicIndex][questionIndex].Done = !updatedStatus[topicIndex][questionIndex].Done;
        setQuestionStatus(updatedStatus);
    };

    return (
        <React.Fragment>
            <Navbar />
            <div className="abtusheading">{filteredData[0]?.topic || 'Strings'}</div> {/* Fallback text if no topic */}
            <div id="tableContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Topic</th>
                            <th>Problem</th>
                            <th>Done</th>
                            <th>Bookmark</th>
                            <th>Notes</th>
                            <th>URL</th>
                            <th>URL2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((topic, topicIndex) =>
                            topic.questions.map((question, questionIndex) => (
                                <tr key={questionIndex}>
                                    <td>{question.Topic}</td>
                                    <td>{question.Problem}</td>
                                    <td>
                                        <button
                                            className={`done-btn ${questionStatus[topicIndex][questionIndex].Done ? 'done-yes' : 'done-no'}`}
                                            onClick={() => handleToggleDone(topicIndex, questionIndex)}
                                        >
                                            {questionStatus[topicIndex][questionIndex].Done ? 'Yes' : 'No'}
                                        </button>
                                    </td>
                                    <td>{question.Bookmark ? 'Yes' : 'No'}</td>
                                    <td>{question.Notes}</td>
                                    <td>
                                        <a href={question.URL} target="_blank" rel="noopener noreferrer">
                                            Link 1
                                        </a>
                                    </td>
                                    <td>
                                        <a href={question.URL2} target="_blank" rel="noopener noreferrer">
                                            Link 2
                                        </a>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default String;
