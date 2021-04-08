export const SecondaryButton = ({onClick, className, children}: any) => {
      return (
        <button className={`bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ${className}`}  onClick={onClick} type="submit">
          {children}
        </button>
    );
  };
