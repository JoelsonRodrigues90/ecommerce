import { useEffect, useState } from "react"
import { Card, List,Image, Typography, Badge ,Rate, Button, message, Spin} from "antd";
import {getAllProducts, getProductsByCategory,addToCart} from '../../API'
import { useParams } from "react-router-dom";


export default function Products(){
    const param = useParams()
    const[items,setItems] = useState([]);
    const[loading,setLoading] = useState(false);
    useEffect(()=>{
        setLoading(true);
        (param?.categoryId ? getProductsByCategory(param.categoryId):getAllProducts()).then((res)=>{
            setItems(res.products);
            setLoading(false)
        });
    },[param]);
    if(loading){
        return<Spin spinning/>
    }
    return<div>
       <List 
       grid={{column:3}}
       renderItem={(product,index) =>{
        return (
        <Badge.Ribbon className="cardItemBadge" text={product.discountPercentage} color="red">
        <Card
            className="cardItem"
            title={product.title}
            key={index}
            cover={<Image 
                className="cardImage"
                src={product.thumbnail}/>
            }
            actions={[
                <Rate allowHalf disable value={product.rating}/>,
                <AddToCartButton item={product} 
                />
            ]}
        >
            <Card.Meta title={<Typography.Paragraph>Preço: ${product.price}{" "}
                <Typography.Text delete type="danger">
                   $ 
                 {parseFloat(product.price + 
                 product.price * product.discountPercentage/100).toFixed(2)}
                </Typography.Text>
            </Typography.Paragraph>
        }
            description={<Typography.Paragraph ellipsis={{rows:2,expandable:true,symbol:'more'}}>{product.description}</Typography.Paragraph>}
        >
            </Card.Meta>
        </Card>
        </Badge.Ribbon>
       );
       }} 
       dataSource={items}></List>
    </div>
}

function AddToCartButton({item}){
    const [loading,setLoading] = useState(false)
    const addProductCart = () =>{
        setLoading(true)
        addToCart(item.id).then((res)=>{
            message.success(`${item.title} has been added to cart`)
            setLoading(false)
        })
    }
    return <Button type="link" onClick={()=>{
        addProductCart()
    }}
    loading={loading}
    >Add to Cart</Button>
}
