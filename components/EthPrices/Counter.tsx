import React, { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';
import classNames from 'classnames';

interface CounterProps {
  from: number;
  to: number;
  currency?: string;
  fixed?: number;
  duration?: number;
  hiddenMobile?: boolean;
}

const CounterDefaults = {
  from: 0,
  to: 0,
  hiddenMobile: false
};

const Counter = ({ from, to, fixed, duration, currency, hiddenMobile }: CounterProps = CounterDefaults) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(from, to, {
      duration: duration || 2,
      onUpdate(value) {
        if (ref && ref.current) {
          ref.current.textContent = value.toFixed(fixed || 2);
        }
      }
    });
    return () => controls.stop();
  }, [from, to, duration, fixed]);

  // if (hiddenMobile !== undefined) {}

  const classes1 = classNames('text-white mr-1', {
    'hidden sm:inline-block': hiddenMobile
  });
  const classes2 = classNames('text-indigo-300 font-semibold mr-2 sm:pr-2 sm:border-r-2 sm:border-slate-600 last:border-0 last:mr-0 last:pr-0', {
    'hidden sm:inline-block': hiddenMobile
  });

  return (
    <>
      <span className={classes1} ref={ref} />
      <span className={classes2}>{currency}</span>
    </>
  );
};

export default Counter;
