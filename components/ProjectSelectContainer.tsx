
import { useEffect, useState } from 'react';
import ProjectSelect from './ProjectSelect';
import Project from 'types/Project';

interface ProjectsProps {
  onChange: (project: Project) => void;
}

export default function Projects(props: ProjectsProps) {
  const { onChange } = props;

  const [project, setProject] = useState<Project>();
  const [projects, setProjects] = useState(new Array());
  const [isLoading, setLoading] = useState(true);

  const fetchProjects = () => {
    fetch('/api/projects')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const onListboxChange = (project: Project) => {
    setProject(project);
    onChange(project);
  };

  return (
    <ProjectSelect
      isLoading={isLoading}
      project={project}
      projects={projects}
      onListboxChange={onListboxChange}
    />
  );
}
