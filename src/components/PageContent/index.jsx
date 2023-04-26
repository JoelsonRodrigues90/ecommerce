import Approutes from "../Routes"
import { getProductsByCategory } from "../../API"

export default function PageContent(){
    return<div className='pagecontent'>
        <h1>
            <Approutes/>
        </h1>
    </div>
}