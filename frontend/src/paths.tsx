interface Paths {
  crm: {
    product_service: string;
    crm: string;
    vendor: string;
    customer: string;
    expense: string;
    users: string;
    order: {
      list: string;
      form: string;
    };
    purchases: {
      list: string;
      form: string;
    };
  };
  dashboard: {
    products: string;
    users: string;
    inventory: string;
  };
  streaming: {
    uploadVideo: string;
    users: string;
    inventory: string;
  };
  karnalwebtech: {
    post: string;
    users: string;
    inventory: string;
  };
}

export const paths: Paths = {
  crm: {
    order: {
      list: "/crm/orders",
      form: "/crm/orders/form",
    },
    purchases: {
      list: "/crm/purchase",
      form: "/crm/purchase/form",
    },
    product_service: "/crm/product",
    crm: "/crm",
    expense: "/crm/expense",
    customer: "/crm/customer",
    vendor: "/crm/vendor",
    users: "/crm/users",
  },
  dashboard: {
    products: "/products",
    users: "/users",
    inventory: "/inventory",
  },
  streaming: {
    uploadVideo: "/streaming/upload-video",
    users: "/streaming/users",
    inventory: "/streaming/inventory",
  },
  karnalwebtech: {
    post: "/karnalwebtech/post",
    users: "/streaming/users",
    inventory: "/streaming/inventory",
  },
};



// {
//   "name": "inventory-management",
//   "version": "0.1.0",
//   "private": true,
//   "scripts": {
//     "dev": "next dev",
//     "build": "next build",
//     "start": "next start",
//     "lint": "next lint"
//   },
//   "dependencies": {
//     "@hookform/resolvers": "^3.9.1",
//     "@nextui-org/react": "^2.4.7",
//     "@radix-ui/react-checkbox": "^1.1.2",
//     "@radix-ui/react-dialog": "^1.1.2",
//     "@radix-ui/react-dropdown-menu": "^2.1.2",
//     "@radix-ui/react-label": "^2.1.0",
//     "@radix-ui/react-popover": "^1.1.2",
//     "@radix-ui/react-scroll-area": "^1.2.1",
//     "@radix-ui/react-select": "^2.1.2",
//     "@radix-ui/react-slot": "^1.1.0",
//     "@radix-ui/react-tabs": "^1.1.1",
//     "@radix-ui/react-toggle": "^1.1.0",
//     "@reduxjs/toolkit": "^2.2.6",
//     "axios": "^1.7.2",
//     "class-variance-authority": "^0.7.0",
//     "clsx": "^2.1.1",
//     "cmdk": "^1.0.0",
//     "country-state-city": "^3.2.1",
//     "dotenv": "^16.4.5",
//     "firebase": "^10.13.2",
//     "framer-motion": "^11.5.4",
//     "jodit": "^4.2.41",
//     "jodit-react": "^4.1.2",
//     "lodash.debounce": "^4.0.8",
//     "lucide-react": "^0.407.0",
//     "next": "14.2.4",
//     "numeral": "^2.0.6",
//     "react": "^18",
//     "react-dom": "^18",
//     "react-dropzone": "^14.2.3",
//     "react-hook-form": "^7.53.2",
//     "react-hot-toast": "^2.4.1",
//     "react-js-pagination": "^3.0.3",
//     "react-phone-input-2": "^2.15.1",
//     "react-quill": "^2.0.0",
//     "react-redux": "^9.1.2",
//     "react-toastify": "^10.0.5",
//     "recharts": "^2.12.7",
//     "redux-persist": "^6.0.0",
//     "tailwind-merge": "^2.5.4",
//     "tailwindcss-animate": "^1.0.7",
//     "universal-cookie": "^7.2.0",
//     "uuid": "^10.0.0",
//     "zod": "^3.23.8"
//   },
//   "devDependencies": {
//     "@types/node": "^20.14.10",
//     "@types/numeral": "^2.0.5",
//     "@types/react": "^18",
//     "@types/react-dom": "^18",
//     "@types/uuid": "^10.0.0",
//     "eslint": "^8",
//     "eslint-config-next": "14.2.4",
//     "postcss": "^8",
//     "tailwindcss": "^3.4.1",
//     "tw-colors": "^3.3.1",
//     "typescript": "^5"
//   }
// }
