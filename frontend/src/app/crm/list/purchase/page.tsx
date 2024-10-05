import PageHeader from "@/components/common/Page_header";
import { Button } from "@nextui-org/react";
import React from "react";

const page = () => {
  return (
    <div>
      <PageHeader title={'Purchases'} link={'/crm/create/purchase'} />
     
    </div>
  );
};

export default page;
