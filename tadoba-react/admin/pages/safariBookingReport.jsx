import React, { useEffect, useState } from 'react';
// import { getAllSafariBookings, updateSafariBooking } from '../service/api';
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';

const { Option } = Select;

const SafariBookingReport = () => {
    const [bookings, setBookings] = useState([]);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await getAllSafariBookings();
            setBookings(response.data);
        } catch (error) {
            message.error("Failed to load safari bookings");
        }
    };

    const handleView = (booking) => {
        setSelectedBooking(booking);
        setIsViewModalOpen(true);
    };

    const handleEdit = (booking) => {
        setSelectedBooking(booking);
        setIsEditModalOpen(true);
        form.setFieldsValue({
            status: booking.status,
        });
    };

    const handleUpdateBooking = async (values) => {
        try {
            await updateSafariBooking(selectedBooking._id, values);
            message.success("Booking updated successfully");
            fetchBookings();
            setIsEditModalOpen(false);
        } catch (error) {
            message.error("Failed to update booking");
        }
    };

    const columns = [
        { title: 'Booking ID', dataIndex: '_id', key: '_id' },
        { title: 'Customer Name', dataIndex: 'customer_name', key: 'customer_name' },
        { title: 'Safari Type', dataIndex: 'safari_type', key: 'safari_type' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button type="default" onClick={() => handleView(record)} style={{ marginRight: 8 }}>
                        View
                    </Button>
                    <Button type="primary" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                </>
            )
        }
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Safari Booking Report</h1>
            <Table dataSource={bookings} columns={columns} rowKey="_id" />

            {/* View Safari Booking Modal */}
            <Modal title="Booking Details" visible={isViewModalOpen} onCancel={() => setIsViewModalOpen(false)} footer={null}>
                {selectedBooking && (
                    <div>
                        <p><strong>Booking ID:</strong> {selectedBooking._id}</p>
                        <p><strong>Customer Name:</strong> {selectedBooking.customer_name}</p>
                        <p><strong>Safari Type:</strong> {selectedBooking.safari_type}</p>
                        <p><strong>Date:</strong> {selectedBooking.date}</p>
                        <p><strong>Status:</strong> {selectedBooking.status}</p>
                    </div>
                )}
            </Modal>

            {/* Edit Safari Booking Modal */}
            <Modal title="Edit Booking" visible={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} footer={null}>
                <Form form={form} layout="vertical" onFinish={handleUpdateBooking}>
                    <Form.Item name="status" label="Booking Status" rules={[{ required: true, message: 'Please select status' }]}>
                        <Select placeholder="Select status">
                            <Option value="Pending">Pending</Option>
                            <Option value="Confirmed">Confirmed</Option>
                            <Option value="Cancelled">Cancelled</Option>
                        </Select>
                    </Form.Item>

                    <Button type="primary" htmlType="submit">Update</Button>
                </Form>
            </Modal>
        </div>
    );
};

export default SafariBookingReport;
