import { Children, useEffect, useRef } from "react";
import { createPortal } from 'react-dom';

//portals allow you to render to a different place within a component, basically
//simplifies modals (element over top of everything else) this is done by creating
//a separate div in the index.html component with id of modal, 

const Modal = ( {children} ) => {
    //ref is container to give back same thing each time, same div everytime on each re-render
    //gets attached/reattached
    const elRef = useRef(null);
    if (!elRef.current){
        elRef.current = document.createElement('div');
    }

    useEffect(() => {
        const ModalRoot = document.getElementById("modal");
        ModalRoot.appendChild(elRef.current)

        //need to unmount the child (component will unmount), this is
        //the way in a functional component
        return () => ModalRoot.removeChild(elRef.current);
    }, []);

    //
    return createPortal(<div> {children} </div>, elRef.current)
}

export default Modal;