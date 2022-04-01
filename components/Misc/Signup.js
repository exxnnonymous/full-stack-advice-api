import { useEffect } from "react";
import { useForm, upperFirst } from "@mantine/hooks";
import {
  Text,
  TextInput,
  PasswordInput,
  Group,
  Button,
  Checkbox,
  Anchor,
  createStyles,
} from "@mantine/core";
import { useModal } from "@/context/ModalLoadingContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
  checkbox_error: {
    margin: "0px",
    padding: "0px",
    marginTop: "-10px",
    color: theme.colors.red[6],
    fontSize: ".8rem",
  },
}));

export default function Signup() {
  const {
    modaltype,
    register_modal,
    closeLoad,
    login_modal,
    closeModal,
    startLoad,
  } = useModal();
  const { classes } = useStyles();
  const {
    loginAction,
    registerAction,
    authenticating,
    registering,
    authenticated,
    registered,
    register_err,
    error,
  } = useAuth();
  const router = useRouter();

  const values =
    modaltype == "register"
      ? { email: "", name: "", password: "", terms: true }
      : {
          email: "",

          password: "",
        };

  const validationRules =
    modaltype == "register"
      ? {
          email: (val) => /^\S+@\S+$/.test(val),
          password: (val) => val.length >= 8,
          terms: (val) => val,
        }
      : {
          email: (val) => /^\S+@\S+$/.test(val),
        };

  const form = useForm({
    initialValues: values,
    validationRules: validationRules,
  });

  function handleFormSubmit(values) {
    if (modaltype === "login") {
      loginAction(values);
    }
    if (modaltype === "register") {
      registerAction(values);
    }
  }

  // loading screen and closing when logging, registering...
  useEffect(() => {
    if (authenticating) {
      startLoad();
    }
  }, [authenticating]);

  useEffect(() => {
    if (error) {
      closeLoad();
    }
    if (register_err) {
      closeLoad();
    }
  }, [register_err, error]);

  useEffect(() => {
    if (registering) {
      startLoad();
    }
  }, [registering]);


  //  when authenticated
  useEffect(() => {
    if (registered) {
      form.reset();
      closeModal();
      router.push("/dashboard");
      startLoad();
    }
    if (authenticated) {
      form.reset();
      closeModal();
      router.push("/dashboard");
      startLoad();
    }
  }, [registered, authenticated]);

  return (
    <>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <Group direction="column" grow>
          {modaltype === "register" && (
            <TextInput
              required
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@gmail.com"
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
            error={
              form.errors.password &&
              "Password should include at least 8 characters"
            }
          />

          {modaltype === "register" && (
            <>
              <Checkbox
                color="indigo"
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
              />
              {form.errors.terms && (
                <Text size="sm" className={classes.checkbox_error}>
                  You must accept terms and conditions
                </Text>
              )}
            </>
          )}
        </Group>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="gray"
            onClick={() => {
              if (modaltype === "register") {
                login_modal();
              } else {
                register_modal();
              }
            }}
            size="sm"
          >
            {modaltype === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button color="indigo" type="submit">
            {upperFirst(modaltype)}
          </Button>
        </Group>
      </form>
    </>
  );
}
