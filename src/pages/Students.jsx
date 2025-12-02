import { useState, useEffect } from 'react';

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState('all'); // 'all' or 'single'

  useEffect(() => {
    fetch('https://dvonb.xyz/api/2025-fall/itis-3135/students?full=1')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        return response.json();
      })
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // 搜索过滤
  const filteredStudents = students.filter(student => {
    const fullName = `${student.name.first} ${student.name.last}`.toLowerCase();
    const search = searchTerm.toLowerCase();
    return fullName.includes(search) || student.prefix.toLowerCase().includes(search);
  });

  // 前进后退功能
  const handleNext = () => {
    if (currentIndex < filteredStudents.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) return <div>Loading students...</div>;
  if (error) return <div>Error: {error}</div>;

  // 显示的学生列表
  const displayStudents = viewMode === 'single' ? [filteredStudents[currentIndex]] : filteredStudents;

  return (
    <div className="students-page">
      <h1>ITIS 3135 Students</h1>
      
      {/* 搜索框 */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentIndex(0); // 搜索时重置到第一个
          }}
        />
      </div>

      {/* 显示模式切换 */}
      <div className="view-controls">
        <button onClick={() => setViewMode('all')}>Show All</button>
        <button onClick={() => setViewMode('single')}>Show One</button>
      </div>

      {/* 单个模式的导航按钮 */}
      {viewMode === 'single' && filteredStudents.length > 0 && (
        <div className="navigation-controls">
          <button onClick={handlePrevious} disabled={currentIndex === 0}>
            Previous
          </button>
          <span>Student {currentIndex + 1} of {filteredStudents.length}</span>
          <button onClick={handleNext} disabled={currentIndex === filteredStudents.length - 1}>
            Next
          </button>
        </div>
      )}

      {/* 学生卡片 */}
      <div className="students-grid">
        {displayStudents.map((student, index) => (
          <div key={student.prefix} className="student-card">
            <h2>
              {student.name.first} {student.name.middleInitial && student.name.middleInitial + '.'} {student.name.last}
            </h2>
            {student.name.preferred && <p><em>(Preferred: {student.name.preferred})</em></p>}
            <p><strong>ID:</strong> {student.prefix}</p>
            <p><strong>Mascot:</strong> {student.mascot}</p>
            {student.personalStatement && (
              <p><strong>About:</strong> {student.personalStatement.substring(0, 150)}...</p>
            )}
            {student.quote && (
              <blockquote>
                "{student.quote.text}" - {student.quote.author}
              </blockquote>
            )}
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && <p>No students found.</p>}
    </div>
  );
}

export default Students;