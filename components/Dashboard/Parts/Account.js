import { useAuth } from "@/context/AuthContext";
import styles from "../../../styles/Account.module.css";
import { Title, Button, createStyles } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";

// mantine styling
const useStyles = createStyles((theme) => {
  return {
    account_info: {
      borderRadius: "10px",
      border: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },
  };
});

function Account() {
  const { user } = useAuth();
  const { classes } = useStyles();

  const clipboard = useClipboard({ timeout: 1500 });


  // beautify date
  function getDate(date) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return {
      year: date.substr(0, 4),
      month: months[parseInt(date.substr(5, 2)) - 1],
      date: date.substr(8, 2),
    };
  }

  if (!user) {
    return " ";
  }

  const date = getDate(user.createdAt);
  return (
    <div className={styles.dashboard_page_container}>
      <div className={styles.title}>
        <Title>Account</Title>
      </div>
      <div className={`${styles.account_info} ${classes.account_info}`}>
        <div className={styles.account_info_item}>
          <span>Account Created</span>
          <div>
            {date.date} {date.month} {date.year}
          </div>
        </div>
        <div className={styles.account_info_item}>
          <span>Name</span>
          <div style={{ textTransform: "capitalize" }}>{user.name}</div>
        </div>
        <div className={styles.account_info_item}>
          <span>Email</span>
            <span>{user.email}</span>
        </div>
        <div className={styles.account_info_item}>
          <span>API Key</span>
          <div className={styles.apikey}>
            <span>{user.api_info.api_key}</span>
            <Button
              color={clipboard.copied ? "pink" : "indigo"}
              onClick={() => clipboard.copy(user.api_info.api_key)}
            >
              {clipboard.copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
