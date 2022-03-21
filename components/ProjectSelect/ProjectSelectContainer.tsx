
import { useEffect, useState } from 'react';
import ProjectSelect from './ProjectSelect';
import Project from 'types/Project';

interface ProjectsProps {
  project: Project | undefined;
  isValid: boolean;
  onChange: (project: Project) => void;
}

export default function Projects(props: ProjectsProps) {
  const { project, onChange } = props;

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

  return (
    <ProjectSelect
      isLoading={isLoading}
      isValid={props.isValid}
      project={project}
      projects={projects}
      onListboxChange={onChange}
    />
  );
}
