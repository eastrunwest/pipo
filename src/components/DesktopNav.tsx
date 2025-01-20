import {CameraIcon, HomeIcon, LayoutGridIcon, SearchIcon, UserIcon} from "lucide-react";
import Link from "next/link";

export default function DesktopNav() {
  return (
    <div className="hidden md:block px-4 pb-4 w-48 shadow-md shadow-gray-400 dark:shadow-gray-600">
      <div className="top-4 sticky">
        <img className="dark:invert"
             src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNjYWxlIj48cGF0aCBkPSJtMTYgMTYgMy04IDMgOGMtLjg3LjY1LTEuOTIgMS0zIDFzLTIuMTMtLjM1LTMtMVoiLz48cGF0aCBkPSJtMiAxNiAzLTggMyA4Yy0uODcuNjUtMS45MiAxLTMgMXMtMi4xMy0uMzUtMy0xWiIvPjxwYXRoIGQ9Ik03IDIxaDEwIi8+PHBhdGggZD0iTTEyIDN2MTgiLz48cGF0aCBkPSJNMyA3aDJjMiAwIDUtMSA3LTIgMiAxIDUgMiA3IDJoMiIvPjwvc3ZnPg=="
             alt=""/>
        <div className="ml-1 inline-flex flex-col gap-6 mt-8 *:flex *:items-center *:gap-2">
          <Link href={'/'}>
            <HomeIcon/>
            Home
          </Link>
          {/* <Link href={'/search'}>
            <SearchIcon/>
            Search
          </Link>
          <Link href={'/browse'}>
            <LayoutGridIcon/>
            Browse
          </Link> */}
          <Link href={'/profile'}>
            <UserIcon/>
            Profile
          </Link>
          <Link href={'/create'}>
            <CameraIcon/>
            Create
          </Link>
        </div>
      </div>
    </div>
  );
}