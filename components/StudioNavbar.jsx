import Link from "next/link";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

function StudioNavbar(props) {
  return (
    <div>
      <div className="flex items-center justify-between p-5">
        <Link href="/" className="text-[#6295ca] flex items-center">
          <ArrowUturnLeftIcon className="h-6 w-6 text-[#6295ca] mr-2" />
          Go Back To Website
        </Link>
        <h1 className="font-bold text-[#6295ca] text-3xl">bencodes</h1>
      </div>
      <>{props.renderDefault(props)}</>
    </div>
  );
}

export default StudioNavbar;
