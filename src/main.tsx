import ReactDOM from 'react-dom/client';
import '@hypercloud-kr/styling-kit';
import App from './App.tsx';
import './index.css';
import './reset.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from '@emotion/styled';

const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    background-color: transparent;
    color: white;
    box-shadow: none;
    padding-bottom: 46px;
    margin-bottom: 0px !important;
  }
`;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <StyledToastContainer containerId={'link-toast'} />
  </>
);
