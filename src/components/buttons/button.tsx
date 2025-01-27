/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import animateScrollTo from 'animated-scroll-to';
import cx from 'classnames';
import Link from 'next/link';

import { AppColor } from 'types';

interface ButtonProps {
  label: string;
  color?: AppColor;
  backgroundColor?: AppColor;
  testid?: string;
  className?: string;
  size?: 's' | 'm' | 'l';
  position?: 'inline' | 'left' | 'right' | 'center' | 'auto';
}
interface LinkProps extends ButtonProps {
  type: 'link' | 'externalLink';
  link: string;
  download?: boolean;
}
interface ClickProps extends ButtonProps {
  type: 'click';
  onClick: () => void;
}

const Button: React.FC<LinkProps | ClickProps> = (props) => {
  const {
    label = 'no label',
    color = 'black',
    backgroundColor = 'white',
    className: extraClasses = '',
    position = 'inline',
    size = 'm',
  } = props;

  const className = cx(
    'border-2 inline-block text-lg font-bold transition-colors rounded-sm ',
    { 'mr-6': position === 'inline' },
    { 'block mb-2 w-fit-content': position === 'left' },
    { 'block ml-auto mb-2 w-fit-content': position === 'right' },
    { 'block mx-auto mb-2 w-fit-content': position === 'center' },
    { 'is-large': size === 'l' },
    { 'px-6 py-4': size === 'm' },
    { 'is-small': size === 's' },

    {
      'text-black border-black hover:bg-black ': color === 'black',
    },

    {
      'text-white border-white hover:bg-white  hover:text-black':
        color === 'white',
    },

    { 'hover:text-black': backgroundColor === 'black' },

    { '': backgroundColor === 'white' }
  );

  if (props.type === 'link') {
    const isHash = props.link && props.link.includes('#');
    const handleScroll = () => {
      const urlObject = new URL(props.link);
      const element = document.querySelector(urlObject.hash);

      if (element) {
        animateScrollTo(element, { speed: 1000 });
      }
    };

    return (
      <Link href={props.link} passHref>
        <a
          {...(props.download === true ? { download: true } : {})}
          className={` ${className} ${extraClasses}`}
          onClick={(e) => {
            if (isHash) {
              e.preventDefault();
              handleScroll();
            }
          }}
        >
          {label}
        </a>
      </Link>
    );
  }

  if (props.type === 'externalLink') {
    return (
      <a
        rel="noreferrer"
        target="_blank"
        className={`${className} ${extraClasses}`}
        href={props.link}
      >
        {label}
      </a>
    );
  }

  if (props.type === 'click') {
    return (
      <button
        type="button"
        className={` ${className} ${extraClasses}`}
        onClick={() => {
          props.onClick();
        }}
      >
        {label}
      </button>
    );
  }

  return <></>;
};

export default Button;
