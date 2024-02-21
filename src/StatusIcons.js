const OnlineIcon = (props) => (
  <svg fill="none" {...props}>
    <rect width={10} height={10} fill="#3BA55D" rx={22.5} />
  </svg>
);

const IdleIcon = (props) => (
  <svg viewBox="0 0 60 60" fill="none" {...props}>
    <path
      fill="#FAA61A"
      fillRule="evenodd"
      d="M30.479 52C42.917 52 53 41.917 53 29.479 53 17.509 43.664 7.722 31.876 7a16.833 16.833 0 0 1 4.585 11.57c0 9.328-7.562 16.89-16.89 16.89A16.832 16.832 0 0 1 8 30.877C8.72 42.663 18.51 52 30.478 52Z"
      clipRule="evenodd"
      className="scaleIcon"
    />
  </svg>
);

const DonotdisturbIcon = (props) => (
  <svg viewBox="0 0 60 60" fill="none" {...props}>
    <path
      fill="#ED4245"
      fillRule="evenodd"
      d="M30.5 7.5C18.074 7.5 8 17.574 8 30s10.074 22.5 22.5 22.5C42.927 52.5 53 42.426 53 30S42.927 7.5 30.5 7.5Zm-11.25 18a4.5 4.5 0 1 0 0 9h22.5a4.5 4.5 0 1 0 0-9h-22.5Z"
      clipRule="evenodd"
      className="scaleIcon"
    />
  </svg>
);

const InvisibleIcon = (props) => (
  <svg viewBox="0 0 60 60" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      className="scaleIcon"
      d="M30.5002 7.5C18.0738 7.5 8.00024 17.5736 8.00024 30C8.00024 42.4264 18.0738 52.5 30.5002 52.5C42.9267 52.5 53.0002 42.4264 53.0002 30C53.0002 17.5736 42.9267 7.5 30.5002 7.5ZM30.5002 18.75C24.287 18.75 19.2502 23.7868 19.2502 30C19.2502 36.2132 24.287 41.25 30.5002 41.25C36.7134 41.25 41.7502 36.2132 41.7502 30C41.7502 23.7868 36.7134 18.75 30.5002 18.75Z"
      fill="#747F8D"
    />
  </svg>
);

export { OnlineIcon, IdleIcon, DonotdisturbIcon, InvisibleIcon };
