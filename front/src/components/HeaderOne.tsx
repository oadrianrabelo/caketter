interface HeaderOneProps {
  title: string;
}
export const HeaderOne = ({ title }: HeaderOneProps) => {
  return (
    <>
      <div className="pt-3 pb-3">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-300">
          {title}
        </h1>
      </div>
    </>
  );
};

export default HeaderOne;
