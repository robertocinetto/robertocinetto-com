const iconClassName = "w-[25px] h-[25px]";

const GithubIcon = () => (
  <svg
    className={iconClassName}
    viewBox="0 0 16 16"
    fill="currentColor"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M8 0.198c-4.418 0-8 3.582-8 8 0 3.535 2.292 6.533 5.471 7.591 0.4 0.074 0.547-0.174 0.547-0.385 0-0.191-0.008-0.821-0.011-1.489-2.226 0.484-2.695-0.944-2.695-0.944-0.364-0.925-0.888-1.171-0.888-1.171-0.726-0.497 0.055-0.486 0.055-0.486 0.803 0.056 1.226 0.824 1.226 0.824 0.714 1.223 1.872 0.869 2.328 0.665 0.072-0.517 0.279-0.87 0.508-1.070-1.777-0.202-3.645-0.888-3.645-3.954 0-0.873 0.313-1.587 0.824-2.147-0.083-0.202-0.357-1.015 0.077-2.117 0 0 0.672-0.215 2.201 0.82 0.638-0.177 1.322-0.266 2.002-0.269 0.68 0.003 1.365 0.092 2.004 0.269 1.527-1.035 2.198-0.82 2.198-0.82 0.435 1.102 0.162 1.916 0.079 2.117 0.513 0.56 0.823 1.274 0.823 2.147 0 3.073-1.872 3.749-3.653 3.947 0.287 0.248 0.543 0.735 0.543 1.481 0 1.070-0.009 1.932-0.009 2.195 0 0.213 0.144 0.462 0.55 0.384 3.177-1.059 5.466-4.057 5.466-7.59 0-4.418-3.582-8-8-8z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    className={iconClassName}
    viewBox="0 0 16 16"
    fill="currentColor"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M6 6h2.767v1.418h0.040c0.385-0.691 1.327-1.418 2.732-1.418 2.921 0 3.461 1.818 3.461 4.183v4.817h-2.885v-4.27c0-1.018-0.021-2.329-1.5-2.329-1.502 0-1.732 1.109-1.732 2.255v4.344h-2.883v-9z" />
    <path d="M1 6h3v9h-3v-9z" />
    <path d="M4 3.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5c0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5z" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    className={iconClassName}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
    />
  </svg>
);

const EnvelopeIcon = () => (
  <svg
    className={iconClassName}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
    />
  </svg>
);

const ContactLinks = () => (
  <div className="text-center text-white mt-5 mb-10">
    <p>Get in touch with me</p>
    <div className="text-center mt-3 flex justify-center gap-8">
      <a
        href="https://github.com/robertocinetto"
        target="_blank"
        rel="noreferrer"
        aria-label="Roberto Cinetto on GitHub"
      >
        <GithubIcon />
      </a>
      <a
        href="https://www.linkedin.com/in/robertocinetto/"
        target="_blank"
        rel="noreferrer"
        aria-label="Roberto Cinetto on LinkedIn"
      >
        <LinkedinIcon />
      </a>
      <a href="tel:+12368869279" aria-label="Call Roberto Cinetto">
        <PhoneIcon />
      </a>
      <a
        href="mailto:roberto.cinetto@gmail.com"
        target="_blank"
        rel="noreferrer"
        aria-label="Email Roberto Cinetto"
      >
        <EnvelopeIcon />
      </a>
    </div>
  </div>
);

export default ContactLinks;
