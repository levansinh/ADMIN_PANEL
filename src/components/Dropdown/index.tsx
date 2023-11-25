import { Link } from 'react-router-dom'

import { DropdownType } from './types'

export default function Dropdown({ dropdownMenu, textButton }: DropdownType) {
  return (
    <div>
      <button
        id='multiLevelDropdownButton'
        data-dropdown-toggle='dropdown'
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        type='button'
      >
        {textButton}
        <svg
          className='w-2.5 h-2.5 ml-2.5'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 10 6'
        >
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='m1 1 4 4 4-4' />
        </svg>
      </button>
      {/* Dropdown menu */}
      <div
        id='dropdown'
        className='z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700'
      >
        <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='multiLevelDropdownButton'>
          <li>
            <a href='#' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
              Dashboard
            </a>
          </li>
          <li>
            <button
              id='doubleDropdownButton'
              data-dropdown-toggle='doubleDropdown'
              data-dropdown-placement='right-start'
              type='button'
              className='flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
            >
              {textButton}
              <svg
                className='w-2.5 h-2.5 ml-2.5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 6 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='m1 9 4-4-4-4'
                />
              </svg>
            </button>
            <div
              id='doubleDropdown'
              className='z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700'
            >
              <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='doubleDropdownButton'>
                {dropdownMenu &&
                  dropdownMenu.map((item, index) => (
                    <li>
                      <Link
                        key={index}
                        to={item.path}
                        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                      >
                        {item.display}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </li>
          <li>
            <a href='#' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
              Earnings
            </a>
          </li>
          <li>
            <a href='#' className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

