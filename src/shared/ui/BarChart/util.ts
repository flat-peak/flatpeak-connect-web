import {RateEntryDecorated} from "../../../features/connect/lib/types.ts";

export const expandRates = (rates: Array<RateEntryDecorated>) => {
    const expandedTariffs: Array<RateEntryDecorated> = [];

    rates.forEach(tariff => {
        const startTime = new Date(tariff.valid_from);
        const endTime = new Date(tariff.valid_to);

        while (startTime < endTime) {
            const nextHour = new Date(startTime);
            nextHour.setHours(nextHour.getHours() + 1);
            const nextHourTimestamp = nextHour.toISOString();

            expandedTariffs.push({
                tariff: tariff.tariff,
                valid_from: startTime.toISOString(),
                valid_to: nextHourTimestamp,
                peak: tariff.peak
            });

            startTime.setTime(nextHour.getTime());
        }
    });

    return expandedTariffs;
}
