import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { FaPlusCircle, FaTasks, FaHandHolding } from 'react-icons/fa';
import '../styles/Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    skillsRequired: '',
  });

  // Fetch projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await API.get('/projects');
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects');
      }
    };

    fetchProjects();
  }, []);

  // Add a new project
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/projects', newProject);
      setProjects([...projects, data]);
      setNewProject({ title: '', description: '', skillsRequired: '' });
    } catch (error) {
      console.error('Failed to add project');
    }
  };

  return (
    <div className="projects">
      <h2 className="projects-title">Available Projects</h2>

      <div className="projects-list">
        {projects.length === 0 ? (
          <p>No projects available at the moment. Check back later!</p>
        ) : (
          <ul>
            {projects.map((project) => (
              <li key={project._id} className="project-card">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <p><strong>Required Skills:</strong> {project.skillsRequired}</p>
                <button className="join-btn"><FaHandHolding /> Join Project</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <h3 className="pitch-title">Pitch a New Project</h3>
      <form onSubmit={handleProjectSubmit} className="new-project-form">
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            placeholder="Project Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="skillsRequired"
            placeholder="Skills Required"
            value={newProject.skillsRequired}
            onChange={(e) => setNewProject({ ...newProject, skillsRequired: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          <FaPlusCircle /> Pitch Project
        </button>
      </form>
    </div>
  );
}

export default Projects;
