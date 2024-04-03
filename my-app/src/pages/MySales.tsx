import { Button, Space } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import React from "react";
import ProductForm from "../components/ProductForm";

const MySales: React.FC = () => {
  const [showProductForm, setShowProductForm] = React.useState(false);
  return (
    <div className="m-3">
      Sales
      <div className="flex justify-end ">
        <Space>
          <Button
            type="default"
            className="py-auto"
            onClick={() => setShowProductForm(true)}
          >
            <PlusCircleFilled />
            Add Product
          </Button>
        </Space>
      </div>
      {showProductForm && (
        <ProductForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
        />
      )}
    </div>
  );
};

export default MySales;
