import React, {PropsWithChildren, useCallback, useEffect, useRef, useState} from 'react';
import styles from './Slider.module.scss';

const debounce = <F extends (...args: unknown[]) => void>(func: F, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<F>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};
const Slider = (props: PropsWithChildren) => {
    const {children} = props;
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const sliderRef = useRef<HTMLDivElement>(null);
    const hostRef = useRef<HTMLDivElement>(null);

    const navigateToSlide = (index: number) => {
        const slider = sliderRef.current;
        if (slider) {
            const slideToScrollTo = slider.children[index] as HTMLElement;
            slideToScrollTo.scrollIntoView({ behavior: 'smooth', inline: 'start' });
            setActiveIndex(index);
        }
    };

    const updateActiveIndexBasedOnScroll = useCallback(debounce(() => {
        const slider = sliderRef.current;
        const host = hostRef.current;
        if (!slider || !host) return;

        const scrollLeft = slider.scrollLeft;
        const slideWidth = (slider.childNodes[0] as HTMLDivElement).offsetWidth + 8;
        const hostWidth = host.offsetWidth + 48;

        const f = Math.floor((hostWidth + scrollLeft) / slideWidth);
        setActiveIndex(f - 1);
    }, 50), []);

    useEffect(() => {
        const slider = sliderRef.current;
        if (slider) {
            slider.addEventListener('scroll', updateActiveIndexBasedOnScroll, { passive: true });

            return () => {
                slider.removeEventListener('scroll', updateActiveIndexBasedOnScroll);
            };
        }
    }, [children]);

    return (
        <div className={styles.slider} ref={hostRef}>
            <div className={styles.slides} ref={sliderRef}>
                {React.Children.map(children, (child, index) => (
                    <div className={styles.slide} key={index}>
                        {child}
                    </div>
                ))}
            </div>
            <div className={styles.dots}>
                {React.Children.map(children, (_, index) => (
                    <button
                        key={index}
                        type={"button"}
                        className={`${styles.dot} ${index === activeIndex ? styles.active : ''}`}
                        onClick={() => navigateToSlide(index)}
                    >
                        {/* Render dot */}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Slider;
