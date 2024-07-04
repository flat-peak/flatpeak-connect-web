import {useConnect} from "../../features/connect/lib/ConnectProvider.tsx";
import {FormEventHandler, useState} from "react";
import ButtonBig from "../../shared/ui/ButtonBig/ButtonBig.tsx";
import Layout from "../../shared/ui/Layout/Layout.tsx";
import MainHeading from "../../shared/ui/MainHeading/MainHeading.tsx";
import Typography from "../../shared/ui/Typography/Typography.tsx";
import Box from "../../shared/ui/Box/Box.tsx";
import BlockHeading from "../../shared/ui/BlockHeading/BlockHeading.tsx";
import InputRate from "../../shared/ui/InputRate/InputRate.tsx";
import FooterActions from "../../shared/ui/FooterActions/FooterActions.tsx";
import {LeadingText} from "../../shared/ui/LeadingText/LeadingText.tsx";
import NightIcon from "../../shared/ui/icons/NightIcon.tsx";
import DayIcon from "../../shared/ui/icons/DayIcon.tsx";
import Separator from "../../shared/ui/Separator/Separator.tsx";
import InputTime from "../../shared/ui/InputTime/InputTime.tsx";
import {submitAction} from "../../features/connect/lib/service.ts";
import {getCurrencySymbol} from "../../shared/util.ts";
import DemoDisclaimer from "../../shared/ui/DemoDisclaimer/DemoDisclaimer.tsx";

export const RateTodCapture = () => {
    const { action, proceed} = useConnect<"rate_tod_capture">();

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        const {
            day_startTime: {value: dayStartTime},
            day_endTime: {value: dayEndTime},
            day_cost: {value: dayCost},
            night_startTime: {value: nightStartTime},
            night_endTime: {value: nightEndTime},
            night_cost: {value: nightCost},
        } = event.target as unknown as {[PostalAddressKey: string]: {value: string}};
        proceed(submitAction({
            route: action.route,
            type: "submit",
            connect_token: action.connect_token,
            data: {
                hours: [
                    {valid_from: dayStartTime+':00', valid_to: dayEndTime+':00', cost: Number(dayCost)},
                    {valid_from: nightStartTime+':00', valid_to: nightEndTime+':00', cost: Number(nightCost)},
                ]
            }
        }));
    }

    const [dayStart, setDayStart] = useState("00:00")
    const [dayEnd, setDayEnd] = useState("00:00")
    const [nightStart, setNightStart] = useState("00:00")
    const [nightEnd, setNightEnd] = useState("00:00")

    return (
        <Layout component={"form"} footer={<FooterActions><ButtonBig label={"Next"} type="submit"/><DemoDisclaimer/></FooterActions>} onSubmit={handleSubmit} noValidate>
            <MainHeading text="Day & night tariff plan" />
            <LeadingText>
                <Typography color="black_a40" variant="leading_string">
                    Please schedule day and night time periods and provide the rates.
                </Typography>
            </LeadingText>
            {/*<Slider>*/}
            {/*    <FormSlide color={"yellow"}>*/}
            {/*        <BlockHeading text="Day Time Period" icon={<DayIcon width={24} height={32}/>}/>*/}
            {/*        <Box pt={16} pb={16}><Separator/></Box>*/}
            {/*        <Box cg={8} d={"row"}>*/}
            {/*            <InputTime name="day_startTime" label={"Start"}  variant={"secondary"}/>*/}
            {/*            <InputTime name="day_endTime" label={"End"}  variant={"secondary"}/>*/}
            {/*        </Box>*/}
            {/*        <Box mt={8}>*/}
            {/*            <InputRate name="day_cost" variant={"secondary"} currency={getCurrencySymbol(action.data.currency_code)}/>*/}
            {/*        </Box>*/}
            {/*    </FormSlide>*/}

            {/*    <FormSlide color={"blue"}>*/}
            {/*        <BlockHeading text="Night Time Period" icon={<NightIcon width={24} height={32}/>}/>*/}
            {/*        <Box pt={16} pb={16}><Separator/></Box>*/}
            {/*        <Box cg={8} d={"row"}>*/}
            {/*            <InputTime name="night_startTime" label={"Start"} variant={"secondary"}/>*/}
            {/*            <InputTime name="night_endTime" label={"End"}  variant={"secondary"}/>*/}
            {/*        </Box>*/}
            {/*        <Box mt={8}>*/}
            {/*            <InputRate name="night_cost" variant={"secondary"} currency={getCurrencySymbol(action.data.currency_code)}/>*/}
            {/*        </Box>*/}
            {/*    </FormSlide>*/}
            {/*</Slider>*/}

            <Box rg={16}>
                <BlockHeading text="Day Time Period" icon={<DayIcon width={24} height={32}/>}/>
                <Box cg={8} d={"row"}>
                    <InputTime name="day_startTime" value={dayStart} label={"Start"} variant={"primary"}
                               onChange={(e) => { setDayStart(e.target.value); setNightEnd(e.target.value) }} />
                    <InputTime name="day_endTime" value={dayEnd} label={"End"} variant={"primary"}
                               onChange={(e) => { setDayEnd(e.target.value); setNightStart(e.target.value) }} />
                    <InputRate name="day_cost" currency={getCurrencySymbol(action.data.currency_code)}/>
                </Box>

                <Separator/>

                <BlockHeading text="Night Time Period" icon={<NightIcon width={24} height={32}/>}/>
                <Box cg={8} d={"row"}>
                    <InputTime name="night_startTime" value={nightStart} label={"Start"} variant={"primary"}
                               onChange={(e) => { setNightStart(e.target.value); setDayEnd(e.target.value) }} />
                    <InputTime name="night_endTime" value={nightEnd} label={"End"} variant={"primary"}
                               onChange={(e) => { setNightEnd(e.target.value); setDayStart(e.target.value) }} />
                    <InputRate name="night_cost" currency={getCurrencySymbol(action.data.currency_code)}/>
                </Box>
            </Box>
        </Layout>
    )
}
