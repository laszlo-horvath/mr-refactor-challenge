import { Listbox, Transition } from '@headlessui/react';
import Image from 'next/image';
import classNames from 'classnames';

import Project from 'types/Project';
import { CheckIcon, ChevronDown, ChevronUp } from './../icons/svg';
import Loading from './../Loading/Loading';

interface ProjectSelectProps {
  isLoading: boolean;
  project: Project | undefined;
  projects: Project[];
  isValid: boolean;
  onListboxChange: (project: Project) => void;
}

const ProjectSelect = (props: ProjectSelectProps) => {
  const { isLoading, project, projects, isValid, onListboxChange } = props;

  if (isLoading) {
    return <Loading />;
  }

  const listboxButtonClasses = classNames(
    'relative w-full h-12 py-2 pl-3 pr-10 text-left rounded-lg bg-white border border-gray-200 shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm',
    {
      'border-4 border-red-300': !isValid,
    }
  );

  return (
    <Listbox data-automation-id="listbox" value={project} onChange={onListboxChange}>
      {({ open }) => (
        <div className="relative mt-1 mx-auto w-80 z-20">
          <Listbox.Button className={listboxButtonClasses}>
            {!project && <div data-automation-id="dropdown-default">Select one...</div>}
            {project && (
              <div className="flex">
                <Image
                  src={project.logo}
                  alt={project.name}
                  width={20}
                  height={20}
                  className="rounded-xl"
                />
                <label className="ml-2">{project.name}</label>
              </div>
            )}
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              {!open && ChevronDown}
              {open && ChevronUp}
            </span>
          </Listbox.Button>
          <Transition
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 transform -translate-y-6"
            enterTo="opacity-100 transform translate-y-0"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 transform translate-y-0"
            leaveTo="opacity-0 transform -translate-y-6"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-75 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {projects.map((project, index) => (
                <Listbox.Option
                  key={index}
                  value={project}
                  className="py-1 cursor-pointer hover:text-white hover:bg-indigo-500 transition-colors "
                >
                  {({ selected }) => (
                    <div className={classNames('py-1', 'px-2', 'flex', { 'pl-7': !selected })}>
                      {selected && <CheckIcon />}
                      <Image
                        src={project.logo}
                        alt={project.name}
                        width={20}
                        height={20}
                        className="rounded-xl"
                      />
                      {!selected && <div className="pl-2">{project.name}</div>}
                      {selected && (
                        <div className="pl-2">
                          <b>{project.name}</b>
                        </div>
                      )}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

export default ProjectSelect;
