"use client"

import * as React from "react"
import { ArrowUpRight, Folder, Mail } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import { useIsMobile } from "@/hooks/use-mobile"
import { useRouter } from "next/navigation"
import { about, blogs, sidebar_data as data, projects, sidebar_data } from "@/data"
import Image from "next/image"
import Link from "next/link"
import { SidebarOptInForm } from "./sidebar-opt-in-form"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Note: I'm using state to show active item.
  // IRL you should use the url/router.
  const [activeItem, setActiveItem] = React.useState(data.navMain[0])
  const router = useRouter()
  const { setOpen, setOpenMobile } = useSidebar()
  const isMobile = useIsMobile()
  const [search, setSearch] = React.useState("");
  const filteredProjects = projects.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );
  const filteredBlogs = blogs.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <Link href="/">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#FF634D] text-sidebar-primary-foreground">
                    <Image src={sidebar_data.logo} width={100} height={100} alt="Jyotirmoy Barman" className="rounded-lg" />
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: (isMobile ? true : false),
                      }}
                      onClick={() => {
                        setActiveItem(item)
                        setOpen(true)
                        setOpenMobile(false)
                        if (isMobile) {
                          router.push(item.url)
                        }
                      }}
                      isActive={activeItem.title === item.title}
                      className="px-2.5 md:px-2"
                    >
                      <item.icon />
                      {/* <span>{item.title}</span> */}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center justify-center flex-col gap-2">
            {
              data.links.map((link, i) => (
                <Button key={i} variant={'outline'} size={'icon'} className="group/link hover:bg-muted/80 rounded-lg bg-muted size-8 relative" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <link.icon className="scale-100 group-hover/link:scale-0 transition-all" />
                    <ArrowUpRight className="absolute scale-0 group-hover/link:scale-100 transition-all" />
                  </a>
                </Button>
              ))
            }
            <Button variant={'outline'} size={'icon'} className="group/link hover:bg-muted/80 rounded-lg bg-muted size-8 relative" asChild>
              <a href="mailto:jyotirmoydotdev@gmail.com">
                <Mail className="scale-100 group-hover/link:scale-0 transition-all" />
                <ArrowUpRight className="absolute scale-0 group-hover/link:scale-100 transition-all" />
              </a>
            </Button>
            <ModeToggle />
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              {activeItem.title}
            </div>
            <div className="text-sm font-medium text-foreground">
              <Button variant={'link'} size={'sm'} asChild>
                <Link href={activeItem.url}>
                  View all
                </Link>
              </Button>
            </div>
          </div>
          <SidebarInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type to search..."
          />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {
                (activeItem.title.toLowerCase() === "about") && about.map((item, i) => (
                  <Link
                    key={i}
                    href={item.url}
                    className="flex flex-col items-start hover:pl-2 transition-all gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <span className="font-black">{item.title}</span>
                  </Link>
                ))
              }
              {
                (activeItem.title.toLocaleLowerCase() === "projects") && filteredProjects.map((item, i) => (
                  <Link
                    key={i}
                    href={item.url}
                    className="flex flex-col items-start gap-2 hover:pl-2 group/project transition-all whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <span className="font-black flex gap-2 dark:group-hover/project:text-orange-400 group-hover/project:text-orange-500 transition-all ">
                      <Folder className="size-4" />
                      {item.title}
                    </span>
                    <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                      {item.description}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {
                        item.tags.map((tag, i) => (
                          <div key={i} className=" px-2 py-1 text-xs rounded-md bg-gray-500/10 dark:bg-black/20 text-gray-500">{tag}</div>
                        ))
                      }
                    </div>
                  </Link>
                ))
              }
              {
                (activeItem.title.toLocaleLowerCase() === "blogs") && filteredBlogs.map((item, i) => (
                  <Link
                    key={i}
                    href={item.url}
                    className="group/blogs flex flex-col items-start gap-1.5 hover:pl-2 transition-all whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <span className="line-clamp-2 w-[260px] whitespace-break-spaces font-black dark:group-hover/blogs:text-orange-400 group-hover/blogs:text-orange-500 transition-all">
                      {item.title}
                    </span>
                    <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                      {item.description}
                    </span>
                    <div className=" pt-1 text-xs text-gray-500">
                      <span>{item.date}</span>
                    </div>
                  </Link>
                ))
              }
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="">
          <SidebarOptInForm />
        </SidebarFooter>
      </Sidebar>
    </Sidebar>
  )
}
