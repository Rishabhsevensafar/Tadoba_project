import React from 'react';
import { Card, Row, Col, Statistic, theme } from 'antd';
import { 
  ShoppingCartOutlined,
  UserOutlined,
  CompassOutlined,
  AppstoreOutlined 
} from '@ant-design/icons';

const DashboardStats = () => {
  const { token } = theme.useToken();

  const stats = [
    {
      label: "Total Bookings",
      value: 1000,
      icon: <ShoppingCartOutlined />,
      color: token.colorSuccess,
      prefix: "₹"
    },
    {
      label: "Total Users",
      value: 500,
      icon: <UserOutlined />,
      color: token.colorInfo
    },
    {
      label: "Total Tours",
      value: 200,
      icon: <CompassOutlined />,
      color: token.colorWarning
    },
    {
      label: "Total Categories",
      value: 70,
      icon: <AppstoreOutlined />,
      color: token.colorPrimary
    }
  ];

  const cardStyle = {
    height: '100%',
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowTertiary
  };

  const iconStyle = (color) => ({
    fontSize: '28px',
    color: color,
    backgroundColor: `${color}15`,
    padding: '16px',
    borderRadius: '50%',
    marginBottom: '16px'
  });

  return (
    <Row gutter={[24, 24]}>
      {stats.map((stat, index) => (
        <Col xs={24} sm={12} lg={6} key={index}>
          <Card style={cardStyle} hoverable>
            <div style={{ textAlign: 'center' }}>
              <div style={iconStyle(stat.color)}>
                {stat.icon}
              </div>
              <Statistic
                title={<span style={{ fontSize: '16px' }}>{stat.label}</span>}
                value={stat.value}
                prefix={stat.prefix}
                valueStyle={{ 
                  color: stat.color,
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}
              />
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default DashboardStats;