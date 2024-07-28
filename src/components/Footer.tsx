import React from 'react';
import { FaGithub, FaLinkedin, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col items-center bg-bg1 text-center text-white z-50 relative">
      <div className="container pt-9">
        <div className="mb-6 flex justify-center space-x-2">
          <a
            href="https://github.com/MihirJaiswal/MihirJaiswal"
            type="button"
            className="rounded-full bg-transparent hover:bg-black p-3 font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-secondary-900 focus:outline-none focus:ring-0"
          >
            <FaGithub className="h-5 w-5" />
          </a>

          <a
            href="https://www.linkedin.com/in/mihir-jaiswal-322898287/"
            type="button"
            className="rounded-full bg-transparent hover:bg-blue-500 p-3 font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-secondary-900 focus:outline-none focus:ring-0"
          >
            <FaLinkedin className="h-5 w-5" />
          </a>

          <a
            href="https://www.youtube.com/channel/UCANl98VUjfCZW7P2Tac1c6Q"
            type="button"
            className="rounded-full bg-transparent hover:bg-red-600 p-3 font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-secondary-900 focus:outline-none focus:ring-0"
          >
            <FaYoutube className="h-5 w-5" />
          </a>
          <a
            href="https://www.instagram.com/monty_draws_/"
            type="button"
            className="rounded-full bg-transparent hover:bg-purple-500 p-3 font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-secondary-900 focus:outline-none focus:ring-0"
          >
            <FaInstagram className="h-5 w-5" />
          </a>
        </div>
        <div className="mb-6 flex items-center justify-center space-x-2">
          <span className="text-sm text-white dark:text-secondary-900">
            © 2024 Mihir Jaiswal
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
