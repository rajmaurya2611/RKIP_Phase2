import { useState } from "react";
import { Form, Input, Button, message, Table, Spin } from "antd";
import { useSubmitFeedbackMutation, useFetchRecentFeedbackQuery } from "../store/slices/mainApiSlice";

const Feedback = () => {
  const [form] = Form.useForm();
  const [submitFeedback, { isLoading }] = useSubmitFeedbackMutation();
  const { data, refetch, isFetching } = useFetchRecentFeedbackQuery(); // Fetch recent feedback
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (values: { name: string; feedback: string }) => {
    try {
      await submitFeedback(values).unwrap();
      message.success("Feedback submitted successfully!");
      form.resetFields();
      setSubmitted(true);
      refetch(); // Refresh recent feedback
    } catch (error) {
      message.error("Error submitting feedback. Please try again.");
      console.error("Feedback submission error:", error);
    }
  };

  // ✅ Transform feedback array into objects
  const formattedFeedback = data?.recent_feedback?.map((item: string[], index: number) => ({
    key: index, // Required for Ant Design Table
    name: item[0], // First element is name
    feedback: item[1], // Second element is feedback
  })) || [];

  // ✅ Define Table Columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
    },
  ];

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Submit Feedback</h2>

      {!submitted ? (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Your Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Your Feedback"
            name="feedback"
            rules={[{ required: true, message: "Please enter your feedback" }]}
          >
            <Input.TextArea rows={4} placeholder="Write your feedback here..." />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={isLoading} block>
            Submit Feedback
          </Button>
        </Form>
      ) : (
        <p className="text-green-600 font-semibold">Thank you for your feedback! 😊</p>
      )}

      {/* Display Top 3 Feedback in Table */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-700">Recent Feedback</h3>

        {isFetching ? (
          <Spin size="large" />
        ) : (
          <Table
            dataSource={formattedFeedback}
            columns={columns}
            pagination={false} // Disable pagination since we only show 3 items
            bordered
          />
        )}
      </div>
    </div>
  );
};

export default Feedback;
