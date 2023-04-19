import { useRef, createContext } from 'react'

export const ScrollContext = createContext()

export function ScrollContextProvider({children}) {

    const firstRef = useRef(null);
    const secondRef = useRef(null);
    const thirdRef = useRef(null);
    const fourthRef = useRef(null);

    function scrollToFirst() {
        firstRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function scrollToSecond() {
        secondRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function scrollToThird() {
        thirdRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function scrollToFourth() {
        fourthRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }


    return (
        <ScrollContext.Provider value={
            {
                firstRef,
                secondRef,
                thirdRef,
                fourthRef,
                scrollToFirst,
                scrollToSecond,
                scrollToThird,
                scrollToFourth
            }
        }>
            {children}
        </ScrollContext.Provider>
    )
}

export default ScrollContext