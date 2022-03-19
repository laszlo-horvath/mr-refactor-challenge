import { Listbox } from '@headlessui/react';
import Image from 'next/image';
import Project from 'types/Project';

interface ProjectSelectProps {
  isLoading: boolean;
  project: Project | undefined;
  projects: Project[];
  onListboxChange: (project: Project) => void;
}

const ProjectSelect = (props: ProjectSelectProps) => {
  const { isLoading, project, projects, onListboxChange } = props;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Listbox value={project} onChange={onListboxChange}>
      <div className="relative mt-1 max-w-xs">
        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
          {!project && <div>Select one</div>}
          {project && (
            <div className="flex">
              <Image
                src={project.logo}
                alt={project.name}
                width={20}
                height={20}
                className="rounded-xl"
              />
              <div>{project.name}</div>
            </div>
          )}
        </Listbox.Button>
        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {projects.map((project, index) => (
            <Listbox.Option key={index} value={project}>
              <div className="py-1 flex">
                <Image
                  src={project.logo}
                  alt={project.name}
                  width={20}
                  height={20}
                  className="rounded-xl"
                />
                <div className="pl-2">{project.name}</div>
              </div>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};

export default ProjectSelect;
