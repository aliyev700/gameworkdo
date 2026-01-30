const QuoteBox = () => {
  return (
    <div className="quote-box ml-14 p-6 mt-7 rounded-lg flex flex-row items-start gap-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="39"
        height="32"
        viewBox="0 0 39 32"
        fill="none"
        className="w-10 h-8 text-red-500"
      >
        <path
          d="M17.0493 23.1822C17.0493 19.4844 14.347 16.0711 10.0804 15.36C10.7915 11.0933 14.6315 6.82666 17.0493 5.12L11.787 0C5.67149 5.26222 0.835938 12.6578 0.835938 22.6133C0.835938 27.8756 4.53371 31.2889 9.22705 31.2889C13.6359 31.2889 17.0493 27.5911 17.0493 23.1822ZM38.0982 23.1822C38.0982 19.4844 35.3959 16.0711 31.1293 15.36C31.8404 11.0933 35.6804 6.82666 38.0982 5.12L32.8359 0C26.7204 5.26222 21.8848 12.6578 21.8848 22.6133C21.8848 27.8756 25.5826 31.2889 30.2759 31.2889C34.6848 31.2889 38.0982 27.5911 38.0982 23.1822Z"
          fill="currentColor"
        />
      </svg>
      <h3 className="text-white  text-9xl md:text-xl font-medium">
        From classic arcade games that evoke nostalgia to the <br /> latest releases that push the boundaries of technology, <br /> we have a diverse collection of games to satisfy every <br /> gaming interest.
      </h3>
    </div>
  );
};

export default QuoteBox;
