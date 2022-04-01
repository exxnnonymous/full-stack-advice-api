import { useState, useEffect } from "react";
import { Title, createStyles, Button, Tooltip } from "@mantine/core";

import styles from "@/styles/Account.module.css";
import { useAuth } from "@/context/AuthContext";
import EmailPassForm from "../SimpleModal";
import dateDiff from "@/helper/getDateDiff";

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
    btn:{
      '&:disabled':{
        backgroundColor: `${theme.colors.dark[3]} !important`
      }
    }
  };
});

function Setting() {
  const { user, password_changed } = useAuth();
  const { classes } = useStyles();
  const [openPass, setOpenPass] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [canChangePass, setCanChangePass] = useState(false);
  const [canChangeEmail, setCanChangeEmail] = useState(false);

  function checkCanChange(diff,setChange,limit){
    if (diff >= limit) {
      setChange(true);
    } else {
      setChange(false);
    }
  }

  useEffect(() => {
    if (user) {
      // checking if user can change password
      if(user.pass_change_count.count===0){
        setCanChangePass(true)
      }else{
        const passDiff = dateDiff(
          new Date(user.pass_change_count.changed_date),
          new Date()
        );
        checkCanChange(passDiff,setCanChangePass,7)
      }



      // checking if user can change email
      if(user.email_change_count.count===0){
        setCanChangeEmail(true)

      }else{
        const emailDiff = dateDiff(
          new Date(user.email_change_count.changed_date),
          new Date()
        )
        checkCanChange(emailDiff,setCanChangeEmail,30)
      }

    }

  }, [user]);




  
  useEffect(() => {
    if (password_changed) {
      setCanChangePass(false);
    }
  }, [password_changed]);

  if (!user) {
    return " ";
  }

  return (
    <div className={styles.dashboard_page_container}>
      <EmailPassForm
        opened={openPass}
        setOpened={setOpenPass}
        type={"password"}
      />
      <EmailPassForm
        opened={openEmail}
        setOpened={setOpenEmail}
        type={"email"}
      />
      <div className={styles.title}>
        <Title>Setting</Title>
      </div>
      <div className={`${styles.account_info} ${classes.account_info}`}>
        <div className={styles.setting_email}>
        <Tooltip opened={!canChangeEmail ? null : false} label="You can change email once a month" color={"teal"} withArrow>
        <Button
        disabled={!canChangeEmail}
            color="indigo"
            className={classes.btn}
            onClick={() => {
              setOpenEmail(true);
            }}
          >
            Change email
          </Button>

        </Tooltip>
          
          <span>{user.email}</span>
        </div>
        <div className={styles.setting_password}>
          <Tooltip opened={!canChangePass ? null : false} label="You can change password once a week" color={"teal"} withArrow>
            <Button
            className={classes.btn}
              onClick={() => {
                setOpenPass(true);
              }}
              disabled={!canChangePass}
              color="indigo"
            >
              Change password
            </Button>
          </Tooltip>

          <span>**********</span>
        </div>
      </div>
    </div>
  );
}

export default Setting;
