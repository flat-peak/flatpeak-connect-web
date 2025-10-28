import {useMemo} from "react";
import View from "../View/View.tsx";
import Typography from "../Typography/Typography.tsx";
import Box from "../Box/Box.tsx";
import PriceChartIcon from "../icons/PriceChartIcon.tsx";
import ColorDot from "../icons/ColorDot.tsx";
import LongArrowRightIcon from "../icons/LongArrowRightIcon.tsx";
import styles from "./PriceNow.module.scss";

type PriceNowProps = {
    rates: Array<{
        valid_from: string;
        valid_to: string;
        tariff: {
            cost: number;
        };
        peak: "Low" | "Medium" | "High";
    }>;
    currency: string;
}

export default function PriceNow(props: PriceNowProps) {
    const {rates, currency} = props;
    
    const currentInterval = useMemo(() => {
        const now = new Date();
        const currentRate = rates.find(rate => {
            const startTime = new Date(rate.valid_from);
            const endTime = new Date(rate.valid_to);
            const currentTime = now.getTime();
            return currentTime >= startTime.getTime() && currentTime < endTime.getTime();
        });
        
        if (!currentRate) {
            return null;
        }
        
        return {
            rate: currentRate,
            price: currentRate.tariff.cost
        };
    }, [rates]);
    
    const timeRange = useMemo(() => {
        if (!currentInterval?.rate) {
            return null;
        }
        
        const currentRate = currentInterval.rate;
        const roundedCurrentPrice = Math.round(currentRate.tariff.cost * 100) / 100;
        
        const sortedRates = [...rates].sort((a, b) => {
            const [aHours, aMinutes] = a.valid_from.substring(11, 16).split(":");
            const [bHours, bMinutes] = b.valid_from.substring(11, 16).split(":");
            const aTimeMinutes = parseInt(aHours) * 60 + parseInt(aMinutes);
            const bTimeMinutes = parseInt(bHours) * 60 + parseInt(bMinutes);
            return aTimeMinutes - bTimeMinutes;
        });
        
        const currentIndex = sortedRates.findIndex(rate => rate === currentRate);
        
        let startIndex = currentIndex;
        for (let i = currentIndex - 1; i >= 0; i--) {
            const rate = sortedRates[i];
            const roundedPrice = Math.round(rate.tariff.cost * 100) / 100;
            if (roundedPrice !== roundedCurrentPrice) {
                break;
            }
            startIndex = i;
        }
        
        let endIndex = currentIndex;
        for (let i = currentIndex + 1; i < sortedRates.length; i++) {
            const rate = sortedRates[i];
            const roundedPrice = Math.round(rate.tariff.cost * 100) / 100;
            if (roundedPrice !== roundedCurrentPrice) {
                break;
            }
            endIndex = i;
        }
        
        const startRate = sortedRates[startIndex];
        const endRate = sortedRates[endIndex];
        
        const [startHours, startMinutes] = startRate.valid_from.substring(11, 16).split(":");
        const [endHours, endMinutes] = endRate.valid_to.substring(11, 16).split(":");
        
        return {
            start: `${startHours}:${startMinutes}`,
            end: `${endHours}:${endMinutes}`
        };
    }, [currentInterval, rates]);
    
    const currentPrice = useMemo(() => {
        return currentInterval?.price || 0;
    }, [currentInterval]);

    const formatPrice = (price: number) => {
        return `${price.toFixed(2)}${currency}`;
    };
    
    return (
        <View className={styles.host}>
            <Box className={styles.content}>
                <Box className={styles.header}>
                    <Typography color="black_a60" variant="button__forms14_book">
                        Price now
                    </Typography>
                    <Box className={styles.timeRange}>
                        <ColorDot peak={currentInterval?.rate?.peak || "Medium"} width={10} height={10} />
                        {timeRange ? (
                            <Typography color="black" variant="button__forms14_sup_regular">
                                {timeRange.start} <LongArrowRightIcon width={14} height={6} /> {timeRange.end}
                            </Typography>
                        ) : (
                            <Typography color="black" variant="button__forms14_sup_regular">
                                No data
                            </Typography>
                        )}
                    </Box>
                </Box>
                <Box className={styles.priceRow}>
                    <Typography color="black" variant="button__forms30_regular">
                        {formatPrice(currentPrice)}
                    </Typography>
                    <Typography color="black" variant="button__forms20_regular">/kWh</Typography>
                </Box>
            </Box>
            <PriceChartIcon width={33} height={32} />
        </View>
    );
}
