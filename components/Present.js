import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";


export default function Present() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <Button> */}
            <span>Present</span>
        {/* </Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={"/phy"} className="w-full">Physics Lab</Link>
            <DropdownMenuShortcut>⌘Phy</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/eee"} className="w-full">EEE Lab</Link>
            <DropdownMenuShortcut>⌘eee</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        
        <DropdownMenuItem>
          <Link href={"/add"} className="w-full">Add Present</Link>
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
