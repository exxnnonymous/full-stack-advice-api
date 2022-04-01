import { useEffect } from "react";
import { useForm } from "@mantine/hooks";
import { useRouter } from "next/router";
import { TextInput, PasswordInput, Group, Button, Modal } from "@mantine/core";
import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalLoadingContext";

export default function EmailPassForm({ opened, setOpened, type }) {
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      title={type === "email" ? "Change Email" : "Change password!"}
    >
      {type === "email" ? (
        <ChangeEmail setOpened={setOpened} />
      ) : (
        <ChangePassword setOpened={setOpened} />
      )}
    </Modal>
  );
}


// changing password form
function ChangePassword({ setOpened }) {
  const { user, passchangeAction, password_changed, changing_password } =
    useAuth();
  const { startLoad, closeLoad } = useModal();

  const form = useForm({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },

    validationRules: {
      newPassword: (val, values) =>
        val.length >= 8 && val !== values.oldPassword,
    },
  });

  function handleFormSubmit(values) {
    passchangeAction(values.oldPassword, values.newPassword, user.email);
  }

  useEffect(() => {
    if (changing_password) {
      startLoad();
    } else {
      closeLoad();
    }
  }, [changing_password]);

  useEffect(() => {
    if (password_changed) {
      form.reset();
      setOpened(false);
    }
  }, [password_changed]);

  return (
    <>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <Group direction="column" grow>
          <PasswordInput
            required
            label="Old password"
            placeholder="Old password"
            value={form.values.oldPassword}
            onChange={(event) =>
              form.setFieldValue("oldPassword", event.currentTarget.value)
            }
          />

          <PasswordInput
            required
            label="New password"
            placeholder="New password"
            value={form.values.newPassword}
            onChange={(event) =>
              form.setFieldValue("newPassword", event.currentTarget.value)
            }
            error={
              form.errors.newPassword &&
              "Password should be of minimum 8 characters and new!"
            }
          />
        </Group>

        <Group position="apart" mt="xl">
          <Button color="indigo" type="submit">
            Change Password
          </Button>
        </Group>
      </form>
    </>
  );
}
// changing email form
function ChangeEmail({ setOpened }) {
  const { user, changeEmailAction, logoutAction, email_changed, change_email } =
    useAuth();
  const { startLoad, closeLoad } = useModal();
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
    },
  });
  function handleFormSubmit(values) {
    changeEmailAction(values.email, user.email, values.password);
  }

  useEffect(() => {
    if (change_email) {
      startLoad();
    } else {
      closeLoad();
    }
  }, [change_email]);

  useEffect(() => {
    if (email_changed) {
      form.reset();
      setOpened(false);
      startLoad();
      router.replace("/");
      logoutAction();
    }
  }, [email_changed]);

  return (
    <>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <Group direction="column" grow>
          <TextInput
            required
            label="New Email"
            placeholder="New Email"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
          />
          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
          />
        </Group>

        <Group position="apart" mt="xl">
          <Button color="indigo" type="submit">
            Change Email
          </Button>
        </Group>
      </form>
    </>
  );
}
