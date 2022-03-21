import { Spinner } from './../../components/icons/svg';

const Loading = () => {
  return (
    <div className="flex justify-center text-white">
      <Spinner />
      <div className="ml-2 -mt-0.5" data-automation-id="loading">
        Loading...
      </div>
    </div>
  );
};

export default Loading;
