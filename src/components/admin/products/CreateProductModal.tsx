import { Button } from "@/components/ui/button";

import { Modal } from "@/components/modals/Modals";
import { productKeys } from "@/applicationTypes/applicationTypes";
import UseForm from "@/components/useForm/UseForm";
import { UseInputField } from "@/components/useForm/UseInputField";
import { FieldValues } from "react-hook-form";
import { useState } from "react";
import { UseFileUpload } from "@/components/useForm/UseFileUpload";
import { UseTextArea } from "@/components/useForm/UseTextArea";
import { useCreateProductMutation } from "@/redux/api/endpoints/product.api";
import createFormData from "@/helpers/createFormData";
import handleResponse from "@/helpers/handleResponse";
import { toast } from "sonner";
const CreateProductModal = () => {
  const [isModalOpen, setIsModal] = useState(false);
  const [createProduct] = useCreateProductMutation();
  const handleProductModal = () => {
    setIsModal(true);
  };
  const handleProductForm = async (productPayload: FieldValues) => {
    const { photo, ...data } = productPayload;

    const formData = createFormData({ photo: photo, data: data });
    try {
      const res = await createProduct(formData);
      const result = handleResponse(res);
      if (result?.data) {
        setIsModal(false);
        toast.message(result.message);
      }
    } catch (error) {
      console.log("createProductModal", error);
    }
  };

  return (
    <>
      <Button onClick={handleProductModal}>Create product</Button>

      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          closeModal={setIsModal}
          title="Create product"
          description="create a new product"
          className="sm:max-w-[600px]"
        >
          <UseForm onFormSubmit={handleProductForm}>
            <div className="grid md:grid-cols-2 gap-6">
              <UseInputField
                name={productKeys.NAME}
                label="Name"
                placeholder="Product name"
                key={productKeys.NAME}
                type="text"
              />
              <UseInputField
                name={productKeys.CATEGORY}
                label="Category"
                placeholder="Product category"
                key={productKeys.CATEGORY}
                type="text"
              />
              <UseInputField
                name={productKeys.PRICE}
                label="Price"
                placeholder="Product price"
                key={productKeys.PRICE}
                type="number"
              />
              <UseInputField
                name={productKeys.STOCK}
                label="Stock"
                placeholder="Product stock"
                key={productKeys.STOCK}
                type="number"
              />

              <UseFileUpload
                name={productKeys.PHOTO}
                label="Product photo"
                key={productKeys.PHOTO}
              />
            </div>
            <UseTextArea
              name={productKeys.DESCRIPTION}
              label="Description"
              placeholder="Write you product description briefly......."
              key={productKeys.DESCRIPTION}
            />
            <Button className="w-full">Create</Button>
          </UseForm>
        </Modal>
      )}
    </>
  );
};
export default CreateProductModal;
