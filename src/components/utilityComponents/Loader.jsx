import {
  LayoutDashboard,
  ChartColumnBig,
  GraduationCap,
  ChartPie,
} from "lucide-react";
import styles from "../Css/Loader.module.css";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-red-50/60 backdrop-blur-sm z-50">
      <div className={styles.loaderWrapper}>
        <div className={styles.iconCircle}>
          <LayoutDashboard className={`${styles.icon} ${styles.icon1}`} />
          <ChartColumnBig className={`${styles.icon} ${styles.icon2}`} />
          <GraduationCap className={`${styles.icon} ${styles.icon3}`} />
          <ChartPie className={`${styles.icon} ${styles.icon4}`} />
        </div>
        <p className={styles.loaderText}>Loading...</p>
      </div>
    </div>
  );
}
