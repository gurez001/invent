"use client";
import React, { useState } from "react";
import Page_header from "../../common/Page_header";
import { Button } from "@nextui-org/react";
// import Product_form from "./product/Product_form";
import Popover_component from "@/components/Popover_component/Popover_component";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { Layers3, ShoppingCart } from "lucide-react";
import Categotie_form from "./categories/Categotie_form";
import Category from "./categories/Category";
const Product_servicee = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmit = () => {};
  return (
    <div>
      <Page_header title={"Products / Services"} />

      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" variant="bordered" className="custom-tabs">
          <Tab
            key="Product"
            title={
              <div className="flex items-center space-x-2">
                <ShoppingCart size={15} />
                <span>Product</span>
              </div>
            }
          >
            <Card>
              <CardBody>
                <Button onClick={() => setIsOpen(true)}>Add new</Button>
                {/* {isOpen && (
                  <Popover_component
                    open={isOpen}
                    set_open={setIsOpen}
                    components={
                      <Product_form
                        // isLoading={false}
                        // edit={edit}
                        // open={isOpen}
                        set_open={setIsOpen}
                        // vendor_data={vendor}
                        onsubmit={onSubmit}
                      />
                    }
                  />
                )} */}
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="Categories"
            title={
              <div className="flex items-center space-x-2">
                <Layers3 size={15} />
                <span>Categories</span>
              </div>
            }
          >
            <Card>
              <CardBody>
              <Category/>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="videos" title="Videos">
            <Card>
              <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Product_servicee;
