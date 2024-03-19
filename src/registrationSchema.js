import * as yup from "yup";

const registrationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must contain 8 or more characters")
    .max(25, "Password must contain less than characters"),

  confirmPassword: yup
    .string()
    .required("This field is required")
    .oneOf([yup.ref("password"), null], "Your passwords do not match."),
});

export default registrationSchema;
