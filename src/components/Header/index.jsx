import {HomeFilled,ShoppingCartOutlined} from '@ant-design/icons'
import {Badge, Button, Checkbox, Drawer, Form, Input, InputNumber, Menu, Table, Typography, message} from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {getCart} from '../../API'


export default function Header(){

    const navigate = useNavigate();
    const onMenuClick = (item) => {
        navigate(`/${item.key}`)
    }

    return<div className='header'>
        <Menu 
            onClick={onMenuClick}
            mode="horizontal" 
            items={[
            {
                label: <HomeFilled/>,
                key:"",
            },
            {
                label:"Men",
                key:"men",
                children:[
                    {
                        label:"Mens Shirts",
                        key:"mens-shirts"
                    },
                    {
                        label:"Mens Shoes",
                        key:"mens-shoes"
                    },
                    {
                        label:"Mens Watches",
                        key:"mens-watches"
                    },
                ]
            },
            {
                label:"Women",
                key:"women",
                children:[
                    {
                        label:"Women's Bags",
                        key:"womens-bags"
                    },
                    {
                        label:"Womens Watches",
                        key:"womens-watches"
                    },
                    {
                        label:"Womens-jewellery",
                        key: "womens-jewellery",
                    },
                ]
            },
            {
                label:"Fragrances",
                key:"fragrances",
            }
        ]}/>
        <AppCart/>
    </div>
    function AppCart(){
        const [cartOpen,setCartOpen] = useState(false);
        const [checkout,setCheckOut] = useState(false);
        const [cartItems,setCartItems] = useState([]);
        useEffect(()=>{
            getCart().then(res=>{
                setCartItems(res.products)
            })
        },[])

    const onConfirmed=(values)=>{
        console.log({values})
        setCartOpen(false)
        setCheckOut(false)
        message.success("Your order has been placed sucess")
    }   

       return<div>
       <Badge onClick={()=>{
        setCartOpen(true)
       }} className="cartIconHeader" count={cartItems.length}><ShoppingCartOutlined/></Badge>
        <Drawer open={cartOpen} onClose={()=>{
            setCartOpen(false)}}
            title="Your Cart"
            contentWrapperStyle={{width: 600}}
            >
                <Table 
                pagination={false}
                columns={[{
                   title:"Title",
                    dataIndex:'title'
                },{
                    title:'Price',
                    dataIndex:'price',
                    render: (value)=>{
                        return<span>${value}</span>;
                    }
                },
                {
                    title:'Quantity',
                    dataIndex:'quantity',
                    render: (value,record)=>{
                        return<InputNumber min={0} defaultValue={value} onChange={(value)=>{
                         setCartItems(pre=> pre.map(cart=>{
                                if(record.id === cart.id){
                                    cart.total = cart.price*value
                                }
                                return cart
                            })
                        )}}></InputNumber>
                    }
                },
                {
                    title:'Total',
                    dataIndex:'total',
                    render: (value)=>{
                        return<span>${value}</span>
                    }
                },]}
                    dataSource={cartItems}
                    summary={(data)=>{
                        const total = data.reduce((pre,current)=>{
                            return pre+current.total
                        },0);
                        return<span>Total: {total}</span>
                    }}
                />
                <Button onClick={()=>{
                    setCheckOut(true)                   
                }} type='primary'>Checkout Your Cart</Button>
            </Drawer>
            <Drawer open={checkout} onClose={()=>{
                setCheckOut(false)
            }}
                title='Confirm Order'
            >
            <Form onFinish={onConfirmed}>
                <Form.Item rules={[
                    {
                    required:true,
                    message: "Please,enter your name"
                },
                ]} label='Full Name' name='full_name'>
                    <Input placeholder='Enter your name...'/>
                </Form.Item>

                <Form.Item rules={[
                    {
                    required:true,
                    type:'email',
                    message:"Please,enter valid email"
                },
                ]} label='Email' name='your_email'>
                   <Input placeholder='Enter your email...'/>
                </Form.Item>

                <Form.Item rules={[
                    {
                    required:true,
                    message:"Please,enter your address"
                },
                ]} label='Address' name='your_address'>
                    <Input placeholder='Enter your adress...'/>
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    {" "}
                    Confirm Order
                </Button>
            </Form>    
            </Drawer>
      </div>
    }
}