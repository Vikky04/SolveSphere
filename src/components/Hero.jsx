import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  const roles = [
    'Student',
    'Bootcamp Grad',
    'Self-Taught Developer',
    'Job Hunter',
    'Code Lover',
    'Tech Explorer',
    'Programming Newbie',
    'Aspiring Coder',
    'Software Enthusiast',
    'Code Mentor',
  ];

  const topics = [
    'Arrays', 'Linked Lists', 'Stacks & Queues', 'Dynamic Programming',
    'Graphs', 'Trees', 'Binary Search', 'Recursion',
    'Sorting Algorithms', 'Greedy Algorithms',
    'Backtracking', 'Bit Manipulation', 'Heap', 'Trie', 'Segment Tree',
    'Mathematics', 'Number Theory', 'Graph Algorithms', 'String Matching',
    'Matrix', 'Sliding Window', 'Topological Sorting', 'Union Find'
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isErasing, setIsErasing] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [solvedProblems, setSolvedProblems] = useState(
    JSON.parse(localStorage.getItem('solvedProblems')) || []
  );

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const delay = isErasing ? 100 : 200;

    if (!isErasing && displayedRole === currentRole) {
      setTimeout(() => setIsErasing(true), 1000);
    } else if (isErasing && displayedRole === '') {
      setIsErasing(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedRole((prev) =>
          isErasing
            ? currentRole.slice(0, prev.length - 1)
            : currentRole.slice(0, prev.length + 1)
        );
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [displayedRole, isErasing, roles, currentRoleIndex]);

  const handleTopicChange = (e) => {
    setSelectedTopic(e.target.value);
  };

  const handleSolveProblem = () => {
    const today = new Date().toISOString().slice(0, 10); // Get current date (YYYY-MM-DD)
    const newSolvedProblems = [...solvedProblems, today];
    setSolvedProblems(newSolvedProblems);
    localStorage.setItem('solvedProblems', JSON.stringify(newSolvedProblems));
  };

  const renderCalendar = () => {
    const today = new Date().toISOString().slice(0, 10);
    const solvedSet = new Set(solvedProblems);

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '8px',
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: '8px',
        }}
      >
        {/* Generate mock-up of 30 days */}
        {[...Array(30)].map((_, index) => {
          const date = new Date();
          date.setDate(index + 1);
          const formattedDate = date.toISOString().slice(0, 10);
          return (
            <div
              key={formattedDate}
              style={{
                height: '30px',
                width: '30px',
                backgroundColor: solvedSet.has(formattedDate) ? 'green' : 'lightgrey',
                borderRadius: '50%',
                display: 'inline-block',
                textAlign: 'center',
                lineHeight: '30px',
                color: 'white',
                cursor: 'pointer',
              }}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div id="hero" style={{ padding: '12rem 2rem 2rem', backgroundColor: '#f8f9fa' }}>
      <div style={{ marginBottom: '40px' }}>
        <h2 id="heading">
          DSA Placement Preparation with <span style={{ color: 'blue' }}>SolveSphere</span>
        </h2>
        <div className="text">
          If you're <span id="role">{displayedRole}</span>
          <span className="cursor">|,<br /></span>
          Begin solving and cracking problems like a pro—click below!
        </div>
      </div>
      <Link to="/problems">
        <button id="unlock-button">Start Here</button>
      </Link>

      {/* DSA Topics Dropdown Section */}
      <div id="dsaTopics" style={{ margin: '2rem 0', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Explore DSA Topics:</h3>
        <select
          value={selectedTopic}
          onChange={handleTopicChange}
          style={{
            padding: '0.75rem 1.25rem',
            fontSize: '1rem',
            borderRadius: '8px',
            background: '#007bff',
            color: 'white',
            border: 'none',
          }}
        >
          <option value="" disabled>Select a topic</option>
          {topics.map((topic, index) => (
            <option key={index} value={topic.toLowerCase().replace(' ', '-')}>
              {topic}
            </option>
          ))}
        </select>

        {selectedTopic && (
          <Link
            to={`/topics/${selectedTopic}`}
            style={{
              display: 'inline-block',
              marginTop: '1rem',
              textDecoration: 'none',
              color: 'white',
              background: '#28a745',
              padding: '0.75rem 1.25rem',
              borderRadius: '8px',
              fontSize: '1rem',
            }}
          >
            Go to {selectedTopic.replace('-', ' ')} Topics
          </Link>
        )}

        {/* Calendar inside Explore DSA Topics */}
        <div style={{ marginTop: '3rem' }}>
          <h3>Track your solved problems</h3>
          {renderCalendar()}
        </div>
      </div>

      {/* Problem of the Day Section */}
      <div
        id="problemOfTheDay"
        style={{
          marginTop: '3rem',
          padding: '1.5rem',
          background: '#f1f1f1',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: '10px',
          textAlign: 'center',
        }}
      >
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Problem of the Day</h3>
        <div>
          <h4 style={{ textDecoration: 'underline' }}>Two Sum</h4>
          <p>• Array • Hash Table</p>
          <button
            onClick={handleSolveProblem}
            style={{
              textDecoration: 'none',
              color: '#fff',
              background: '#28a745',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
            }}
          >
            Solve Now 🚀
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
