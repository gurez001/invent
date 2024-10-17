"use client";
import React from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { ItemCounter } from "./ItemCounter";
import { IconWrapper } from "./IconWrapper";
import { Accordion, AccordionItem } from "@nextui-org/react";
import DynamicIcon from "@/components/common/DynamicIcon";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MenuListProps } from "./config";
interface PageData {
  key: string;
  title: string;
  href: string;
  icon: string;
}

const Menu_list: React.FC<MenuListProps> = ({ pages }) => {
  const pathname = usePathname();
  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-medium dark:text-red",
    trigger: "px-2 py-0 bg-default-100 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2 bg-default-100 dark:text-red",
  };

  return pages.map((item, i) =>
    item.page_data ? (
      <Accordion
        key={i}
        showDivider={false}
        className="p-2 flex flex-col gap-1 w-full max-w-[300px]"
        variant="shadow"
        itemClasses={itemClasses}
      >
        <AccordionItem
          key={`${i}-${item.label}-accordion`} // Unique key for AccordionItem
          aria-label={item.label}
          startContent={<DynamicIcon icon={item.icon} />}
          title={<span className="dark:text-red-500">{item.label}</span>}
        >
          <Listbox
            aria-label="User Menu"
            className="p-2 flex flex-col gap-1 w-full max-w-[300px]"
            variant="shadow"
            // itemClasses={itemClasses}
            style={{ maxWidth: "200px", margin: "auto" }}
            // onAction={(key) => alert(key)}
            // className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium"
            itemClasses={{
              // itemClasses;
              base: "px-3 py-0 first:rounded-t-medium dark:text-white last:rounded-b-medium rounded-none gap-3 h-12 dark:hover:text-red-500 hover:bg-default-100/80 dark:hover:text-red-500",
            }}
          >
            {item.page_data.map((subitem, j) => (
              <ListboxItem
                key={j}
                className={
                  pathname === subitem.href ? "bg-black text-white" : ""
                }
              >
                <Link
                  className="p-0 dark:text-red-500 flex items-center justify-between w-full h-full text-inherit"
                  href={subitem.href}
                >
                  <div className="flex gap-2 items-center ">
                    <span>
                      <IconWrapper className="text-success">
                        <DynamicIcon icon={subitem.icon} />
                      </IconWrapper>
                    </span>
                    <span>{subitem.title}</span>
                  </div>
                  <span>
                    <ItemCounter number={13} />
                  </span>
                </Link>
              </ListboxItem>
            ))}
          </Listbox>
        </AccordionItem>
      </Accordion>
    ) : (
      <Listbox
        aria-label="User Menu"
        style={{ maxWidth: "220px", margin: "auto" }}
        className="p-0 gap-0 mt-2 bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium"
        itemClasses={{
          base: "px-3 py-0 first:rounded-t-medium dark:text-white last:rounded-b-medium rounded-none gap-3 h-12 dark:hover:text-red-500 hover:bg-default-100/80 dark:hover:text-red-500",
        }}
      >
        <ListboxItem
          key={i}
          className={pathname === item.href ? "bg-black text-white" : ""}
        >
          <Link
            className="p-0 dark:text-red-500 flex items-center justify-between w-full h-full text-inherit"
            href={item.href}
          >
            <div className="flex gap-2 items-center ">
              <span>
                <IconWrapper className="text-success">
                  <DynamicIcon icon={item.icon} />
                </IconWrapper>
              </span>
              <span>{item.title}</span>
            </div>
            <span>
              <ItemCounter number={13} />
            </span>
          </Link>
        </ListboxItem>
      </Listbox>
    )
  );
};

export default Menu_list;
