export const PrimaryButton = ({onClick, className, children}: any) => {
      return (
        <button className={`bg-primary hover:bg-purple-700 text-white font-bold py-2 px-10 rounded shadow ${className}`}  onClick={onClick} type="submit">
          {children}
        </button>
    );
  };
