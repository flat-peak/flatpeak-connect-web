import styles from "./TariffBadges.module.scss";
import View from "../View/View.tsx";
import TariffDirectionBadge from "./TariffDirectionBadge.tsx";
import TariffStructureBadge from "./TariffStructureBadge.tsx";
import {TariffStructureType} from "../../../features/connect/lib/types.ts";
import {ContractDirection} from "../../../features/connect/lib/types.ts";

type TariffBadges = {
    contract_type: ContractDirection;
    structure_type: TariffStructureType;
}
export default function TariffBadges(props: TariffBadges) {
  const {contract_type, structure_type} = props;
  return (
    <View className={styles.host}>
      <TariffDirectionBadge value={contract_type} />
      <TariffStructureBadge value={structure_type} />
    </View>
  );
}
