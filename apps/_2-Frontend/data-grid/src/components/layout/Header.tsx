import { SearchField } from '../header/SearchField';

const Header = () => {
  return (
    <div className="text-center min-h-[100px] flex items-center justify-between w-full">
      <h1 className="text-3xl font-semibold">Data Grid App</h1>

      <div className="flex items-end">
        <SearchField />
      </div>
    </div>
  );
};

export default Header;
