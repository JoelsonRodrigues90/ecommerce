import Footer from './components/Footer';
import Header from './components/Header';
import PageContent from './components/PageContent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

export default function App(){
  return<div className='App'>
    <BrowserRouter>
        <Header/>
        <PageContent/>
        <Footer/>
    </BrowserRouter>
  </div>
}