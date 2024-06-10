'use client';
//Import Hoook Search
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  //${pathname} is the current path, in your case, "/dashboard/invoices"
  const pathname= usePathname();

  /*
  This function will wrap the contents of handleSearch, and only run the code after a specific time once the user has stopped typing (300ms).
   */
  const handleSearch = useDebouncedCallback((term) =>{
    console.log(`Searching ... ${term}`);
    const params =new URLSearchParams(searchParams);
    //reset the page number
    params.set('page','1');
    if(term){
      params.set('query',term);
    }else{
      params.delete('query');
    }
    ///dashboard/invoices?query=lee if the user searches for "Lee"
    replace(`${pathname}?${params.toString()}`);
    console.log(term);
  });

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />

      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
