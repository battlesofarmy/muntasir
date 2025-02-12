// npx shadcn@latest init
// npx shadcn@latest add sheet
// npx shadcn@latest add button
// Add tailwind container

"use client"

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FaHome } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import { MdCoPresent } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "@/utils/AuthProvider";

import Profile from './Profile'
import Present from "./Present";

// import { AuthContext } from "@/utils/authContext";
// import { useContext } from "react";

// interface Page {
//   name: string;
//   href: string;
// }

// interface AuthContextType {
//   user: UserType | null;
// }

export default function Navbar() {
    const pages = [
        {name : "Home", href: "/"},
        {name : "ToDo", href: "/todo"},
        // {name : "Present", href: "/present"},
        // {name : "Contact", href: "/contact"},
        // {name : "Login", href: "/login"},
    ]
    const { user } = useContext(AuthContext)

  return (
    <header style={{boxShadow: '0 0.5px 0 rgba(255, 255, 255, 0.5)' }}>
      <div className="container flex shrink-0 items-center h-16">
      
      {/* Logo  */}
      <Link href="/" className="mr-6" prefetch={false}>
        <Logo />
      </Link>

        <nav className="ml-auto hidden lg:flex gap-4 items-center">
          <Link href={'/'}
                className="group text-sm inline-flex h-9 w-max items-center justify-center rounded-md border px-4 py-2 font-medium transition-colors hover:bg-gray-100  focus:bg-gray-900 focus:text-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50  dark:hover:bg-[#131316] dark:hover:text-gray-50 dark:focus:bg-[#131316] dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                prefetch={false} >
              <FaHome className="mr-1.5 text-base"/>Home
            </Link>

            <Link href={'/todo'}
                className="group text-sm inline-flex h-9 w-max items-center justify-center rounded-md border px-4 py-2 font-medium transition-colors hover:bg-gray-100  focus:bg-gray-900 focus:text-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:hover:bg-[#131316] dark:hover:text-gray-50 dark:focus:bg-[#131316] dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                prefetch={false} >
              <LuListTodo className="mr-1.5 text-base"/>ToDo
            </Link>



            <Link href={'#'}
                className="group text-sm inline-flex h-9 w-max items-center justify-center rounded-md border px-4 py-2 font-medium transition-colors hover:bg-gray-100  focus:bg-gray-900 focus:text-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:hover:bg-[#131316] dark:hover:text-gray-50 dark:focus:bg-[#131316] dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                prefetch={false} >
              <MdCoPresent className="mr-1.5 text-base"/>
               <Present/>
            </Link>

            


          {
            user?
            // johfa
            <>
              <Profile/>
            </>
            :
            <Link href={'/login'}
                className="group text-sm inline-flex h-9 w-max items-center justify-center rounded-md border px-4 py-2 font-medium transition-colors hover:bg-gray-100  focus:bg-gray-900 focus:text-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:hover:bg-[#131316] dark:hover:text-gray-50 dark:focus:bg-[#131316] dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                prefetch={false} >
              <FaRegUserCircle className="mr-1.5 text-base"/>Login
            </Link>
          }




        {/* {
            pages?.map(ele=>
            <Link
                key={ele.name}
                href={ele.href}
                className="group text-sm inline-flex h-9 w-max items-center justify-center rounded-md border px-4 py-2 font-medium transition-colors hover:bg-gray-100  focus:bg-gray-900 focus:text-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-[#131316] dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
                prefetch={false}
            >
            {ele.name}
            </Link>
            )
        } */}
       </nav>

     <Sheet>
        {/* Mobile menu Icon  */}
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden ml-auto">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        {/* Mobile Menu  */}
        <SheetContent side="left">
          {/* Menu title  */}
          <Link href="#" className="mr-6 lg:flex" prefetch={false}>
            <Logo />
          </Link>
          {/* Menu links  */}
         <div className="grid gap-2 py-6">
          {
            pages?.map(ele=>
                <Link key={ele.name} href={ele.href} className="flex w-full items-center py-2 font-semibold" prefetch={false}>
                    {ele.name}
                </Link>
            )
          }
          </div>
        </SheetContent>
      </Sheet>


      </div>
    </header>
  )
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="50" y1="18" y2="18" />
    </svg>
  )
}

function Logo() {
  return (
    <h2 className="text-2xl text-white">Muntasir Ahmed</h2>
  )
}