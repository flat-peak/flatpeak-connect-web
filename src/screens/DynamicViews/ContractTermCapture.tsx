import {useConnect} from "../../features/connect/lib/ConnectProvider.tsx";
import {FormEventHandler} from "react";
import ButtonBig from "../../shared/ui/ButtonBig/ButtonBig.tsx";
import Layout from "../../shared/ui/Layout/Layout.tsx";
import Box from "../../shared/ui/Box/Box.tsx";
import Typography from "../../shared/ui/Typography/Typography.tsx";
import MainHeading from "../../shared/ui/MainHeading/MainHeading.tsx";
import InputDate from "../../shared/ui/InputDate/InputDate.tsx";
import FooterActions from "../../shared/ui/FooterActions/FooterActions.tsx";
import {LeadingText} from "../../shared/ui/LeadingText/LeadingText.tsx";
import {CommonRenderRoute} from "../../features/connect/lib/types.ts";
import {submitAction} from "../../features/connect/lib/service.ts";

export const ContractTermCapture = () => {
    const { proceed, action} = useConnect();

    const {contract_end_date} = (action as CommonRenderRoute<'contract_term_capture'>).data;

    const handleSubmit: FormEventHandler = (event) => {
        event.preventDefault();
        const {
            contractEndDate: {value: contractEndDate},
        } = event.target as unknown as {[key: string]: {value: string}};
        proceed(submitAction({
            route: action.route,
            type: "submit",
            connect_token: action.connect_token,
            data: {
                contract_end_date: new Date(contractEndDate)
            }
        }));
    }

    const skipUntilTerminated = () => {
        proceed(submitAction({
            route: "contract_term_capture",
            type: "submit",
            connect_token: action.connect_token
        }));
    }

    return (
      <Layout
        component={'form'}
        footer={
          <FooterActions>
            <ButtonBig label={'Next'} type="submit" />
          </FooterActions>
        }
        onSubmit={handleSubmit}
        noValidate
      >
        <MainHeading text="Contract expiry date" />
        <LeadingText>
          <Typography color="black_a40" variant="leading_string">
            Let us know when your contract expires so we can remind you to update this connection.
          </Typography>
        </LeadingText>
        <InputDate placeholder="Choose expiry date" value={contract_end_date || ''} name="contractEndDate" />
        <Box mt={24}>
          <ButtonBig label={'Skip / Until terminated'} variant={'outlined'} type={'button'} onClick={skipUntilTerminated} />
        </Box>
      </Layout>
    )
}
