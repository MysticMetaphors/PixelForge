import React, { useEffect, useState } from 'react';

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollThreshold = window.innerHeight * 2;
      setIsVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow-lg transition duration-300 cursor-pointer"
      >
        ↑ Top
      </button>
    )
  );
}

export default ScrollToTopButton;
