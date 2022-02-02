import { Listbox } from '@headlessui/react';
import { useEffect, useState } from 'react';

export default function Projects({ onChange }) {
  const [project, setProject] = useState(false);
  const [projects, setProjects] = useState(new Array());
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Fetch projects');
    fetch('/api/projects')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        console.log(data);
        setLoading(false);
      })
      .catch(e => console.log(e));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Listbox
      value={project}
      onChange={p => {
        setProject(p);
        onChange(p);
      }}
    >
      <div className="relative mt-1 max-w-xs">
        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
          {!project && <div>Select one</div>}
          {project && (
            <div className="flex">
              <img src={project.logo} width={20} height={20} style={{ borderRadius: 20 }} /> &nbsp;
              {project.name}
            </div>
          )}
        </Listbox.Button>
        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {projects.map(project => (
            <Listbox.Option value={project}>
              <div className="py-1 flex">
                <img src={project.logo} width={20} height={20} style={{ borderRadius: 20 }} />
                <div className="pl-2">{project.name}</div>
              </div>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}
