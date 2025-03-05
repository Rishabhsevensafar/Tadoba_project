import React, { useEffect, useState } from 'react';
import { getAllHotels, createHotel, updateHotel, deleteHotel } from '../service/api';
import { 
  Table, Button, Popconfirm, message, Modal, Form, Input, 
  Upload, Tag, Typography, Rate, Divider, Space, InputNumber, Card,
  Select, Row, Col
} from 'antd';
import { 
  UploadOutlined, DeleteOutlined, EditOutlined, PlusOutlined, 
  HomeOutlined, DollarOutlined, BankOutlined, EnvironmentOutlined, CoffeeOutlined, WifiOutlined, GlobalOutlined, CloseCircleOutlined, CheckCircleOutlined
} from '@ant-design/icons';
// import { FaRupeeSign } from 'react-icons/fa';
import { FaIndianRupeeSign } from 'react-icons/fa6';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const HotelManager = () => {
    const [hotels, setHotels] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [form] = Form.useForm();
    const [images, setImages] = useState([]);
    const [editingHotelId, setEditingHotelId] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // State for amenities and facilities
    const [amenities, setAmenities] = useState([]);
    const [newAmenity, setNewAmenity] = useState('');
    const [facilities, setFacilities] = useState([]);
    const [newFacility, setNewFacility] = useState('');

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        setLoading(true);
        try {
            const response = await getAllHotels();
            console.log("Full API Response:", response.data); // Debug API response
    
            // Ensure hotels is always an array
            if (Array.isArray(response.data)) {
                setHotels(response.data);
            } else if (response.data.hotels && Array.isArray(response.data.hotels)) {
                setHotels(response.data.hotels);
            } else {
                console.error("Unexpected API response format:", response.data);
                setHotels([]); // Set empty array to avoid crashes
            }
        } catch (error) {
            message.error("Failed to load hotels");
            setHotels([]); // Prevent crashing
        } finally {
            setLoading(false);
        }
    };
    

    const handleDelete = async (id) => {
        try {
            await deleteHotel(id);
            message.success("Hotel deleted successfully");
            fetchHotels();
        } catch (error) {
            message.error("Failed to delete hotel");
        }
    };

    const handleImageUpload = ({ fileList }) => {
        setImages(fileList);
    };

    const handleAddOrEditHotel = async (values) => {
        const formData = new FormData();
        
        Object.keys(values).forEach(key => {
            if (key === 'location') {
                formData.append('location[name]', values.location.name);
                formData.append('location[pincode]', values.location.pincode);
            } else if (key === 'amenities' || key === 'facilities') {
                // Skip these as we'll handle them separately
            } else {
                formData.append(key, values[key]);
            }
        });
    
        amenities.forEach((item, index) => {
            formData.append(`amenities[${index}]`, item);
        });
    
        facilities.forEach((item, index) => {
            formData.append(`facilities[${index}]`, item);
        });
    
        images.forEach((file) => {
            if (file.originFileObj) {
                formData.append('images', file.originFileObj);
            }
        });
    
        try {
            setLoading(true);
            let response;
    
            if (isEditMode) {
                response = await updateHotel(editingHotelId, formData);
                message.success("Hotel updated successfully");
            } else {
                response = await createHotel(formData);
                message.success("Hotel created successfully");
            }
    
            console.log("API Response:", response); // ✅ Log full response
    
            fetchHotels();
            setIsModalOpen(false);
            form.resetFields();
            setImages([]);
            setAmenities([]);
            setFacilities([]);
            setIsEditMode(false);
            setEditingHotelId(null);
        } catch (error) {
            console.error("Failed to save hotel:", error.response?.data || error);
            message.error(`Error: ${error.response?.data?.error || "Something went wrong"}`);
        } finally {
            setLoading(false);
        }
    };
    

    const handleEdit = (hotel) => {
        setIsEditMode(true);
        setEditingHotelId(hotel._id);
        setIsModalOpen(true);

        form.setFieldsValue({
            title: hotel.title,
            description: hotel.description,
            real_price: hotel.real_price,
            discounted_price: hotel.discounted_price,
            room_type: hotel.room_type,
            location: { 
                name: hotel.location.name, 
                pincode: hotel.location.pincode 
            },
            number_of_stars: hotel.number_of_stars,
            map_location: hotel.map_location,
        });

        // Set amenities and facilities arrays
        setAmenities(hotel.amenities || []);
        setFacilities(hotel.facilities || []);

        setImages(hotel.images.map((url, index) => ({ 
            uid: index, 
            name: `Image ${index + 1}`, 
            status: 'done',
            url 
        })));
    };

    // Add a new amenity
    const handleAddAmenity = () => {
        if (newAmenity && !amenities.includes(newAmenity.trim())) {
            setAmenities([...amenities, newAmenity.trim()]);
            setNewAmenity('');
        }
    };

    // Remove an amenity
    const handleRemoveAmenity = (item) => {
        setAmenities(amenities.filter(amenity => amenity !== item));
    };

    // Add a new facility
    const handleAddFacility = () => {
        if (newFacility && !facilities.includes(newFacility.trim())) {
            setFacilities([...facilities, newFacility.trim()]);
            setNewFacility('');
        }
    };

    // Remove a facility
    const handleRemoveFacility = (item) => {
        setFacilities(facilities.filter(facility => facility !== item));
    };

    const resetForm = () => {
        form.resetFields();
        setImages([]);
        setAmenities([]);
        setFacilities([]);
        setNewAmenity('');
        setNewFacility('');
    };

    const columns = [
        {
            title: <><HomeOutlined /> Hotels & Resorts</>,
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <Space direction="vertical" size={0}>
                    <Text strong>{text}</Text>
                    <Rate disabled defaultValue={record.number_of_stars} />
                </Space>
            ),
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: <><BankOutlined /> Room Type</>,
            dataIndex: 'room_type',
            key: 'room_type',
            width: 120,
            render: text => <Tag color="blue">{text}</Tag>,
            sorter: (a, b) => a.room_type.localeCompare(b.room_type),
        },
        {
            title: <><FaIndianRupeeSign /> Pricing</>,
            key: 'pricing',
            width: 100,
            render: (_, record) => (
                <Space direction="vertical" size={0}>
                    <Text delete type="secondary">₹{record.real_price}</Text>
                    <Text type="danger" strong>₹{record.discounted_price}</Text>
                </Space>
            ),
            sorter: (a, b) => a.discounted_price - b.discounted_price,
        },
        {
            title: <><EnvironmentOutlined /> Location</>,
            key: 'location',
            width: 180,
            render: (_, record) => (
                <Space direction="vertical" size={0}>
                    <Text>{record.location.name}</Text>
                    <Text type="secondary">{record.location.pincode}</Text>
                </Space>
            ),
            sorter: (a, b) => a.location.name.localeCompare(b.location.name),
        },
        {
            title: <><CoffeeOutlined /> Amenities</>,
            dataIndex: 'amenities',
            key: 'amenities',
            render: (amenities, record) => (
                <Space wrap>
                    {amenities.slice(0, 1).map((item, index) => (
                        <Tag key={index} color="green">{item}</Tag>
                    ))}
                    {amenities.length > 3 && (
                        <Text type="secondary">
                            ... <a href={`/hoteldetail/${record._id}`}>More</a>
                        </Text>
                    )}
                </Space>
            )
        },
        {
            title: <><WifiOutlined /> Facilities</>,
            dataIndex: 'facilities',
            key: 'facilities',
            render: (facilities, record) => (
                <Space wrap>
                    {facilities.slice(0, 1).map((item, index) => (
                        <Tag key={index} color="purple">{item}</Tag>
                    ))}
                    {facilities.length > 3 && (
                        <Text type="secondary">
                            ... <a href={`/hoteldetail/${record._id}`}>More</a>
                        </Text>
                    )}
                </Space>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 150,
            render: (_, record) => (
                <Space>
                    <Button 
                        type="primary" 
                        icon={<EditOutlined />} 
                        onClick={() => handleEdit(record)}
                    >
                    </Button>
                    <Popconfirm 
                        title="Are you sure you want to delete this hotel?"
                        okText={<><CheckCircleOutlined /> Yes</>}
                        cancelText={<><CloseCircleOutlined /> No</>}
                        onConfirm={() => handleDelete(record._id)}
                    >
                        <Button danger icon={<DeleteOutlined />}>

                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];

    return (
        <Card className="shadow-md">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <Title level={2}>
                        <HomeOutlined /> Hotels & Resort Management
                    </Title>
                    <Button 
                        type="primary" 
                        icon={<PlusOutlined />} 
                        size="large"
                        onClick={() => { 
                            setIsModalOpen(true); 
                            setIsEditMode(false); 
                            resetForm();
                        }}
                    >
                        Add Hotels & Resort
                    </Button>
                </div>
                
                <Divider />
                
                <Table 
                    dataSource={hotels} 
                    columns={columns} 
                    rowKey="_id" 
                    loading={loading}
                    pagination={{ 
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} hotels`
                    }}

                    bordered
                />

                {/* Add/Edit Hotel Modal */}
                <Modal
                    title={
                        <Space>
                            {isEditMode ? <EditOutlined /> : <PlusOutlined />}
                            {isEditMode ? "Edit Hotels & Resorts" : "Add New Hotels & Resorts"}
                        </Space>
                    }
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                    footer={null}
                    width={800}
                >
                    <Form 
                        form={form} 
                        layout="vertical" 
                        onFinish={handleAddOrEditHotel}
                        requiredMark="optional"
                    >
                        <Form.Item 
                            name="title" 
                            label="Hotels & Resorts Name" 
                            rules={[{ required: true, message: 'Please enter hotel name' }]}
                        >
                            <Input 
                                prefix={<HomeOutlined className="text-gray-400" />} 
                                placeholder="Enter hotels & Resorts name" 
                            />
                        </Form.Item>

                        <Form.Item 
                            name="description" 
                            label="Description" 
                            rules={[{ required: true, message: 'Please enter description' }]}
                        >
                            <TextArea 
                                placeholder="Enter detailed description" 
                                rows={4} 
                            />
                        </Form.Item>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item 
                                name="real_price" 
                                label="Regular Price" 
                                rules={[{ required: true, message: 'Please enter regular price' }]}
                            >
                                <InputNumber
                                    prefix={<DollarOutlined className="text-gray-400" />}
                                    placeholder="Enter regular price"
                                    style={{ width: '100%' }}
                                    min={0}
                                />
                            </Form.Item>

                            <Form.Item 
                                name="discounted_price" 
                                label="Discounted Price" 
                                rules={[
                                    { required: true, message: 'Please enter discounted price' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('real_price') >= value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Discounted price must be less than regular price'));
                                        },
                                    }),
                                ]}
                            >
                                <InputNumber
                                    prefix={<DollarOutlined className="text-gray-400" />}
                                    placeholder="Enter discounted price"
                                    style={{ width: '100%' }}
                                    min={0}
                                />
                            </Form.Item>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item 
                                name="room_type" 
                                label="Room Type" 
                                rules={[{ required: true, message: 'Please enter room type' }]}
                            >
                                <Input 
                                    prefix={<BankOutlined className="text-gray-400" />}
                                    placeholder="e.g., Deluxe, Standard, Suite" 
                                />
                            </Form.Item>

                            <Form.Item 
                                name="number_of_stars" 
                                label="Star Rating" 
                                rules={[{ required: true, message: 'Please enter star rating' }]}
                            >
                                <Rate />
                            </Form.Item>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Form.Item 
                                name={['location', 'name']} 
                                label="Location"
                                rules={[{ required: true, message: 'Please enter location' }]}
                            >
                                <Input 
                                    prefix={<EnvironmentOutlined className="text-gray-400" />}
                                    placeholder="Enter location name" 
                                />
                            </Form.Item>

                            <Form.Item 
                                name={['location', 'pincode']} 
                                label="Pincode" 
                                rules={[
                                    { required: true, message: 'Please enter pincode' },
                                    { pattern: /^\d+$/, message: 'Please enter a valid pincode' }
                                ]}
                            >
                                <Input 
                                    placeholder="Enter pincode"
                                />
                            </Form.Item>
                        </div>

                        {/* Amenities Section with Add Button */}
                        <Form.Item 
                            label={<><CoffeeOutlined /> Amenities</>}
                            required
                            rules={[
                                {
                                    validator: () => {
                                        return amenities.length > 0 
                                            ? Promise.resolve() 
                                            : Promise.reject('Please add at least one amenity');
                                    }
                                }
                            ]}
                        >
                            <div className="mb-2">
                                <Input 
                                    placeholder="Enter amenity" 
                                    value={newAmenity}
                                    onChange={e => setNewAmenity(e.target.value)}
                                    onPressEnter={handleAddAmenity}
                                    addonAfter={
                                        <Button 
                                            type="text" 
                                            icon={<PlusOutlined />} 
                                            onClick={handleAddAmenity}
                                        >
                                            Add
                                        </Button>
                                    }
                                />
                            </div>
                            <div>
                                {amenities.length === 0 && (
                                    <Text type="secondary">No amenities added yet</Text>
                                )}
                                {amenities.map(item => (
                                    <Tag 
                                        key={item} 
                                        color="green" 
                                        closable
                                        onClose={() => handleRemoveAmenity(item)}
                                        style={{ margin: '0 8px 8px 0' }}
                                    >
                                        {item}
                                    </Tag>
                                ))}
                            </div>
                        </Form.Item>

                        {/* Facilities Section with Add Button */}
                        <Form.Item 
                            label={<><WifiOutlined /> Facilities</>}
                            required
                            rules={[
                                {
                                    validator: () => {
                                        return facilities.length > 0 
                                            ? Promise.resolve() 
                                            : Promise.reject('Please add at least one facility');
                                    }
                                }
                            ]}
                        >
                            <div className="mb-2">
                                <Input 
                                    placeholder="Enter facility" 
                                    value={newFacility}
                                    onChange={e => setNewFacility(e.target.value)}
                                    onPressEnter={handleAddFacility}
                                    addonAfter={
                                        <Button 
                                            type="text" 
                                            icon={<PlusOutlined />} 
                                            onClick={handleAddFacility}
                                        >
                                            Add
                                        </Button>
                                    }
                                />
                            </div>
                            <div>
                                {facilities.length === 0 && (
                                    <Text type="secondary">No facilities added yet</Text>
                                )}
                                {facilities.map(item => (
                                    <Tag 
                                        key={item} 
                                        color="purple" 
                                        closable
                                        onClose={() => handleRemoveFacility(item)}
                                        style={{ margin: '0 8px 8px 0' }}
                                    >
                                        {item}
                                    </Tag>
                                ))}
                            </div>
                        </Form.Item>

                        <Form.Item 
                            name="map_location" 
                            label="Map Location URL"
                        >
                            <Input 
                                prefix={<GlobalOutlined className="text-gray-400" />}
                                placeholder="Enter Google Maps URL" 
                            />
                        </Form.Item>

                        <Form.Item label="Hotel Images">
                            <Upload 
                                listType="picture-card" 
                                multiple 
                                fileList={images} 
                                onChange={handleImageUpload} 
                                beforeUpload={() => false}
                            >
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>

                        <Divider />

                        <Form.Item>
                            <Space>
                                <Button 
                                    type="primary" 
                                    htmlType="submit" 
                                    icon={isEditMode ? <EditOutlined /> : <PlusOutlined />}
                                    loading={loading}
                                >
                                    {isEditMode ? "Update Hotel" : "Create Hotel"}
                                </Button>
                                <Button 
                                    onClick={() => setIsModalOpen(false)}
                                    icon={<CloseCircleOutlined />}
                                >
                                    Cancel
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </Card>
    );
};

export default HotelManager;