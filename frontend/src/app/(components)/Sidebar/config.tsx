import { paths } from "@/paths";
export interface PageData {
  key: string;
  title: string;
  href: string;
  icon: string;
}
export interface PageDataGroup {
  label: string;
  icon: string;
  title: string;
  href: string;
  page_data?: PageData[];
}
export interface MenuListProps {
  key: string;
  pages: PageDataGroup[];
}
export const navItems: MenuListProps[] = [
  {
    key: "crm",
    pages: [
      {
        title: "Product & Service",
        label: "Product & Service",
        icon: 'ScanText',
        href: paths.crm.product_service,
      },
      {
        title: "Customer",
        label: "Customer",
        icon: 'User',
        href: paths.crm.customer,
      },
      {
        title: "Vendor",
        label: "Vendor",
        icon: 'UserX',
        href: paths.crm.vendor,
      },
      {
        title: "Orders",
        label: "Orders",
        icon: 'ShoppingCart',
        href: '',
        page_data: [
          {
            key: "list",
            title: "List",
            href: paths.crm.order.list,
            icon: "ShoppingCart",
          },
          {
            key: "form",
            title: "Form",
            href: paths.crm.order.form,
            icon: "ShoppingBag",
          },

        ],
      },
      {
        title: "Puschases",
        label: "Puschases",
        icon: 'ShoppingCart',
        href: '',
        page_data: [
          {
            key: "list",
            title: "List",
            href: paths.crm.purchases.list,
            icon: "ShoppingCart",
          },
          {
            key: "form",
            title: "Form",
            href: paths.crm.purchases.form,
            icon: "ShoppingBag",
          },

        ],
      }, {
        title: "Expense",
        label: "expense",
        icon: 'ReceiptIndianRupee',
        href: paths.crm.expense,
      },
      {
        title: "Users",
        label: "Users",
        icon: 'CircleUser',
        href: paths.crm.users,
      },
    ],
  },
  {
    key: "dashboard",
    pages: [
      {
        title: "Products",
        label: "Products",
        icon: 'Layout',
        href: paths.dashboard.products,
      },
      {
        title: "Inventory",
        label: "Inventory",
        icon: 'Layout',
        href: paths.dashboard.inventory,
      },
      {
        title: "Users",
        label: "Users",
        icon: 'CircleUser',
        href: paths.dashboard.users,
      },
    ],
  },
  {
    key: "karnalwebtech",
    pages: [
      {
        title: "Post",
        label: "Post",
        icon: 'CirclePlus',
        href: paths.karnalwebtech.post,
      }
    ]
  },
  {
    key: "streaming",
    pages: [
      {
        title: "Upload video",
        label: "Upload video",
        icon: 'Layout',
        href: paths.streaming.uploadVideo,
      },
      {
        title: "Inventory",
        label: "Inventory",
        icon: 'Layout',
        href: paths.dashboard.inventory,
      },
      {
        title: "Users",
        label: "Users",
        icon: 'CircleUser',
        href: paths.dashboard.users,
      },
    ],
  },
];
