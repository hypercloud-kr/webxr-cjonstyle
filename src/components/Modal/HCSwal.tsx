import { createRoot } from 'react-dom/client';
import Swal from 'sweetalert2';
import withReactContent, {
  ReactSweetAlertOptions,
} from 'sweetalert2-react-content';
import { uuidv4 } from '../../util/util';
import './HCSwal.scss';
import 'animate.css';
// import styled from "styled-components";
const HcSwal = withReactContent(Swal);

interface RootSwal extends Omit<ReactSweetAlertOptions, ''> {
  id?: string;
  component: React.ReactElement;
}

const HcSwalRoot = ({
  id = uuidv4(),
  component,
  ...anotherProps
}: RootSwal) => {
  return HcSwal.fire({
    html: <div id={id} />,
    didOpen: () => {
      // Safari에서 렌더링이 바로 되지 않는 문제가 있어서 setTimeout으로 렌더링을 1ms 지연시킴
      const swalDom = document.getElementById('swal2-html-container');
      const swalRoot = document.getElementById(id);
      if (swalRoot) {
        const root = createRoot(swalRoot);
        root.render(component);
      } else if (swalDom) {
        const observer = new MutationObserver(() => {
          if (document.getElementById(id)) {
            const root = createRoot(document.getElementById(id) as HTMLElement);
            root.render(component);
            observer.disconnect();
          }
        });
        observer.observe(swalDom, { childList: true, subtree: true });
      } else {
        setTimeout(() => {
          const root = createRoot(document.getElementById(id) as HTMLElement);
          root.render(component);
        }, 100);
      }
    },
    showConfirmButton: false,
    ...anotherProps,
  });
};

export { HcSwal, HcSwalRoot };
