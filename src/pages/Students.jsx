import { useState, useEffect } from 'react';

function Students() {
  // State for students data
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for search and navigation
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // State for checkboxes - control what info to display
  const [showOptions, setShowOptions] = useState({
    name: true,
    mascot: true,
    image: true,
    personalStatement: true,
    backgrounds: true,
    classes: true,
    extraInfo: true,
    quote: true,
    links: true
  });

  // Fetch students data when component loads
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

  // Filter students by search term (first name or last name)
  const filteredStudents = students.filter(student => {
    if (!searchTerm) return true;
    
    const search = searchTerm.toLowerCase();
    const firstName = (student.name?.first || '').toLowerCase();
    const lastName = (student.name?.last || '').toLowerCase();
    const prefix = (student.prefix || '').toLowerCase();
    
    return firstName.includes(search) || 
           lastName.includes(search) || 
           prefix.includes(search);
  });

  // Handle checkbox changes
  const handleCheckboxChange = (option) => {
    setShowOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  // Navigation functions
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

  // Loading state
  if (loading) {
    return <div className="students-page">Loading students...</div>;
  }

  // Error state
  if (error) {
    return <div className="students-page">Error: {error}</div>;
  }

  // Get current student for slideshow
  const currentStudent = filteredStudents[currentIndex];

  return (
    <div className="students-page">
      <h1>ITIS 3135 Students</h1>
      
      {/* Counter showing number of students found */}
      <div className="student-counter">
        <strong>Students Found: {filteredStudents.length}</strong>
      </div>

      {/* Search box */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or ID..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentIndex(0);
          }}
        />
      </div>

      {/* Checkboxes to control what info to display */}
      <div className="checkbox-controls">
        <h3>Display Options:</h3>
        <div className="checkbox-grid">
          <label>
            <input
              type="checkbox"
              checked={showOptions.name}
              onChange={() => handleCheckboxChange('name')}
            />
            Name
          </label>
          
          <label>
            <input
              type="checkbox"
              checked={showOptions.mascot}
              onChange={() => handleCheckboxChange('mascot')}
            />
            Mascot
          </label>
          
          <label>
            <input
              type="checkbox"
              checked={showOptions.image}
              onChange={() => handleCheckboxChange('image')}
            />
            Image
          </label>
          
          <label>
            <input
              type="checkbox"
              checked={showOptions.personalStatement}
              onChange={() => handleCheckboxChange('personalStatement')}
            />
            Personal Statement
          </label>
          
          <label>
            <input
              type="checkbox"
              checked={showOptions.backgrounds}
              onChange={() => handleCheckboxChange('backgrounds')}
            />
            Backgrounds
          </label>
          
          <label>
            <input
              type="checkbox"
              checked={showOptions.classes}
              onChange={() => handleCheckboxChange('classes')}
            />
            Classes
          </label>
          
          <label>
            <input
              type="checkbox"
              checked={showOptions.extraInfo}
              onChange={() => handleCheckboxChange('extraInfo')}
            />
            Extra Information
          </label>
          
          <label>
            <input
              type="checkbox"
              checked={showOptions.quote}
              onChange={() => handleCheckboxChange('quote')}
            />
            Quote
          </label>
          
          <label>
            <input
              type="checkbox"
              checked={showOptions.links}
              onChange={() => handleCheckboxChange('links')}
            />
            Links
          </label>
        </div>
      </div>

      {/* Slideshow navigation buttons */}
      {filteredStudents.length > 0 && (
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

      {/* Display current student */}
      {filteredStudents.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <div className="student-display">
          <div className="student-card">
            {/* Name */}
            {showOptions.name && (
              <div className="student-section">
                <h2>
                  {currentStudent.name?.first || ''}{' '}
                  {currentStudent.name?.middleInitial && `${currentStudent.name.middleInitial}. `}
                  {currentStudent.name?.last || ''}
                </h2>
                {currentStudent.name?.preferred && (
                  <p><em>Preferred: {currentStudent.name.preferred}</em></p>
                )}
                <p><strong>ID:</strong> {currentStudent.prefix}</p>
              </div>
            )}

            {/* Image */}
            {showOptions.image && currentStudent.media?.hasImage && (
              <div className="student-section">
                <img 
                  src={`https://dvonb.xyz${currentStudent.media.src}`}
                  alt={`${currentStudent.name?.first} ${currentStudent.name?.last}`}
                  className="student-image"
                  style={{ maxWidth: '300px', height: 'auto', borderRadius: '8px' }}
                />
                {currentStudent.media.caption && (
                  <p><em>{currentStudent.media.caption}</em></p>
                )}
              </div>
            )}

            {/* Mascot */}
            {showOptions.mascot && currentStudent.mascot && (
              <div className="student-section">
                <p><strong>Mascot:</strong> {currentStudent.mascot}</p>
              </div>
            )}

            {/* Personal Statement */}
            {showOptions.personalStatement && currentStudent.personalStatement && (
              <div className="student-section">
                <h3>Personal Statement</h3>
                <p>{currentStudent.personalStatement}</p>
              </div>
            )}

            {/* Backgrounds */}
            {showOptions.backgrounds && (
              <div className="student-section">
                <h3>Background</h3>
                {currentStudent.backgrounds?.personal && (
                  <div>
                    <h4>Personal</h4>
                    <p>{currentStudent.backgrounds.personal}</p>
                  </div>
                )}
                {currentStudent.backgrounds?.professional && (
                  <div>
                    <h4>Professional</h4>
                    <p>{currentStudent.backgrounds.professional}</p>
                  </div>
                )}
                {currentStudent.backgrounds?.academic && (
                  <div>
                    <h4>Academic</h4>
                    <p>{currentStudent.backgrounds.academic}</p>
                  </div>
                )}
              </div>
            )}

            {/* Classes */}
            {showOptions.classes && currentStudent.courses && currentStudent.courses.length > 0 && (
              <div className="student-section">
                <h3>Classes</h3>
                <ul>
                  {currentStudent.courses.map((course, idx) => (
                    <li key={idx}>
                      <strong>{course.code}:</strong> {course.name}
                      {course.reason && <em> - {course.reason}</em>}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Extra Information */}
            {showOptions.extraInfo && (
              <div className="student-section">
                <h3>Extra Information</h3>
                {currentStudent.platform && (
                  <p><strong>Computer:</strong> {currentStudent.platform.device} ({currentStudent.platform.os})</p>
                )}
                {currentStudent.funFact && (
                  <p><strong>Fun Fact:</strong> {currentStudent.funFact}</p>
                )}
                {currentStudent.additional && (
                  <p><strong>Additional:</strong> {currentStudent.additional}</p>
                )}
              </div>
            )}

            {/* Quote */}
            {showOptions.quote && currentStudent.quote && (
              <div className="student-section">
                <blockquote>
                  "{currentStudent.quote.text}"
                  {currentStudent.quote.author && <footer>— {currentStudent.quote.author}</footer>}
                </blockquote>
              </div>
            )}

            {/* Links */}
            {showOptions.links && currentStudent.links && (
              <div className="student-section">
                <h3>Links</h3>
                <ul className="links-list">
                  {currentStudent.links.charlotte && (
                    <li><a href={currentStudent.links.charlotte} target="_blank" rel="noopener noreferrer">Charlotte Webpage</a></li>
                  )}
                  {currentStudent.links.github && (
                    <li><a href={currentStudent.links.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
                  )}
                  {currentStudent.links.githubio && (
                    <li><a href={currentStudent.links.githubio} target="_blank" rel="noopener noreferrer">GitHub.io</a></li>
                  )}
                  {currentStudent.links.linkedin && (
                    <li><a href={currentStudent.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                  )}
                  {currentStudent.links.freecodecamp && (
                    <li><a href={currentStudent.links.freecodecamp} target="_blank" rel="noopener noreferrer">FreeCodeCamp</a></li>
                  )}
                  {currentStudent.links.codecademy && (
                    <li><a href={currentStudent.links.codecademy} target="_blank" rel="noopener noreferrer">Codecademy</a></li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;