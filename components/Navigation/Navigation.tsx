import Link from "next/link";

export const Navigation = () => {

  return (
      <nav className="flex items-center justify-between">
        {/* Left side: Nav links */}
        <ul className="flex space-x-4">
          <li>
            <Link
              href="/"
              className="
                text-gray-800 dark:text-gray-100
                px-3 py-2
                rounded-md
                text-lg font-medium
                hover:bg-gray-100 dark:hover:bg-gray-700
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-colors duration-200
              "
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/search"
              prefetch={true}
              className="
                text-gray-800 dark:text-gray-100
                px-3 py-2
                rounded-md
                text-lg font-medium
                hover:bg-gray-100 dark:hover:bg-gray-700
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-colors duration-200
              "
            >
              Search
            </Link>
          </li>
          <li>
            <Link
              href="/collection"
              className="
                text-gray-800 dark:text-gray-100
                px-3 py-2
                rounded-md
                text-lg font-medium
                hover:bg-gray-100 dark:hover:bg-gray-700
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-colors duration-200
              "
            >
              Collection
            </Link>
          </li>
          <li>
            <Link
              href="/wantlist"
              className="
                text-gray-800 dark:text-gray-100
                px-3 py-2
                rounded-md
                text-lg font-medium
                hover:bg-gray-100 dark:hover:bg-gray-700
                focus:outline-none focus:ring-2 focus:ring-blue-500
                transition-colors duration-200
              "
            >
              Wantlist
            </Link>
          </li>
        </ul>
      </nav>
  );
};
