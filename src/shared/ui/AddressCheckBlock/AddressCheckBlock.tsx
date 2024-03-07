import styles from "./AddressCheckBlock.module.scss";
import View from "../View/View.tsx";
import Box from "../Box/Box.tsx";
import Typography from "../Typography/Typography.tsx";
import EditIcon from "../icons/EditIcon.tsx";
import TouchableOpacity from "../../TouchahbleOpacity/TouchableOpacity.tsx";
type AddressCheckBlockProps = {
    address: string;
    onClick: () => void;
}
export default function AddressCheckBlock(props: AddressCheckBlockProps) {
  const {address, onClick} = props;
  return (
    <View className={styles.host}>
      <Box rg={8}>
          <Typography color="black_a40" variant="button__forms14_book" className={styles.label}>
            Your address:
          </Typography>
          <Box d={"row"} jc={"space-between"}>
              <Typography color="black" variant="button__forms16_book" className={styles.value}>
                  {address}
              </Typography>
              <TouchableOpacity className={styles.control} onClick={onClick}>
                  <EditIcon/>
              </TouchableOpacity>
          </Box>
      </Box>
    </View>
  );
}
