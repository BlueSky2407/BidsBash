import React from "react";
import { Col, Form, Input, Modal, Row, App } from "antd";
import { FormInstance } from "antd/lib/form";
import TextArea from "antd/es/input/TextArea";
import { AddProduct } from "../apicalls/Products";

const imp: { required: boolean; message: string }[] = [
  {
    required: true,
    message: "required",
  },
];

const ProductForm: React.FC<{
  showProductForm: boolean;
  setShowProductForm: (show: boolean) => void;
}> = ({ showProductForm, setShowProductForm }) => {
  const { message } = App.useApp();
  const onFinish = async (values: any) => {
    console.log(values);
    try {
      const response = await AddProduct(values);
      if (response.success) {
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      }
    }
  };

  const formRef = React.useRef<FormInstance>(null);

  return (
    <div>
      <Modal
        title="ADD PRODUCT"
        open={showProductForm}
        onCancel={() => setShowProductForm(false)}
        okText="Add"
        onOk={() => {
          formRef.current?.submit();
        }}
        centered
        width={800}
      >
        <Form layout="vertical" onFinish={onFinish} ref={formRef}>
          <Form.Item label="Product Name:" name="name" rules={imp}>
            <Input type="text" placeholder="Iphone 11" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Age(months):" name="age" rules={imp}>
                <Input type="number" placeholder="42" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Category:" name="category" rules={imp}>
                <select>
                  <option value="">Select</option>
                  <option value="electronics">Electronics</option>
                  <option value="sports">Sports</option>
                  <option value="toys">Toys</option>
                  <option value="furniture">Furniture and Decor</option>
                  <option value="cosmetics">Cosmetics and Body care</option>
                  <option value="fashion">Fashion</option>
                  <option value="household">Household Items</option>
                  <option value="other">Other</option>
                </select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Description:" name="description" rules={imp}>
            <TextArea placeholder="Enter other product details" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={9}>
              <Form.Item label="Base Bid:" name="price" rules={imp}>
                <Input type="number" placeholder="25000" />
              </Form.Item>
            </Col>
            <Col span={9}>
              <Form.Item label="Bid ends on:" name="date" rules={imp}>
                <Input type="date" />
              </Form.Item>
            </Col>
            <Col span={6} className="flex">
              <Form.Item label="Bill available:" name="billAvailable">
                <Input
                  type="checkbox"
                  value="billAvailable"
                  onChange={(e) => {
                    formRef.current?.setFieldsValue({
                      billAvailable: e.target.checked,
                    });
                  }}
                  checked={formRef.current?.getFieldValue("billAvailable")}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductForm;
