import { useRef, createContext } from 'react'


type ScrollContextType = {
    firstRef: React.RefObject<HTMLHeadingElement>,
    secondRef: React.RefObject<HTMLHeadingElement>,
    thirdRef: React.RefObject<HTMLHeadingElement>,
    fourthRef: React.RefObject<HTMLHeadingElement>,
    scrollToFirst: () => void,
    scrollToSecond: () => void,
    scrollToThird: () => void,
    scrollToFourth: () => void
}

export const ScrollContext = createContext<ScrollContextType>({} as ScrollContextType)

export function ScrollContextProvider({children}: {children: React.ReactNode}) {

    const firstRef = useRef<HTMLHeadingElement>(null);
    const secondRef = useRef<HTMLHeadingElement>(null);
    const thirdRef = useRef<HTMLHeadingElement>(null);
    const fourthRef = useRef<HTMLHeadingElement>(null);

    function scrollToFirst() {
        if (firstRef.current)
            firstRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function scrollToSecond() {
        if (secondRef.current)
            secondRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function scrollToThird() {
        if (thirdRef.current)
            thirdRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function scrollToFourth() {
        if (fourthRef.current)
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