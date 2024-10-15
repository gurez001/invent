"use client";
import { CircularProgress } from "@nextui-org/progress";
import Secondary_Autocomplete_field from "@/components/common/fields/Secondary_Autocomplete_field";
import { order_product_type_form, other_sevice } from "@/types/order_type";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import debounce from "lodash.debounce";
import { useGetAllproductsQuery, useGetSingleMutation } from "@/state/productApi";
import Input_field from "@/components/common/fields/Input_field";
import toast from "react-hot-toast";
import { calculateTotalIncludingGST } from "@/lib/service/calculations";
import { CircleX } from "lucide-react";
import { formatCurrency } from "@/lib/service/currencyUtils";
interface popover {
  isOpen: boolean;
  onClose: () => void;
  list?: any;
  set_Poduct_list?: any;
  set_services?: any
}
interface Order_product_form_props {
  product_list: any; set_Poduct_list: any; set_services?: any; services: any;
}
const Order_product_form: React.FC<Order_product_form_props> = ({ services, set_services, product_list, set_Poduct_list }) => {
  const {
    isOpen: isProductFormOpen,
    onOpen: onProductFormOpen,
    onClose: onProductFormClose,
  } = useDisclosure();

  const {
    isOpen: isServiceFormOpen,
    onOpen: onServiceFormOpen,
    onClose: onServiceFormClose,
  } = useDisclosure();

  const amount_with_gst = product_list.reduce((accumulator: any, product: any) => {
    return accumulator + calculateTotalIncludingGST(Number(product.product.selling_price), Number(product.product.tax)) * product.quantity;
  }, 0)
  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex w-full">
            <p className="w-[60%]">Item</p>
            <p className="w-[10%] text-center">Cost</p>
            <p className="w-[10%] text-center">GST</p>
            <p className="w-[10%] text-center">Qnty</p>
            <p className="w-[10%] text-center">Total</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          {product_list && product_list.map((item: any, i: number) => (
            <div className="flex w-full mt-3">
              <p className="w-[60%]">{item.product.name}</p>
              <p className="w-[10%] text-center">{formatCurrency(item.product.selling_price)}</p>
              <p className="w-[10%] text-center">{item.product.tax}%</p>
              <p className="w-[10%] text-center">{item.quantity}</p>
              <p className="w-[10%] text-center">{formatCurrency(calculateTotalIncludingGST(Number(item.product.selling_price), Number(item.product.tax)) * item.quantity)}</p>
            </div>
          ))}


        </CardBody>
        <Divider />
        <CardFooter>
          <div className="flex gap-2 justify-end w-full">
            <Button size="sm" onPress={onProductFormOpen}>
              Add product(s)
            </Button>
            <Button size="sm" onPress={onServiceFormOpen}>
              Add service
            </Button>
          </div>
          <div className="w-full">
            <div className="flex justify-end ">
              <p className="w-[100px]">
                Items Subtotal:
              </p>
              <p className="w-[100px]">
                {
                  formatCurrency(amount_with_gst)
                }
              </p>
            </div>
            <div className="flex justify-end ">
              <p className="w-[100px]">
                Voucher(s):
              </p>
              <p className="w-[100px]">
                {formatCurrency(services ? services.discount : 0)}
              </p>
            </div>
            <div className="flex justify-end ">
              <p className="w-[100px]">
                Shipping:
              </p>
              <p className="w-[100px]">
                {formatCurrency(services ? services.shipping_charges : 0)}
              </p>
            </div>
            <div className="flex justify-end ">
              <p className="w-[100px]">
                Other charges:
              </p>
              <p className="w-[100px]">
                {formatCurrency(services ? services.other_charge : 0)}
              </p>
            </div>
            <div className="flex justify-end ">
              <p className="w-[100px]">
                Order Total:
              </p>
              <p className="w-[100px]">
                {formatCurrency(
                  (services?.shipping_charges || 0) +
                  (services?.other_charge || 0) -
                  (services?.discount || 0) +
                  (amount_with_gst || 0)
                )}
              </p>
            </div>
          </div>

        </CardFooter>
      </Card>

      <Product_service
        isOpen={isServiceFormOpen}
        onClose={onServiceFormClose}
        set_services={set_services}
      />
      <ProductForm isOpen={isProductFormOpen} onClose={onProductFormClose}
        list={product_list} set_Poduct_list={set_Poduct_list}
      />
    </div>
  );
};




const ProductForm: React.FC<popover> = ({ isOpen, onClose, list, set_Poduct_list }) => {
  const [filterValue, setFilterValue] = useState<string>("");
  const [debouncedFilterValue, setDebouncedFilterValue] = useState<string>(filterValue);
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<order_product_type_form>({});

  // Fetching product data
  const { data: product_data } = useGetAllproductsQuery({
    is_active: "yes",
    is_delete: "no",
    keyword: debouncedFilterValue,
    status: "active",
    rowsPerPage: 10,
    page: 1,
  });
  const [getSingle, { isLoading }] = useGetSingleMutation();

  // Debounce for filtering products
  const handleDebouncedFilter = useMemo(
    () => debounce((value) => setDebouncedFilterValue(value), 300),
    []
  );

  useEffect(() => {
    handleDebouncedFilter(filterValue);
  }, [filterValue, handleDebouncedFilter]);

  // Filter the product data
  const filter_product_data = useMemo(() => {
    return (
      product_data?.product?.map((item: any) => ({
        label: item.name,
        value: item._id,
      })) || []
    );
  }, [product_data]);

  const onSubmit: SubmitHandler<any> = useCallback(
    async (formData: any) => {
      try {
        const { product, quantity } = formData;  // Extract 'product' (or any other field) from form data
        const result = await getSingle(product);  // Pass the product or id to the mutation
        if (result?.data) {
          const data: any = result.data;
          const porduct: any = data?.product;
          set_Poduct_list((prev: any) => [
            ...prev,
            { product: porduct, quantity: quantity }  // Correct spelling and ensure quantity is defined
          ]);
        } else {
          const data: any = result.error;
          const error: any = data.data.message;
          toast.error(error)
        }
      } catch (error: any) {
        toast.error('Error fetching data:', error)
      }
    },
    [getSingle]  // Dependency array for useCallback
  );

  const removeHandler = (index: number) => {
    const remove_data = list.filter((_: any, i: number) => i !== index); // Fixed the filter syntax
    set_Poduct_list(remove_data); // Set the state with the filtered list
  };

  return (
    <Modal size={"4xl"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Add products</ModalHeader>
            <ModalBody>

              <div className="flex gap-2">
                <div className="w-[69%]">Product</div>
                <div className="w-[29%]">Quantity</div>
              </div>
              <Divider />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-2">
                  <div className="w-[69%]">
                    <Secondary_Autocomplete_field
                      control={control}
                      errors={errors}
                      name="product"
                      label_name="Search product"
                      options={filter_product_data}
                    />
                  </div>

                  <div className="w-[29%]">
                    <Input_field
                      control={control}
                      errors={errors}
                      name="quantity"
                      label="Quantity"
                      type="number"
                    />
                  </div>
                </div>
                <div className="mt-10">
                  <div className="flex w-full">
                    <p className="w-[60%] my-2">Item</p>
                    <p className="w-[10%] my-2 text-center">Cost</p>
                    <p className="w-[10%] my-2 text-center">Qnty</p>
                    <p className="w-[10%]  my-2 text-center">Total</p>
                    <p className="w-[10%] my-2 text-center">Remove</p>
                  </div>
                  {list && list.map((item: any, i: number) => (
                    <div className="flex w-full mt-3">
                      <p className="w-[60%] my-2">{item.product.name}</p>
                      <p className="w-[10%] my-2 text-center">{item.product.selling_price}</p>
                      <p className="w-[10%] my-2 text-center">{item.quantity}</p>
                      <p className="w-[10%] my-2 text-center">{calculateTotalIncludingGST(Number(item.product.selling_price), Number(item.product.tax)) * item.quantity}</p>
                      <div className="w-[10%]  my-2 justify-center flex "><CircleX onClick={() => removeHandler(i)} className="cursor-pointer text-red" size={20} /></div>

                    </div>
                  ))}
                </div>
                <ModalFooter className="mt-2">
                  <Button color="danger"
                    variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button className="bg-black text-white" type="submit">
                    Add
                  </Button>
                </ModalFooter>
              </form>

              {isLoading && (
                <div className="absolute z-10 inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                  <CircularProgress />
                </div>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};



const Product_service: React.FC<popover> = ({ isOpen, set_services, onClose }) => {

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<other_sevice>({});

  const onSubmit = (formData: any) => {
    set_services(formData)
    onClose()
  }

  return (
    <>
      <Modal size={"4xl"} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add service
              </ModalHeader>
              <ModalBody>

                <Divider />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex gap-2 my-2" >
                    <div className="w-[32%]">
                      <Input_field
                        control={control}
                        errors={errors}
                        name="shipping_charges"
                        label="Shipping charge"
                        type="number"

                      />
                    </div>

                    <div className="w-[32%]">
                      <Input_field
                        control={control}
                        errors={errors}
                        name="discount"
                        label="Discount amount"
                        type="number"

                      />
                    </div>
                    <div className="w-[32%]">
                      <Input_field
                        control={control}
                        errors={errors}
                        name="other_charge"
                        label="Other Charges"
                        type="number"
                      />
                    </div>
                  </div>
                  <Divider />
                  <ModalFooter className="mt-2">

                    <Button color="danger"
                      variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button className="bg-black text-white" type="submit">
                      Add
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>

            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Order_product_form;