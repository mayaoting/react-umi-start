import {Table,Popconfirm,Button} from 'antd';
import React from 'react';

const ProductList = ({ onDelete, products }) => {
  const columns = [
    {
      title:'Name',
      dataIndex:'name',
    },
    {
      title:'Actions',
      render: (text: any,record: { id: any; }) => {
        return (
          <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}> 
            <Button>Delete</Button>
          </Popconfirm>
        )
      }
    }
  ];
  return <Table dataSource={products} columns={columns} rowKey="id"/>
}

export default ProductList;