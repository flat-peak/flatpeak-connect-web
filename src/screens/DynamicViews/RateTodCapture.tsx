import {useConnect} from "../../features/connect/lib/ConnectProvider.tsx";
import {FormEventHandler} from "react";
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
import FormSlide from "../../shared/ui/FormSlide/FormSlide.tsx";
import Slider from "../../shared/ui/Slider/Slider.tsx";
import {getCurrencySymbol} from "../../shared/util.ts";

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

    return (
        <Layout component={"form"} footer={<FooterActions><ButtonBig label={"Next"} type="submit"/></FooterActions>} onSubmit={handleSubmit} noValidate>
            <MainHeading text="Day & night tariff plan" />
            <LeadingText>
                <Typography color="black_a40" variant="leading_string">
                    Please schedule day and night time periods and provide the rates.
                </Typography>
            </LeadingText>
            <Slider>
                <FormSlide color={"yellow"}>
                    <BlockHeading text="Day Time Period" icon={<DayIcon width={24} height={32}/>}/>
                    <Box pt={16} pb={16}><Separator/></Box>
                    <Box cg={8} d={"row"}>
                        <InputTime name="day_startTime" label={"Start"}  variant={"secondary"}/>
                        <InputTime name="day_endTime" label={"End"}  variant={"secondary"}/>
                    </Box>
                    <Box mt={8}>
                        <InputRate name="day_cost" variant={"secondary"} currency={getCurrencySymbol(action.data.currency_code)}/>
                    </Box>
                </FormSlide>

                <FormSlide color={"blue"}>
                    <BlockHeading text="Night Time Period" icon={<NightIcon width={24} height={32}/>}/>
                    <Box pt={16} pb={16}><Separator/></Box>
                    <Box cg={8} d={"row"}>
                        <InputTime name="night_startTime" label={"Start"} variant={"secondary"}/>
                        <InputTime name="night_endTime" label={"End"}  variant={"secondary"}/>
                    </Box>
                    <Box mt={8}>
                        <InputRate name="night_cost" variant={"secondary"} currency={getCurrencySymbol(action.data.currency_code)}/>
                    </Box>
                </FormSlide>
            </Slider>

            {/*<Box rg={16}>*/}
            {/*    <BlockHeading text="Day Time Period" icon={<DayIcon width={24} height={32}/>}/>*/}
            {/*    <Box cg={8} d={"row"}>*/}
            {/*        <InputTime name="day_startTime" label={"Start"}/>*/}
            {/*        <InputTime name="day_endTime" label={"End"}/>*/}
            {/*        <InputRate name="day_cost"/>*/}
            {/*    </Box>*/}

            {/*    <Separator/>*/}

            {/*    <BlockHeading text="Night Time Period" icon={<NightIcon width={24} height={32}/>}/>*/}
            {/*    <Box cg={8} d={"row"}>*/}
            {/*        <InputTime name="night_startTime" label={"Start"}/>*/}
            {/*        <InputTime name="night_endTime" label={"End"}/>*/}
            {/*        <InputRate name="night_cost"/>*/}
            {/*    </Box>*/}
            {/*</Box>*/}
        </Layout>
    )
}
