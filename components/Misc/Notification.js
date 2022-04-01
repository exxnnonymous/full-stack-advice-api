import { useEffect } from "react";
import { useNotifications } from "@mantine/notifications";
import { useAuth } from "@/context/AuthContext";

function Notification() {
  const {
    authenticating,
    authenticated,
    error,
    error_message,
    registered,
    registering,
    register_err,
    register_err_msg,
    logout_success,
    loading,
    password_changed,
    password_err,
    email_changed,
    email_err,

  } = useAuth();

  const {  clean, showNotification } = useNotifications();

  // showing notification when users login
  useEffect(() => {
    let timeout;
    if (authenticating) {
      clean();
      showNotification({
        title: "Authenticating",
        message: "Hey there, you are being logged in!",
        loading: true,
        autoClose: false,
      });
    }

    if (authenticated) {
      clean();
      timeout = setTimeout(() => {
        showNotification({
          title: "Success",
          message: "You have successfully logged in!",
          color: "green",
          autoClose: 2000,
        });
      }, 300);
    }

    if (error) {
      clean();
      timeout = setTimeout(() => {
        showNotification({
          title: "Error",
          message: error_message,
          color: "red",
          autoClose: 2000,
        });
      }, 300);
    }

   return () => {
     clean();
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [authenticating, authenticated, error]);


  // showing notification when users registers
  useEffect(() => {
    let timeout;
    if (registering) {
      clean();
      showNotification({
        title: "Registering",
        message: "Hey there, we are creating your account!",
        loading: true,
        autoClose: false,
      });
    }

    if (registered) {
      clean();
      showNotification({
        title: "Success",
        message: "You have successfully created account!",
        color: "green",
        autoClose: 2000,
      });
    }
    if (register_err) {
      clean();
      timeout = setTimeout(() => {
        showNotification({
          title: "Error",
          message: register_err_msg,
          color: "red",
          autoClose: 2000,
        });
      }, 300);
    }

  return  () => {
    clean();
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [registering, registered, register_err]);
  

  // showing notification when users is logging out
  useEffect(() => {
    let timeout;
    if (loading) {
      clean();
      showNotification({
        title: "Logging Out",
        message: "Hey there, we are logging you out!",
        loading: true,
        autoClose: false,
      });
    }

    if(email_changed && logout_success){
      clean();
      showNotification({
        title: "Success",
        message: "Email changed successfully! Login Again!",
        color: "green",
        autoClose: 2000,
      });
    }

    if (logout_success && !email_changed) {
      clean();
      timeout = setTimeout(() => {
        showNotification({
          title: "Success",
          message: "You are logged out successfully!",
          color: "green",
          autoClose: 2000,
        });
      }, 300);
    }

  return  () => {
    clean();
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [loading, logout_success,email_changed]);

  // showing notification when user changes password
  useEffect(() => {
    if (password_changed) {
      clean();
      showNotification({
        title: "Success",
        message: "Password changed successfully!",
        color: "green",
        autoClose: 2000,
      });
    }
    if (password_err) {
      clean();
      showNotification({
        title: "Error",
        message: password_err,
        color: "red",
        autoClose: 2000,
      });
    }

   return ()=>{
      clean();
    }
  }, [ password_changed, password_err]);

  // showing notification when user changes email
  useEffect(() => {
    if (email_err) {
      clean();
      showNotification({
        title: "Error",
        message: email_err,
        color: "red",
        autoClose: 2000,
      });
    }

   return ()=>{
      clean();
    }
  }, [  email_err]);

  return <div></div>;
}

export default Notification;
