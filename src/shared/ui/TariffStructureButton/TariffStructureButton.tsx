import styles from "./TariffStructureButton.module.scss";
import Box from "../Box/Box.js";
import Typography from "../Typography/Typography.js";
import {ButtonHTMLAttributes, ReactElement} from "react";
import TouchableOpacity from "../../TouchahbleOpacity/TouchableOpacity.tsx";

type TariffStructureButtonProps = {
  description: string;
  mainText: string;
  icon: ReactElement;
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function TariffStructureButton(props: TariffStructureButtonProps) {
  const  {description, mainText, icon,...buttonAttributes} = props;
  return (
      <TouchableOpacity {...buttonAttributes} className={styles.host}>
        {icon}
        <Box rg={4} className={styles.texts}>
          <Typography color="black" variant="heading_h2_text">
            {mainText}
          </Typography>
          <Typography color="black_a40" variant="body">
            {description}
          </Typography>
        </Box>
      </TouchableOpacity>
  );
}
