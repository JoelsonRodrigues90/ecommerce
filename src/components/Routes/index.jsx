import { Routes,Route } from "react-router-dom";
import Category from "../../pages/Category";

export default function Approutes(){
    return<Routes>
        <Route path="" element={<Category/>}/>
        <Route path="/:categoryId" element={<Category/>}/>
    </Routes>
}